import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blogs = ({ noteFormRef, addBlog, blogToShow }) => {
    return (
        <div>
            <Togglable buttonLabel={'Create a new blog'} ref={noteFormRef}>
                <BlogForm addBlog={addBlog} />
            </Togglable>

            {blogToShow}
        </div>
    )
}

export default Blogs