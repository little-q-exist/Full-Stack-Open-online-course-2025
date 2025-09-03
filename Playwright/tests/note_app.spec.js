const { test, expect, describe } = require('@playwright/test')

describe('Note App', () => {
    test('front page can be opened', async ({ page }) => {
        await page.goto('http://localhost:5173')

        const locator = page.getByText('Notes', { exact: true })
        await expect(locator).toBeVisible()
    })
})