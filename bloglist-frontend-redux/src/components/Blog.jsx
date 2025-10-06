import { Link } from 'react-router'

const Blog = ({ blog }) => {
  return (
    <div>
      <div className='basic-info'>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </div>
    </div>
  )
}

export default Blog