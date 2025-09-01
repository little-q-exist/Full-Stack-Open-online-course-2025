import { useState } from "react"

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
                <button type='submit'>post blog</button>
            </form>
        </div>
    )
}

export default BlogForm