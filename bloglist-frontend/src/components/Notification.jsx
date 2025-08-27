const Notification = ({ message }) => {
    if (message) {
        return (
            <p>{message}</p>
        )
    }
    return null
}

export default Notification