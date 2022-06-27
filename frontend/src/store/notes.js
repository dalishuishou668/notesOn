import { csrfFetch } from "./csrf";

// ------------------- GET A SINGLE NOTE ----------------------
const GET_SINGLE_NOTE = 'note/GET_SINGLE_NOTE';

const getNote = (note) => {
    return {
        type: GET_SINGLE_NOTE,
        payload: note
    }
}

export const getSingleNote = (noteId) => async(dispatch) => {

    const res = await fetch(`/api/notes/${noteId}`)

    if(res.ok){
        const note = await res.json();
        dispatch(getNote(note));
    }
}

// ---------- GET ALL NOTES for a specific user ---------------

const LOAD_ALL_NOTES = 'notebooks/LOAD_ALL_NOTES ';

const loadAllNotes = (notes) => {
    return {
        type: LOAD_ALL_NOTES ,
        notes,
    }
}

export const getUserNotes = (userId) => async (dispatch) => {

    const res = await fetch(`/api/users/${userId}/notes`);

    if (res.ok) {
        const allnotes = await res.json();
        console.log('notes in thunk:', allnotes)
        dispatch(loadAllNotes(allnotes))
        return res;
    }
}


// ------------------- CREATE A NEW NOTE --------------------

const ADD_NOTE = 'notes/ADD_NOTE';

const addNote = (note) => {
    return {
        type: ADD_NOTE,
        payload: note
    }
}

export const createNote = (note) => async (dispatch) => {
    const res = await csrfFetch(`/api/notes`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
    })

    if(res.ok) {
        const note = await res.json();
        console.log('Create Note Thunk:', note)
        dispatch(addNote(note))
        return note
    }
}

// --------------- DELETE A NOTE ---------------------------

const DELETE_NOTE = 'note/DELETE_NOTE';

const removeNote = (noteId) => {
    return {
        type: DELETE_NOTE,
        payload: noteId
    }
}

export const deleteNote = (noteId) => async(dispatch) => {
    const res = await csrfFetch(`/api/notes/${noteId}`,{
        method: 'DELETE'
    })

    if(res.ok) {
        const oldNote = await res.json();
        dispatch(removeNote(oldNote))
    }
}

// -------------------- EDIT A NOTE -----------------------
const EDIT_NOTE = 'note/EDIT_NOTE';

const editNote = (note) => {
    return {
        return: EDIT_NOTE,
        payload: note
    }
}

export const editSingleNote = (payload, noteId) => async(dispatch) => {
    const res = await csrfFetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    });

    const newNote = await res.json();

    console.log('edit thunk:', newNote)
    dispatch(editNote(newNote))
}


// -------------------- Reducer --------------------------
const initialState = {};

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_NOTES :
            const apple = {}
            action.notes.forEach((note) => {
                apple[note.id] = note
            })
            return apple;
        case ADD_NOTE:  // need debugging for create a note
            const newState = {
                ...state, [action.payload.id]: action.payload
            }
            return newState;
        case GET_SINGLE_NOTE: //////////////////
            return {...state, note: action.payload}
        case EDIT_NOTE: // ????????????????????
            return {...state, [action.payload.id]: action.payload }
        default:
            return state;
    }
}

export default notesReducer;
