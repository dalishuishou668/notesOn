import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserNotebooks, editNotebook} from '../../store/notebooks';
import { createNote, deleteNote, getNotebookNotes, editSingleNote } from '../../store/notes';
import './Notebook.css';


function Notebook() {

    const { notebookId } = useParams();


    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector(state => state.session.user?.id);
    const notebook = useSelector((state) => state?.notebooks[notebookId]);
    console.log('notbook bug in component:', notebook)
    // console.log('component:', notebook.title)
    // line 88

    const notes = useSelector((state) => state.notes)
    const notesArr = Object.values(notes)
    console.log("notesArr --------------------", notesArr)


    // Display and Edit notebook notes
    const [title, setTitle] = useState('');
    const [noteTitle, setNoteTitle] = useState('');
    const [content, setContent] = useState('');
    const [realNote, setRealNote] = useState('');
    const [realNoteTitle, setRealNoteTitle] = useState('');
    const [realNoteContent, setRealNoteContent] = useState('');
    // const [inputView, setInputView] = useState(false);
    const updateTitle = (e) => setTitle(e.target.value);

    // Edit A Notebook
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            title,
        }

        dispatch(editNotebook(payload, notebookId, notebook))
        // history.push('/home')
    }

    // Create a new note
    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title: noteTitle,
            content,
            userId,
            notebookId
        }
        console.log('create notes bug in component:', payload)
        await dispatch(createNote(payload))
        setNoteTitle('')
        setContent('')
        // history.push(`/notebooks/${notebookId}`);
    }


    // DELETE a note  ====== not working
    const deleteSubmit = async (e, noteId) => {
        e.preventDefault();

        await dispatch(deleteNote(noteId))
        setRealNote('')
        history.push(`/notebooks/${notebookId}`)
    }

    // EDIT a note
    const editSubmit = async (e, noteId) => {
        e.preventDefault();
        // console.log('editSubmit:', noteId)

        const payload = {
            title: realNoteTitle,
            content: realNoteContent
        };

        await dispatch(editSingleNote(payload, noteId))
        // history.push(`/notebooks/${notebookId}`)

    }


    // Read all notes from a single notebook
    useEffect(() => {
        // dispatch(getSingleNotebook(notebookId))
        dispatch(getUserNotebooks(userId))
        dispatch(getNotebookNotes(notebookId))

    }, [dispatch, notebookId])


    if (!notesArr.length) return null;

    return (
        <div>
            <h2>This is SingleNotebook Page</h2>
            <h3>Your Notebook: {notebook?.title}</h3>
            <div className='editNotebookContainer'>
                <form onSubmit={handleSubmit} className='editForm'>
                    <input
                        type='text'
                        placeholder='title'
                        value={title}
                        onChange={updateTitle}
                    >
                    </input>
                    <button type='submit'>Edit Notebook</button>
                </form>
            </div>



            <div className='allNotesFromSingleNotebookContainer'>
                {notesArr && notesArr.map(note => {
                    if (realNote.id === note.id) {
                        return (
                            <div>
                                <div
                                    className='selected'
                                    id={note.id}
                                    key={note.id}
                                    onClick={() => {
                                        setRealNote(note);
                                        setRealNoteTitle(note.title);
                                        setRealNoteContent(note.content);
                                    }}
                                >
                                    {note?.title}
                                    <div></div>
                                    {note?.content}
                                </div>
                                <button onClick={(e) => deleteSubmit(e, note.id)}>Delete</button>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <div
                                    className='notSelected'
                                    id={note.id}
                                    key={note.id}
                                    onClick={() => {
                                        // setInputView(true);
                                        setRealNote(note)
                                        setRealNoteTitle(note.title);
                                        setRealNoteContent(note.content)
                                    }}
                                >
                                    {note.title}
                                    <div></div>
                                    {note.content}
                                </div>
                                {/* <button onClick={() => deleteSubmit(note.id)}>Delete</button> */}
                            </div>
                        )
                    }

                    // return (
                    //     <div>
                    //         <div
                    //             key={note.id}
                    //             onClick={() => {
                    //                 setInputView(true);
                    //                 setRealNoteTitle(note.title);
                    //                 setRealNoteContent(note.content)
                    //             }}
                    //         >
                    //             {note.title}
                    //             <div></div>
                    //             {note.content}
                    //         </div>
                    //         <button onSubmit={deleteSubmit}>Delete</button>
                    //     </div>
                    // )
                })}
            </div>




            {/* {inputView && ( */}
            <div className='realNotesContainer'>
                <form>
                    <input
                        className='realNotesTitle'
                        type='text'
                        placeholder='note title'
                        value={realNoteTitle}
                        onChange={(e) => setRealNoteTitle(e.target.value)}
                    >
                    </input>
                    <input
                        className='realNotsContent'
                        type='text'
                        placeholder='note content'
                        value={realNoteContent}
                        onChange={(e) => setRealNoteContent(e.target.value)}
                    >
                    </input>
                    <button onClick={(e) => editSubmit(e, realNote.id)}>Edit</button>
                </form>
            </div>
            {/* )} */}


            <div className='createNoteFormContainer'>
                <form onSubmit={onSubmit} className='createNote'>
                    <input
                        type='text'
                        placeholder='title'
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                    >
                    </input>
                    <input
                        type='text'
                        placeholder='content'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    >
                    </input>
                    <button type='submit'>Create New Note</button>
                </form>
            </div>
        </div>

    )


}

export default Notebook;
