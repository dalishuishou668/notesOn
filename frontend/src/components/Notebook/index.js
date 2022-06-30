import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserNotebooks, editNotebook, deleteNotebook } from '../../store/notebooks';
import { createNote, deleteNote, getNotebookNotes, editSingleNote } from '../../store/notes';
// import { useSetview } from '../../context/SetviewContext'
import Sidenavbar from '../Sidenavbar';
import './Notebook.css';


function Notebook() {

    const { notebookId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    // const { view, setView } = useSetview();

    // State
    const sessionUser = useSelector((state) => state.session.user);
    const userId = useSelector(state => state.session.user?.id);
    const notebooks = useSelector((state) => state?.notebooks);
    console.log('prop notebooks:', notebooks)
    const notebook = useSelector((state) => state?.notebooks[notebookId]);

    const notes = useSelector((state) => state.notes)
    const notesArr = Object.values(notes)

    // Display and Edit notebook notes
    const [title, setTitle] = useState('');
    const [noteTitle, setNoteTitle] = useState('');
    const [content, setContent] = useState('');
    const [realNote, setRealNote] = useState('');
    const [realNoteTitle, setRealNoteTitle] = useState('');
    const [realNoteContent, setRealNoteContent] = useState('');

    const [show, setShow] = useState(false);
    const [view, setView] = useState(false);


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
        history.push(`/notebooks/${notebookId}`);
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
        history.push(`/notebooks/${notebookId}`);
    }


    // DELETE a note
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

        const payload = {
            title: realNoteTitle,
            content: realNoteContent
        };

        await dispatch(editSingleNote(payload, noteId))
        setRealNote('')
        setRealNoteTitle('')
        setRealNoteContent('')
        history.push(`/notebooks/${notebookId}`)

    }

    // DELETE A SINGLE NOTEBOOK
    const deleteNotebookSubmit = async (e) => {

        console.log('hello')
        e.preventDefault();

        await dispatch(deleteNotebook(notebookId, userId))
        history.push('/home')
    }



    // Read all notes from a single notebook
    useEffect(() => {
        // dispatch(getSingleNotebook(notebookId))
        dispatch(getUserNotebooks(userId))
        dispatch(getNotebookNotes(notebookId))

    }, [dispatch, notebookId, userId])


    //----------------------------------------------------------------
    // ERROR HANDLING for edit notebook title
    const [errors1, setErrors1] = useState([]);

    useEffect(() => {
        const errors1 = [];
        if (title.length < 1) errors1.push('Please provide valid notebook title');
        if (title.length > 25) errors1.push('Character limit reached');
        setErrors1(errors1);
    }, [title])

    // ERROR HANDLING for edit notebook real note title and content
    const [errors2, setErrors2] = useState([]);

    useEffect(() => {
        const errors2 = [];
        if (realNoteTitle.length < 1) errors2.push('Please provide valid values');
        if (realNoteTitle.length > 25) errors2.push('Character limit reached');
        if (realNoteContent.length < 1) errors2.push('Please provide valid values');
        setErrors2(errors2);
    }, [realNoteTitle, realNoteContent])

    // ERROR HANDLING for create new note
    const [errors3, setErrors3] = useState([]);

    useEffect(() => {
        const errors3 = [];
        if (noteTitle.length < 1) errors3.push('Please provide valid note title');
        if (noteTitle.length > 25) errors3.push('Character limit reached');
        if (content.length < 1) errors3.push('Please provide valid note content');
        setErrors3(errors3);
    }, [noteTitle, content])




    // if (!notesArr.length) return null;

    return (

        <div className='outerContainer'>

            <Sidenavbar name={sessionUser?.username}
                notebooks={notebooks}
            />

            <div>
                <h2>Take notes anywhere, any time in any device !</h2>
                <div className='container3'>
                    <h3 className='topTitle'>Your Notebook: {notebook?.title}</h3>
                    <button
                        className='deleteNotebookBtn'
                        onClick={deleteNotebookSubmit}
                    >
                        DELETE NOTEBOOK
                    </button>
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
                            <button className='editBtn1' type='submit' disabled={!!errors1.length}>Edit Notebook</button>
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
                                                setView(true)
                                            }}
                                        >
                                            <div className='notetitle1'>{note?.title}</div>
                                            <div className='notecontent1'>{note?.content}</div>

                                        </li>
                                        <button onClick={(e) => deleteSubmit(e, note.id)} className='deleteNoteBtn'>Delete</button>
                                        {/* <button onClick={() => setView(false)} className='cancelNoteBtn'>Cancel</button> */}
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
                                                setView(true)
                                                setRealNote(note)
                                                setRealNoteTitle(note.title);
                                                setRealNoteContent(note.content)
                                            }}
                                        >
                                            {note.title}
                                            <div></div>
                                            {note.content}
                                        </li>
                                    </ul>
                                )
                            }
                        })}
                    </div>


                    {view ? (
                        <div>
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
                                    <button className='editBtn2'
                                        onClick={(e) => editSubmit(e, realNote.id)}
                                        disabled={!!errors2.length}
                                    >
                                        Edit
                                    </button>
                                </form>
                            </div>

                        </div>
                    ) : (
                        <>
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
                                    <button className='createNoteBtn' type='submit' disabled={!!errors3.length}>Create New Note</button>
                                </form>
                            </div>
                        </>
                    )}
                </div>

                <div>
                    <button onClick={() => setView(false)}>build</button>
                </div>

                {show ? (
                    <>
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
                                <button className='createNoteBtn' type='submit' disabled={!!errors3.length}>Create New Note</button>
                            </form>
                        </div>

                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>


    )


}

export default Notebook;
