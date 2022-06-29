import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import { getUserNotebooks } from "../../store/notebooks";
import { getUserNotes } from "../../store/notes";
import { createNewNotebook } from "../../store/notebooks";
// import MainNotebooks from "./MainNotebooks";
import './MainPage.css'



function MainPage() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session?.user);
    const userId = sessionUser.id

    // Get all notebooks
    const notebooks = useSelector(state => state?.notebooks);
    console.log('notebooks--------:', notebooks)
    const notebooksArray = Object.values(notebooks)

    // Get all notes
    const notes = useSelector(state => state.notes)
    console.log('notes in component:', notes)
    const notesArray = Object.values(notes)
    console.log('notesArray:', notesArray)

    useEffect(() => {
        dispatch(getUserNotebooks(userId));
        dispatch(getUserNotes(userId))
    }, [dispatch, userId])


    // Create notebook

    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        const errors = [];
        if (title.length < 1) errors.push('Please provide valid values');
        setErrors(errors);
    }, [title])


    const onSubmit = e => {
        e.preventDefault();
        const payload = {
            title,
            userId
        }
        dispatch(createNewNotebook(payload))
        setTitle('')
    }


    return (
        <div>
            <div className='notebooksAndNotesContainer'>
                <div className='notebooksContainer'>
                    <div className='inner'>
                        <h2>Your Notebooks</h2>
                        <div className='innerContainer'>
                            <ul>
                                {notebooksArray && notebooksArray.map((notebook) => (
                                    <li key={notebook.id} className='singleNotebook'>
                                        <NavLink to={`/notebooks/${notebook.id}`} className='singleNotebook'>
                                            {notebook.title}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* <MainNotebooks notebooksArray={notebooksArray} /> */}
                    <div className='createNotebookForm'>
                        <form onSubmit={onSubmit} className='createForm'>
                            <div>
                                <ul className="errors">
                                    {errors.map(error => (
                                        <li key={error}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <input
                                    className='createNotebookInput'
                                    type='text'
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                >
                                </input>
                            </div>
                            <div>
                                <button className='createBtn' type='submit'>Create a Notebook</button>
                            </div>
                        </form>
                    </div>
                </div>
                <h2>Your Notes</h2>
                <div className='notesContainer'>
                    <ul>
                        {notesArray.map((note) => (
                            <li key={note.id} className='singleNotes'>
                                <div className='notetitle'>
                                    <h2>{note.title}</h2>
                                </div>
                                <div className='notecontent'>
                                    <h3>{note.content}</h3>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MainPage;
