const noteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_NOTE':
            return [...state, action.payload]
        case 'TOGGLE_IMPORTANCE': {
            const id = action.payload.id
            const noteToChange = state.find(n => n.id === id)
            const newNote = { ...noteToChange, important: !noteToChange.important }

            return state.map(note => note.id === newNote.id ? newNote : note)
        }
        default:
            return state
    }
}

export default noteReducer