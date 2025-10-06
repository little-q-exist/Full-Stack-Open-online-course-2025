import { useSelector } from 'react-redux'
import { Alert } from 'antd'

const Notification = () => {
    const notification = useSelector((state) => state.notification)
    if (notification) {
        const { message, type } = notification

        console.log(type);


        if (type !== 'success' && type !== 'info' &&
            type !== 'warning' && type !== 'error' && !type) {
            return (
                <Alert message={message} type='info' />
            )
        }

        return (
            <Alert message={message} type={type} />
        )
    }
    return null
}

export default Notification