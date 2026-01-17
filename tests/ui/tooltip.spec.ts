import { test, expect } from '../../fixtures/test';

test.beforeEach(async ({page})=> {
    await page.goto('https://practice.expandtesting.com/tooltips')
})

test('Tooltip Top', async ({page}) => {
    const tooltipCard = page.locator('button', {hasText: "Tooltip on top"})
    await tooltipCard.hover()

    const tooltipID = await tooltipCard.getAttribute('aria-describedby')
    expect(tooltipID).not.toBeNull()

    //`string with holes` | ${fill this hole with x} | #${x} CSS id selector using x
    const tooltip = page.locator(`#${tooltipID}`)
    await expect(tooltip).toBeVisible()

    const tooltipText = await tooltip.locator('.tooltip-inner').innerText()
    expect(tooltipText).toBe('Tooltip on top')

    //uses dynamic IDs so this is null
    //await expect(tooltipCard).toHaveAttribute('aria-describedby, "tooltip764168"')
})