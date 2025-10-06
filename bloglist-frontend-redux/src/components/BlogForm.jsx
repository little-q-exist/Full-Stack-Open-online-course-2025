import { useState } from "react"
import { Button } from 'antd'

const BlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleBlogSubmit = (event) => {
        event.preventDefault()

        const newBlog = { title, author, url }
        addBlog(newBlog)

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Add new blogs</h2>
            <form onSubmit={handleBlogSubmit}>
                <div>
                    <label>
                        title
                        <input type="text" value={title} onChange={({ target }) => { setTitle(target.value) }} />
                    </label>
                </div>
                <div>
                    <label>
                        author
                        <input type="text" value={author} onChange={({ target }) => { setAuthor(target.value) }} />
                    </label>
                </div>
                <div>
                    <label>
                        url
                        <input type="text" value={url} onChange={({ target }) => { setUrl(target.value) }} />
                    </label>
                </div>
                <Button htmlType='submit' color="blue" variant="solid">post blog</Button>
            </form>
        </div>
    )
}

export default BlogForm