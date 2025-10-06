import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { List } from 'antd'
import Blog from '../components/Blog'

const Blogs = ({ noteFormRef, addBlog, blogToShow }) => {
    return (
        <div>
            <List
                bordered
                footer={
                    <Togglable buttonLabel={'Create a new blog'} ref={noteFormRef}>
                        <BlogForm addBlog={addBlog} />
                    </Togglable>
                }
                dataSource={blogToShow}
                renderItem={blog => <List.Item><Blog blog={blog} /></List.Item>}
            />
        </div>
    )
}

export default Blogs