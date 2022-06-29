import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserNotebooks, editNotebook } from '../../store/notebooks';
import { createNote, deleteNote, getNotebookNotes, editSingleNote } from '../../store/notes';
import './Notebook.css';


function Notebook() {

    const { notebookId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    // State
    const userId = useSelector(state => state.session.user?.id);
    const notebook = useSelector((state) => state?.notebooks[notebookId]);
    console.log('********notbook bug in component:', notebook)

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
        dispatch(getUserNotebooks(userId))
        setTitle('')
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
        setRealNoteTitle('')
        setRealNoteContent('')
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
        setRealNote('')
        setRealNoteTitle('')
        setRealNoteContent('')
        // history.push(`/notebooks/${notebookId}`)

    }


    // Read all notes from a single notebook
    useEffect(() => {
        // dispatch(getSingleNotebook(notebookId))
        dispatch(getUserNotebooks(userId))
        dispatch(getNotebookNotes(notebookId))

    }, [dispatch, notebookId])


    // ERROR HANDLING for edit notebook title
    const [errors1, setErrors1] = useState([]);

    useEffect(() => {
        const errors1 = [];
        if (title.length < 1) errors1.push('Please provide valid notebook title');
        setErrors1(errors1);
    }, [title])

    // ERROR HANDLING for edit notebook real note title and content
    const [errors2, setErrors2] = useState([]);

    useEffect(() => {
        const errors2 = [];
        if (realNoteTitle.length < 1) errors2.push('Please provide valid values');
        if (realNoteContent.length < 1) errors2.push('Please provide valid values');
        setErrors2(errors2);
    }, [realNoteTitle, realNoteContent])

    // ERROR HANDLING for create new note
    const [errors3, setErrors3] = useState([]);

    useEffect(() => {
        const errors3 = [];
        if (noteTitle.length < 1) errors3.push('Please provide valid note title');
        if (content.length < 1) errors3.push('Please provide valid note content');
        setErrors3(errors3);
    }, [noteTitle, content])




    // if (!notesArr.length) return null;

    return (
        <div>
            <h2>Take notes anywhere, any time in any device !</h2>
            <div>
                <h3>Your Notebook: {notebook?.title}</h3>
                <div className='editNotebookContainer'>
                    <form onSubmit={handleSubmit} className='editForm'>
                        <div>
                            <ul className="errors">
                                {errors1.map(error => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                        <input
                            className='editNotebookTitleInput'
                            type='text'
                            placeholder='title'
                            value={title}
                            onChange={updateTitle}
                        >
                        </input>
                        <button className='editBtn1' type='submit'>Edit Notebook</button>
                    </form>
                </div>
            </div>



            <div className='notebookContainer'>
                <div className='allNotesFromSingleNotebookContainer'>
                    {notesArr && notesArr.map(note => {
                        if (realNote.id === note.id) {
                            return (
                                <ul className='container1'>
                                    <li
                                        className='selected'
                                        id={note.id}
                                        key={note.id}
                                        onClick={() => {
                                            setRealNote(note);
                                            setRealNoteTitle(note.title);
                                            setRealNoteContent(note.content);
                                        }}
                                    >
                                        <div className='notetitle1'>{note?.title}</div>
                                        <div className='notecontent1'>{note?.content}</div>

                                    </li>
                                    <button onClick={(e) => deleteSubmit(e, note.id)} className='deleteNoteBtn'>Delete</button>
                                </ul>
                            )
                        } else {
                            return (
                                <ul>
                                    <li
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
                                    </li>
                                    {/* <button onClick={() => deleteSubmit(note.id)}>Delete</button> */}
                                </ul>
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
                    <form className='realNotesDisplayForm'>
                        <div>
                            <ul className="errors">
                                {errors2.map(error => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='inputTitle'>
                            <input
                                className='realNotesTitle'
                                type='text'
                                placeholder='note title'
                                value={realNoteTitle}
                                onChange={(e) => setRealNoteTitle(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className='inputContent'>
                            <input
                                className='realNotsContent'
                                type='text'
                                placeholder='note content'
                                value={realNoteContent}
                                onChange={(e) => setRealNoteContent(e.target.value)}
                            >
                            </input>
                        </div>
                        <button className='editBtn2' onClick={(e) => editSubmit(e, realNote.id)}>Edit</button>
                    </form>
                </div>
            </div>

            <div className='createNoteFormContainer'>
                <form onSubmit={onSubmit} className='createNote'>
                    <div>
                        <ul className="errors">
                            {errors3.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                    <input
                        className='createTitleInput'
                        type='text'
                        placeholder=' note title'
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                    >
                    </input>
                    <input
                        className='createContentInput'
                        type='text'
                        placeholder='content'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    >
                    </input>
                    <button className='createNoteBtn' type='submit'>Create New Note</button>
                </form>
            </div>
        </div>

    )


}

export default Notebook;
