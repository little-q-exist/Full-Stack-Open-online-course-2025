import { createSlice } from '@reduxjs/toolkit'

const blogReducer = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs: (state, action) => {
            return action.payload
        },
        addBlogs: (state, action) => {
            state.push(action.payload)
        },
        updateBlogs: (state, action) => {
            return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
        },
        deleteBlogs: (state, action) => {
            return state.filter(blog => blog.id !== action.payload.id)
        },
    }
})

export default blogReducer.reducer

export const { setBlogs, addBlogs, updateBlogs, deleteBlogs } = blogReducer.actions