import { useSelector } from 'react-redux'

const Notification = () => {
    const message = useSelector((state) => state.notification)
    if (message) {
        return (
            <p>{message}</p>
        )
    }
    return null
}

export default Notification