
function MainNotebooks({notebooksArray}) {

    console.log('notebooksArray in mainNotebooks', notebooksArray)
    return (
        <div>
            <ul>
            {notebooksArray.map((notebook) => {
                <li>
                    {notebook.title}
                </li>
            })}
            </ul>
        </div>
    )
}

export default MainNotebooks;

// import { useSelector, useDispatch } from 'react-redux';
// import { NavLink, useHistory } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import {getUserNotebooks} from '../../store/notebooks';

// function Notebook() {

//     const dispatch = useDispatch();

//     // fetch all notebooks from a specific user and display

//     const notebooks = useSelector(state => state.notebooks);
//     console.log('notebooks--------:', notebooks)
//     const notebooksArray = Object.values(notebooks)

//     const sessionUser = useSelector(state => state.session.user);
//     console.log("-----------------------sessionUser:", sessionUser.id)

//     useEffect(() => {
//         dispatch(getUserNotebooks(sessionUser.id));
//     }, [dispatch])

//     return (
//         <div>
//             {notebooks && notebooksArray.map((notebook) => {
//                 <div>
//                     {notebook.title}
//                 </div>
//             })}
//         </div>
//     )
// }

// export default Notebook;
