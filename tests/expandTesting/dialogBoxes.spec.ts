import {test, expect} from '@playwright/test'

test.beforeEach(async ({page, context})=> {
    //delyeet ads
    await context.route(
    /googleads|doubleclick|googlesyndication/,
    route => route.abort()
  )
    await page.goto('https://practice.expandtesting.com/js-dialogs')
})

test('Alert', async ({page})=>{
    page.once('dialog', dialog=>{
        expect(dialog.message()).toEqual('I am a Js Alert')
        dialog.accept()
    })
    await page.locator('#js-alert').click()
    await expect(page.locator('#dialog-response')).toHaveText('OK')
})

test('Confirm', async({page})=> {
    page.once('dialog', dialog=>{
        expect(dialog.message()).toEqual('I am a Js Confirm')
        dialog.accept()
    })
    await page.locator('#js-confirm').click()
    await expect(page.locator('#dialog-response')).toHaveText('Ok')
})

test('Confirm - Cancel', async({page})=> {
    page.once('dialog', dialog=>{
        expect(dialog.message()).toEqual('I am a Js Confirm')
        dialog.dismiss()
    })
    await page.locator('#js-confirm').click()
    await expect(page.locator('#dialog-response')).toHaveText('Cancel')
})

test('Prompt', async({page})=>{
    page.once('dialog', dialog=>{
        expect(dialog.message()).toEqual('I am a Js prompt')
        dialog.accept('bean')
    })
    await page.locator('#js-prompt').click()
    await expect(page.locator('#dialog-response')).toHaveText('bean')
})

test('Prompt - Cancel', async({page})=>{
    page.once('dialog', dialog=>{
        expect(dialog.message()).toEqual('I am a Js prompt')
        dialog.dismiss()
    })
    await page.locator('#js-prompt').click()
    await expect(page.locator('#dialog-response')).toHaveText('')
})