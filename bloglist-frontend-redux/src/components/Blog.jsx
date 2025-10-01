import { Link } from 'react-router'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div className='basic-info'>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </div>
    </div>
  )
}

export default Blog