// import { csrfFetch } from "./csrf";

// // ---------------------------------------------------
// const SEARCH_NOTE = "notes/SEARCH_NOTE";

// const searchSingleNote = (notes) => {
//   return {
//     type: SEARCH_NOTE,
//     notes,
//   };
// };

// export const searchNotes = (results, userId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/search/notes`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ results, userId }),
//   });

//   const note = await res.json();
//   console.log('search thunk:', note)
//   dispatch(searchSingleNote(note));
// };

// // --------------------------------------------------

// const initialState = {};

// const searchReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SEARCH_NOTE:
//         const banana = {};
//         action.notes.forEach((note) => {
//             banana[note.id] = note
//         })

//       return banana;
//     default:
//       return state;
//   }
// };

// export default searchReducer;
