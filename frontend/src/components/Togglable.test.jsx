import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import { beforeEach, describe, expect, test } from 'vitest'

describe('<Togglable />', () => {
    beforeEach(() => {
        render(
            <Togglable buttonLabel={'show'}>
                <div>content</div>
            </Togglable>
        )
    })
    test('renders its children', () => {
        screen.getByText('content')
    })

    test('at the start children are not displayed', () => {
        const element = screen.getByText('content')
        expect(element).not.toBeVisible()
    })

    test('after clicking the button children displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show')
        await user.click(button)

        const element = screen.getByText('content')
        expect(element).toBeVisible()
    })
})