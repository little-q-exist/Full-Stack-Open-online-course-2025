import blogService from '../services/blogs'
import Comments from '../components/Comments'
import { useDispatch } from 'react-redux'
import { updateBlogs } from '../reducers/blogReducer'
import { LikeOutlined } from '@ant-design/icons'

import { Button, Descriptions, Popconfirm, Statistic } from 'antd'

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

    const items = [
        {
            key: 'author',
            label: 'Author',
            children: blog.author
        },
        {
            key: 'url',
            label: 'Url',
            children: <a href="#">{blog.url}</a>
        },
        {
            key: 'likes',
            label: 'Likes',
            children: <Statistic value={blog.likes} prefix={<Button onClick={handleAddLike} color='blue' variant='text' icon={<LikeOutlined style={{ fontSize: 'x-large' }} />} size='large' />} />
        },
        {
            key: 'creator',
            label: 'Creator',
            children: blog.user.name
        }
    ]

    return (
        <div>
            <Descriptions title={blog.title}
                items={items}
                bordered
                layout='vertical'
                extra={
                    <Popconfirm
                        title='Delete this blog'
                        description='Are you sure to delete this blog?'
                        okText='Yes'
                        cancelText='No'
                        onConfirm={handleDeleteBlog}
                    >
                        <Button danger type='primary'>delete</Button>
                    </Popconfirm>
                }
            />

            <Comments comments={blog.comment} addComment={addComment} />
        </div>
    )
}

export default BlogView