import {createSlice} from '@reduxjs/toolkit'

const blogReducer = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        setBlogs: (state, action) => {
            return action.payload
        },
        addBlog: (state, action) => {
            state.push(action.payload)
        },
        updateBlog: (state, action) => {
            return state.map(blog => blog.id === action.payload.id? action.payload : blog)
        },
        deleteBlog: (state, action) => {
            return state.filter(blog => blog.id !== action.payload.id)
        },
    }
})

export default blogReducer.reducer

export const {setBlogs, addBlog, updateBlog, deleteBlog} = blogReducer.actions