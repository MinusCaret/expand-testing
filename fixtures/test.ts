import { test as base } from '@playwright/test'
import { PageManager } from '../page-objects/PageManager'
 
export const test = base.extend<{ pageManager: PageManager }>({
  context: async ({ context }, use) => {
    await context.route(
      /googleads|doubleclick|googlesyndication/,
      route => route.abort()
    );
    await use(context)
  },

  pageManager: async ({ page }, use) => {
    const pm = new PageManager(page)
    await use(pm)
  }
})

export { expect } from '@playwright/test'
