import { createSlice } from '@reduxjs/toolkit'

const userReducer = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        }
    }
})

export default userReducer.reducer

export const { setUser } = userReducer.actions