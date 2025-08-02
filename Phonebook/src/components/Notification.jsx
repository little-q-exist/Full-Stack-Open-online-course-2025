const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    const { content, error } = message
    if (error === true) {
        return <div className="error">{content}</div>
    }

    return (
        <div className="message">
            {content}
        </div>
    )
}

export default Notification