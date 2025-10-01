import { useState } from 'react'
import { Link } from 'react-router'

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
      <div className='details'>
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
      <div className='basic-info'>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        <button onClick={toggleDetails}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      {showDetails && blogDetails()}
    </div>
  )
}

export default Blog