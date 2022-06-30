import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
// import { searchNotes } from '../../store/search';
// import { getUserNotebooks } from "../../store/notebooks";
import { getUserNotes } from "../../store/notes";


function Search({ sessionUser, notebooks }) {

    // Get all notes
    const userId = sessionUser.id
    const notes = useSelector(state => state.notes)

    console.log('notes OBJ:', notes)
    const notesArray = Object.values(notes)
    console.log('notesArr:', notesArray)


    // ------------------------------------------------

    const dispatch = useDispatch();

    const [filter, setFilter] = useState([])
    const [searchWord, setSearchword] = useState('')


    useEffect(() => {
        dispatch(getUserNotes(userId))
    }, [dispatch])


    const handleSearch = (e) => {
        const words = e.target.value;


        setSearchword(words)

        const filterNotes = notesArray?.filter((note) => {
            const title = note.title.toLowerCase().includes(words.toLowerCase());
            return title
        })



        if (words === '') {
            setFilter([])
        } else {
            setFilter(filterNotes)
        }

    }

    return (
        <div className='search-bar'>

            <div className='searchForm'>
                <form>
                    <input
                        className="search"
                        placeholder="Search By Title"
                        value={searchWord}
                        onChange={handleSearch}
                    />
                    {/* <button onClick={handleSearchSubmit}>Submit</button> */}
                </form>
            </div>

            <div>
                {notesArray && filter.length !== 0 && (
                    <div className='searchResultContainer'>
                        {filter.map((note) => (
                            <div>
                                <NavLink
                                    className="searchResult"
                                    to={`/notebooks/${note.notebookId}`}
                                >
                                    {note.title.length > 10
                                        ? note.title.slice(0, 10) + "..."
                                        : note.title}
                                </NavLink>
                            </div>
                        ))}
                    </div>
                )}
            </div>


            {/* {show ? (
                <div className='searchResult'>

                    {search?.length >= 1 &&
                        notes?.map((note) => (
                            <div id={note.id} key={note.id}>
                                <NavLink
                                    to={`/notebooks/${note.notebookId}`}
                                >
                                    {note.title.length > 10
                                        ? note.title.slice(0, 11) + "..."
                                        : note.title}
                                </NavLink>
                            </div>
                        ))}
                </div>
            ) : (
                <div></div>
            )} */}

        </div>

    )
}


export default Search;
