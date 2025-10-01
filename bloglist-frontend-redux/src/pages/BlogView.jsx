import { useNavigate } from 'react-router'

const BlogView = ({ blog, addLike, deleteBlog }) => {
    const navigate = useNavigate()

    if (!blog) {
        return <h4>Loading...</h4>
    }

    const handleAddLike = (event) => {
        event.preventDefault()
        addLike(blog)
    }

    const handleDeleteBlog = (event) => {
        event.preventDefault()
        deleteBlog(blog)
        navigate('/')
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