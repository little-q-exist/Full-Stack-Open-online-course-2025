import { screen, render } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { expect, vi } from 'vitest'

test('<BlogForm /> update states and calls onSubmit', async () => {
    const blog = {
        title: 'test blog',
        author: 'Q',
        url: 'www.com'
    }

    const addBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm addBlog={addBlog} />)

    const titleInput = screen.getByLabelText('title')
    const authorInput = screen.getByLabelText('author')
    const urlInput = screen.getByLabelText('url')
    const sendButton = screen.getByText('post blog')

    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)

    await user.click(sendButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe(blog.title)
    expect(addBlog.mock.calls[0][0].author).toBe(blog.author)
    expect(addBlog.mock.calls[0][0].url).toBe(blog.url)
})