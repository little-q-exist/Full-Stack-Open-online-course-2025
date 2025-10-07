import blogService from '../services/blogs'
import Comments from '../components/Comments'
import { useDispatch } from 'react-redux'
import { updateBlogs } from '../reducers/blogReducer'

import { Button, Popconfirm, Tooltip } from 'antd'

const BlogView = ({ blog, addLike, deleteBlog }) => {
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
                <Tooltip title='Like'>
                    <Button onClick={handleAddLike} shape='circle' type='primary'>L</Button>
                </Tooltip>
            </div>
            <div>added by {blog.user.name}</div>
            <Popconfirm
                title='Delete this blog'
                description='Are you sure to delete this blog?'
                okText='Yes'
                cancelText='No'
                onConfirm={handleDeleteBlog}
            >
                <Button danger type='text'>delete</Button>
            </Popconfirm>

            <Comments comments={blog.comment} addComment={addComment} />
        </div>
    )
}

export default BlogView