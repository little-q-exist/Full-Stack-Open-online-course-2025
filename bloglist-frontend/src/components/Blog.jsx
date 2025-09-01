import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleLikeChange = (event) => {
    event.preventDefault()

    addLike(blog)
  }

  const handleDelete = (event) => {
    event.preventDefault()

    deleteBlog(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogDetails = () => {
    return (
      <div>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={handleLikeChange}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div>
          <button onClick={handleDelete}>delete</button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      {showDetails && blogDetails()}
    </div>
  )
}

export default Blog