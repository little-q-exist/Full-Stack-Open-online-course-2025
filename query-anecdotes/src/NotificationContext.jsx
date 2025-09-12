import { createContext, useContext, useReducer } from 'react'

const NotificationContext = createContext()

const NotificationReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE':
            return `anecdote ${action.payload} was created`
        case 'VOTE':
            return `you voted anecdote ${action.payload}`
        case 'ERROR':
            return `ERROR: ${action.payload}`
        case 'CLEAR':
            return null
        default: return state
    }
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(NotificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const valueAndDispatch = useContext(NotificationContext)
    return valueAndDispatch[0]
}


export const useNotificationDispatch = () => {
    const valueAndDispatch = useContext(NotificationContext)
    return valueAndDispatch[1]
}

export const setNotification = (dispatch, action) => {
    dispatch(action)
    setTimeout(() => {
        dispatch({ type: 'CLEAR' })
    }, 3000);
}

export default NotificationContext