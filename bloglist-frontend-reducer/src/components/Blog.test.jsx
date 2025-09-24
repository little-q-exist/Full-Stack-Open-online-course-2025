import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { vi } from 'vitest'

test('title and author are rendered while details are not', () => {
    const blog = {
        title: 'test blog',
        author: 'Q',
        url: 'www.com',
        likes: 2
    }

    const { container } = render(<Blog blog={blog} />)

    const infoDiv = container.querySelector('.basic-info')
    const urlElement = screen.queryByText(blog.url)
    const likeElement = screen.queryByText(blog.likes)

    expect(infoDiv).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(urlElement).toBeNull()
    expect(likeElement).toBeNull()
})

test('details are shown after button clicked', async () => {
    const blog = {
        title: 'test click',
        author: 'Q',
        url: 'www.com',
        likes: 2,
        user: {
            name: 'QQ'
        }
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    screen.getByText(blog.url)
    screen.getByText(blog.likes)
})

test('clicking like twice will call func twice', async () => {
    const blog = {
        title: 'test click',
        author: 'Q',
        url: 'www.com',
        likes: 2,
        user: {
            name: 'QQ'
        }
    }

    const mockHandler = vi.fn()

    render(<Blog blog={blog} addLike={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})