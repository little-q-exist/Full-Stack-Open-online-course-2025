const BlogView = ({ blog, addLike, deleteBlog }) => {
    if (!blog) {
        return null
    }

    const handleAddLike = (event) => {
        event.preventDefault()
        addLike(blog)
    }

    const handleDeleteBlog = (event) => {
        event.preventDefault()
        deleteBlog(blog)
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <h3>{blog.author}</h3>
            <a href="#">{blog.url}</a>
            <div>
                {blog.likes} likes
                <button onClick={handleAddLike}>like</button>
            </div>
            <div>added by {blog.user.name}</div>
            <button onClick={handleDeleteBlog}>delete</button>
        </div>
    )
}

export default BlogView