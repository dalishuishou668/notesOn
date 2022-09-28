import './Search.css';




import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserNotes } from "../../store/notes";
import img from '../../images/searchpanda.gif';


function Search() {

    // Get all notes
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id
    const notes = useSelector(state => state.notes)
    const notesArray = Object.values(notes)



    // // ------------------------------------------------

    const dispatch = useDispatch();

    const [filterNotes, setFilterNotes] = useState([])
    const [searchKeyword, setSearchkeyword] = useState('')


    useEffect(() => {
        dispatch(getUserNotes(userId))
    }, [dispatch])


    const handleUserSearch = (e) => {
        const inputs = e.target.value;
        setSearchkeyword(inputs)

        const filteredNotes = notesArray?.filter((note) => {
            const title = note.title.toLowerCase().includes(inputs.toLowerCase());
            return title
        })

        if (inputs === '') {
            setFilterNotes([])
        } else {
            setFilterNotes(filteredNotes)
        }

    }

    return (
        <div>
            <h1></h1>
            <div className='search-bar'>
                <img className="searchImg" src={img} alt="loading..." />
                <h4 className='searchText'>Searching ...</h4>
                <div className='searchForm'>
                    <form className='form2'>
                        <input
                            className="search"
                            placeholder="Search your note by title"
                            value={searchKeyword}
                            onChange={handleUserSearch}
                        />
                        {/* <button onClick={handleSearchSubmit}>Submit</button> */}
                    </form>
                </div>

                <div>
                    {notesArray && filterNotes.length !== 0 && (
                        <div className='searchResultContainer'>
                            {filterNotes.map((note) => (
                                <div>
                                    <NavLink
                                        className="searchResult"
                                        to={`/notebooks/${note.notebookId}`}
                                    >
                                        {note.title}
                                    </NavLink>
                                </div>
                            ))}
                        </div>
                    )}
                </div>



            </div>
        </div>


    )
}


export default Search;
