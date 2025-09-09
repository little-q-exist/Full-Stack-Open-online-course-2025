import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
    name: 'notification',
    initialState: 'Welcome!',
    reducers: {
        setNotificationMessage(state, action) {
            return action.payload
        }
    }
})

export default notificationReducer.reducer
export const { setNotificationMessage } = notificationReducer.actions

export const setNotification = (notification, secondsToDisplay) => {
    return (dispatch) => {
        const msecond = secondsToDisplay * 1000
        dispatch(setNotificationMessage(notification))
        setTimeout(() => {
            dispatch(setNotificationMessage(''))
        }, msecond)
    }
}