import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserNotebooks, editNotebook, deleteNotebook } from '../../store/notebooks';
import { createNote, deleteNote, getNotebookNotes, editSingleNote } from '../../store/notes';
// import { useSetview } from '../../context/SetviewContext'
import Sidenavbar from '../Sidenavbar';
import Editor from "./Editor";
import "react-quill/dist/quill.snow.css";
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
    // console.log('prop notebooks:', notebooks)
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
    const [showEdit, setShowedit] = useState(false);


    const updateTitle = (e) => setTitle(e.target.value);


    // RICH EDITOR TEST
    const [newNote, setNewNote] = useState(true);
    const [newNoteTitle, setNewNoteTitle] = useState("");
    const [newNoteContents, setNewNoteContents] = useState("");


    // console.log('realnote:', realNote)
    // console.log('realnoteTitle', realNoteTitle)
    // console.log('realnoteContent', realNoteContent)

    // console.log('newNote', newNote)
    // console.log('newNotetitle', newNoteTitle)
    // console.log('newNoteContent', newNoteContents)

    function createNewNote() {
        setRealNoteTitle("");
        setRealNoteContent("");
        setRealNote("");
        setNewNoteTitle("");
        setNewNoteContents("");
        setNewNote(true);
    }

    // Handle both create new note and edit old note submit
    const handleSaveSubmit = async (e, noteId) => {
        e.preventDefault()
        if (newNote) {
            const payload = {
                title: newNoteTitle,
                content: newNoteContents,
                userId,
                notebookId
            }
            // console.log('******payload:', payload)
            await dispatch(createNote(payload))
            createNewNote()
            return;
        }

        const updatePayload = {
            title: realNoteTitle,
            content: realNoteContent
        };
        await dispatch(editSingleNote(updatePayload, noteId))
        createNewNote()

    }








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
            title: newNoteTitle,
            content: newNoteContents,
            userId,
            notebookId
        }

        await dispatch(createNote(payload))
        setNoteTitle('')
        setContent('')
        history.push(`/notebooks/${notebookId}`);
    }


    // DELETE a note
    const deleteSubmit = async (e, noteId) => {
        e.preventDefault();

        await dispatch(deleteNote(noteId))
        // setRealNote('')
        // setRealNoteTitle('')
        // setRealNoteContent('')
        createNewNote()
        // history.push(`/notebooks/${notebookId}`)
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

        e.preventDefault();

        await dispatch(deleteNotebook(notebookId, userId))
        history.push('/home')
    }


    // cancel edit note
    // const cancelEditNote = (e) => {
    //     e.preventDefault();
    //     setView(false);
    //     setRealNote('')
    // }

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

    // useEffect(() => {
    //     const errors2 = [];
    //     if (realNoteTitle.length < 1) errors2.push('Please provide valid note title');
    //     if (realNoteTitle.length > 25) errors2.push('Character limit reached');
    //     if (realNoteContent.length < 1) errors2.push('Please provide valid note content');
    //     setErrors2(errors2);
    // }, [realNoteTitle, realNoteContent])

    useEffect(() => {
        const errors2 = [];
        // if (realNoteTitle.length < 1) errors2.push('Please provide valid note title');
        // if (realNoteTitle.length > 25) errors2.push('Character limit reached');
        // if (realNoteContent.length < 1) errors2.push('Please provide valid note content');
        if (newNoteTitle.length < 1) errors2.push('* Please provide valid note title')
        if (newNoteContents.length < 1) errors2.push('* Please provide valid note content')
        setErrors2(errors2);
    }, [newNoteTitle, newNoteContents])

    const [errors3, setErrors3] = useState([]);

    useEffect(() => {
        const errors3 = [];
        if (realNoteTitle.length < 1) errors3.push('* Please provide valid note title333');
        if (realNoteTitle.length > 25) errors3.push('* Character limit reached333');
        if (realNoteContent.length < 1) errors3.push('* Please provide valid note content333');
        setErrors3(errors3);
    }, [realNoteTitle, realNoteContent])

    useEffect(() => { }, [realNote, realNoteContent, realNoteTitle]);


    // console.log('realnoteContent----->:', realNoteContent)
    // console.log('realNoteTitle----->:', realNoteTitle)
    // console.log('errors2:::', errors2)


    // console.log('newNoteContents << ---------:', newNoteContents)
    // console.log('newNoteTitle <<----------:', newNoteTitle)
    // console.log('errors3:::', errors3)

    // console.log('realNote*********', realNote)




    // ERROR HANDLING for create new note
    // const [errors3, setErrors3] = useState([]);

    // useEffect(() => {
    //     const errors3 = [];
    //     if (noteTitle.length < 1) errors3.push('Please provide valid note title');
    //     if (noteTitle.length > 25) errors3.push('Character limit reached');
    //     if (content.length < 1) errors3.push('Please provide valid note content');
    //     setErrors3(errors3);
    // }, [noteTitle, content])




    // if (!notesArr.length) return null;

    return (

        <div className='outerContainer'>

            <Sidenavbar name={sessionUser?.username}
                notebooks={notebooks}
            />
            <div className='container4'>
                <div className='container5'>
                    <h2>Take notes anywhere, any time in any device !</h2>
                    <div className='container3'>
                        <h3 className='topTitle'>Your Notebook: <span className='span1'>{notebook?.title}</span></h3>
                        <div className='buttonContainer'>
                            <button
                                className='deleteNotebookBtn'
                                onClick={deleteNotebookSubmit}
                            >
                                DELETE NOTEBOOK
                            </button>
                            <button
                                className='createNoteButton'
                                onClick={createNewNote}
                            >
                                CREATE A NOTE
                            </button>
                            <button
                                className='editBtn5'
                                onClick={() => setShowedit(true)}
                            >
                                EDIT NOTEBOOK</button>
                        </div>


                        {showEdit ? (
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
                                    <button className='editBtn1' type='submit' disabled={!!errors1.length}>Update</button>
                                    <button className='editBtn1' onClick={() => setShowedit(false)}>Cancel</button>
                                </form>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>



                    <div className='NotesPageContainer'>
                        {/* <div className='errContianer'> */}
                            <ul className="errors">
                                {newNote && errors2.length > 1 && errors2.map(error => (
                                    <li key={error}>{error}</li>
                                ))}

                                {realNote && errors3.length > 1 && errors3.map(error => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        {/* </div> */}
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
                                                        setNewNote(false);
                                                    }}
                                                >
                                                    <div className='notetitle5'>{note?.title}</div>
                                                    <div className='notecontent1' dangerouslySetInnerHTML={{ __html: `${note.content}` }} />
                                                    {/* <div className='notecontent1'>{note?.content}</div> */}
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
                                                        setRealNoteContent(note.content);
                                                        setNewNote(false);
                                                    }}
                                                >
                                                    <div className='noteTitle5'>{note.title}</div>
                                                    <div></div>
                                                    <div className='notecontent1' dangerouslySetInnerHTML={{ __html: `${note.content}` }} />
                                                    {/* {note.content} */}
                                                </li>
                                            </ul>
                                        )
                                    }
                                })}
                            </div>

                            <div className='richEditorContainer'>
                                <form className='editorForm' onSubmit={(e) => handleSaveSubmit(e, realNote.id)}>
                                    <input
                                        className='noteTitle_1'
                                        type="text"
                                        placeholder="Note Title"
                                        value={realNoteTitle ? realNoteTitle : newNoteTitle}
                                        onChange={
                                            newNote
                                                ? (e) => setNewNoteTitle(e.target.value)
                                                : (e) => setRealNoteTitle(e.target.value)
                                        }
                                    />
                                    <button className='saveBtn' disabled={(newNote && !!errors2.length) || (realNote && !!errors3.length)} onClick={(e) => handleSaveSubmit(e, realNote.id)}>Save</button>
                                </form>
                                <Editor
                                    newNote={newNote}
                                    realNoteContent={realNoteContent}
                                    newNoteContents={newNoteContents}
                                    setNewNoteContents={setNewNoteContents}
                                    setRealNoteContent={setRealNoteContent}
                                />


                            </div>

                        </div>

                        {/* {view ? (
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
                                            placeholder='title'
                                            value={realNoteTitle}
                                            onChange={(e) => setRealNoteTitle(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                    <div className='inputContent'>
                                        <textarea
                                            className='realNotsContent'
                                            type='text'
                                            placeholder='content'
                                            value={realNoteContent}
                                            onChange={(e) => setRealNoteContent(e.target.value)}
                                        >
                                        </textarea>
                                    </div>
                                    <div className='editBtnContainer'>
                                        <button className='editBtn2'
                                            onClick={(e) => editSubmit(e, realNote.id)}
                                            disabled={!!errors2.length}
                                        >
                                            Edit
                                        </button>

                                    </div>
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
                                    <textarea
                                        className='createContentInput'
                                        type='text'
                                        placeholder='note content'
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    >
                                    </textarea>
                                    <div className='createFormBtnContainer2'>
                                        <button className='createNoteBtn' type='submit' disabled={!!errors3.length}>Save</button>

                                    </div>

                                </form>
                            </div>
                        </>
                    )} */}
                    </div>
                </div>
            </div>


        </div>


    )


}

export default Notebook;
