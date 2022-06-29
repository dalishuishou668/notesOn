import { csrfFetch } from "./csrf";


// ------------------- GET ALL NOTEBOOKS for a specific user ------------------------

const LOAD_NOTEBOOKS = 'notebooks/LOAD_NOTEBOOKS'

const loadNotebooks = (notebooks) => {

    return {
        type: LOAD_NOTEBOOKS,
        notebooks,
    }
}

export const getUserNotebooks = (userId) => async (dispatch) => {

    const res = await fetch(`/api/users/${userId}/notebooks`);

    if (res.ok) {
        const allnotebooks = await res.json();

        dispatch(loadNotebooks(allnotebooks))
        return res;
    }
}

// ----------------------- GET A SINGLE NOTEBOOK -----------------------------

const GET_SINGLE_NOTEBOOK = 'notebooks/loadNotebook';

const getNotebook = (notebook) => {
    return {
        type: GET_SINGLE_NOTEBOOK,
        payload: notebook
    }
}

export const getSingleNotebook = (notebookId) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${notebookId}`)


    if (res.ok) {
        const notebook = await res.json();

        console.log('=====:', notebook)

        dispatch(getNotebook(notebook))
    }
}


// ------------------- GET ALL NOTES OF A SPECIFIC NOTEBOOK ----------------------
// const LOAD_NOTEBOOK_NOTES = 'notebookNotes/LOAD_NOTEBOOK_NOTES';

// const getSingleNotebookNotes = (notebookNotes, notebookId) => {

//     return {
//         type: LOAD_NOTEBOOK_NOTES,
//         notebookNotes,
//         notebookId
//     }
// };


// export const getNotebookNotes = (notebookId) => async (dispatch) => {
//     const res = await fetch(`/api/notebooks/${notebookId}/notes`)

//     const notebookNotes = await res.json();
//     // console.log('in the thunk:', notebookId)
//     // console.log('in the thunk:', notebookNotes)

//     dispatch(getSingleNotebookNotes(notebookNotes, notebookId))

// }

// export const getNotebookNotes = (notebookId) => async (dispatch) => {
//     const res = await fetch(`/api/notebooks/${notebookId}`)

//     if(res.ok){
//         const notebookNotes = await res.json();
//         dispatch(getSingleNotebookNotes(notebookNotes))

//     }
// }




// ---------------------- CREATE A NOTEBOOK -------------------------------
const CREATE_NOTEBOOK = 'notebooks/CREATE_NOTEBOOK'

const createNotebook = (notebook) => {

    return {
        type: CREATE_NOTEBOOK,
        payload: notebook
    }
}

export const createNewNotebook = (newNotebook) => async (dispatch) => {
    const res = await csrfFetch(`/api/notebooks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotebook),
    });

    if (res.ok) {
        const notebook = await res.json();
        dispatch(createNotebook(notebook));

    }

}

// ---------------------- Edit A Notebook -------------------------

const EDIT_NOTEBOOK = 'notebooks/EDIT_NOTEBOOK'

export const editNotebookTitle = (notebook) => {

    return {
        type: EDIT_NOTEBOOK,
        payload: notebook
    }
}

export const editNotebook = (payload, notebookId) => async (dispatch) => {
    const res = await csrfFetch(`/api/notebooks/${notebookId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    const notebook = await res.json();
    dispatch(editNotebookTitle(notebook));
    return notebook;
}




// ----------------------- Reducer ------------------------------
const initialState = {}

const notebooksReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NOTEBOOKS:
            const banana = {}
            action.notebooks.forEach((notebook) => {
                banana[notebook.id] = notebook
            })
            return { ...banana };
        case CREATE_NOTEBOOK:
            const newState = {
                ...state, [action.payload.id]: action.payload
            }
            // const newState = {
            //     ...state, notebooks: action.payload
            // }
            return newState;
        // case LOAD_NOTEBOOK_NOTES:
        //     // const notes = {
        //     //     ...state, notes: action.payload
        //     // }
        //     // return notes;
        //     const apple = {}
        //     action.notebookNotes.forEach((notebookNote) => {
        //         apple[notebookNote.id] = notebookNote
        //     })
        //     return apple;
        case EDIT_NOTEBOOK:
            // const tomato = {...state, notebook: action.payload};
            const tomato = {...state, [action.payload.id]: action.payload};
            return tomato;
        case GET_SINGLE_NOTEBOOK:
            const potato = { ...state, notebook: action.payload }
            return potato
        default:
            return state;
    }
}

export default notebooksReducer;
