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

export const setNotification = (notification, msecond) => {
    return (dispatch) => {
        dispatch(setNotificationMessage(notification))
        setTimeout(() => {
            dispatch(setNotificationMessage(null))
        }, msecond);
    }
}