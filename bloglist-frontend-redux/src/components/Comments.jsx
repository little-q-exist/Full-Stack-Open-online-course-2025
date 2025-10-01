const Comments = ({ comments }) => {
    return (
        <div>
            <h3>comments</h3>
            <ul>
                {comments.map((comment, index) =>
                    <li key={`${comment}-${index}-${Math.random() * 10}`}>{comment}</li>
                )}
            </ul>
        </div>
    )
}

export default Comments