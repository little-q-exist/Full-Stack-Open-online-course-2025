import noteReducer from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
    test('should return a state with action notes/createNote', () => {
        const state = []
        const action = {
            type: 'notes/createNote',
            payload: 'test redux reducer'
        }

        deepFreeze(state)

        const newState = noteReducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState.map(s => s.content)).toContainEqual(action.payload)
    })

    test('should return new state with action notes/toggleImportanceOf', () => {
        const state = [
            {
                content: 'the app state is in redux store',
                important: true,
                id: 1
            },
            {
                content: 'state changes are made with actions',
                important: false,
                id: 2
            }]

        const action = {
            type: 'notes/toggleImportanceOf',
            payload: {
                id: 2
            }
        }

        deepFreeze(state)

        const newState = noteReducer(state, action)

        expect(newState).toHaveLength(2)
        expect(newState).toContainEqual(state[0])
        expect(newState).toContainEqual({ ...state[1], important: true })
    })
})