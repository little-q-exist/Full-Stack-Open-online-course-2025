import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotificationMessage: (state, action) => {
            return action.payload
        },
    }
})

export default notificationSlice.reducer
export const { setNotificationMessage } = notificationSlice.actions

export const setNotification = (message, msecond) => {
    return (dispatch) => {
        dispatch(setNotificationMessage(message))
        setTimeout(() => {
            dispatch(setNotificationMessage(null))
        }, msecond);
    }
}