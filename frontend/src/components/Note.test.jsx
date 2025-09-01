import { render, screen } from '@testing-library/react'
import Note from './Note'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'

test('renders content', () => {
    const note = {
        content: 'test note',
        important: true
    }

    render(<Note note={note} />)



    const element = screen.getByText('test note')
    expect(element).toBeDefined()
})

test('clicking the button calls the event handler', async () => {
    const note = {
        content: 'test clicking',
        important: true
    }

    const mockHandler = vi.fn()

    render(
        <Note note={note} toggleImportance={mockHandler} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('make not important')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})