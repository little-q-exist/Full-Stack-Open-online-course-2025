import { createSlice } from '@reduxjs/toolkit'

const anecdoteReducer = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes = anecdoteToChange.votes + 1
      }
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export default anecdoteReducer.reducer
export const { addVote, createAnecdote, setAnecdotes } = anecdoteReducer.actions