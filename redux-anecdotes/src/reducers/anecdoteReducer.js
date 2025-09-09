import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const anecdoteReducer = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const newAnecdote = action.payload
      return state.map(anecdote => anecdote.id === newAnecdote.id ? newAnecdote : anecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export default anecdoteReducer.reducer
export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteReducer.actions

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (anecdoteToChange) => {
  return async (dispatch) => {
    const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
    const newAnecdote = await anecdoteService.update(changedAnecdote.id, changedAnecdote)
    dispatch(updateAnecdote(newAnecdote))
  }
}