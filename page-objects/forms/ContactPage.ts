import { Page, Locator } from '@playwright/test'
import { HelperBase } from '../HelperBase'

export class ContactPage extends HelperBase{

    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly messageInput: Locator
    readonly sendButton: Locator

    constructor(page: Page){
        super(page)
        this.nameInput = page.locator('label:has-text("Name") + input')
        this.emailInput = page.locator('label:has-text("Email") + input')
        this.messageInput = page.locator('label:has-text("You message") + textarea') //Typo intended
        this.sendButton = page.getByRole('link', { name: 'Send'})
    }

    async fillForm(name: string, email: string, message: string){
        await this.fill(this.nameInput, name)
        await this.fill(this.emailInput, email)
        await this.fill(this.messageInput, message)
    }

    async submitForm(){
        await this.click(this.sendButton)
    }

}