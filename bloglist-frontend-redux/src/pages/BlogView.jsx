const BlogView = ({ blog }) => {
    return (
        <div>
            <h2>{blog.title}</h2>
            <h3>{blog.author}</h3>
            <a href="#">{blog.url}</a>
            <div>{blog.likes} likes</div>
            <div>added by {blog.user.name}</div>
        </div>
    )
}

export default BlogView