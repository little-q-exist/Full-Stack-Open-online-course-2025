import useInputField from '../hooks/useInputField'

const Comments = ({ comments, addComment }) => {
    const { reset, ...comment } = useInputField('text')

    const handleCommentSubmit = event => {
        event.preventDefault()
        addComment(comment.value)
        reset()
    }

    return (
        <div>
            <h3>comments</h3>
            <form onSubmit={handleCommentSubmit}>
                <input {...comment} />
                <button type='submit'>submit</button>
            </form>
            <ul>
                {comments.map((comment, index) =>
                    <li key={`${comment}-${index}-${Math.random() * 10}`}>{comment}</li>
                )}
            </ul>
        </div>
    )
}

export default Comments