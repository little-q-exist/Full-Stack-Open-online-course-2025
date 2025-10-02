import { useNavigate } from 'react-router'
import blogService from '../services/blogs'
import Comments from '../components/Comments'
import { useDispatch } from 'react-redux'
import { updateBlogs } from '../reducers/blogReducer'

const BlogView = ({ blog, addLike, deleteBlog }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

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

    const addComment = async (comment) => {
        const newBlog = await blogService.postComment(comment, blog.id)
        dispatch(updateBlogs(newBlog))
    }

    console.log(blog.id);


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

            <Comments comments={blog.comment} addComment={addComment} />
        </div>
    )
}

export default BlogView