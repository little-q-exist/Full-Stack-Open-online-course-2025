import { useReducer, createContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.payload
        case 'CLEAR':
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [message, messageDispatch] = useReducer(notificationReducer, null)
    return (
        <NotificationContext.Provider value={[message, messageDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext