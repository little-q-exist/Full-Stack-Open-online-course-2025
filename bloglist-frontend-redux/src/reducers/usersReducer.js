import { createSlice } from '@reduxjs/toolkit'

const usersReducer = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        }
    }
})

export default usersReducer.reducer

export const { setUsers } = usersReducer.actions