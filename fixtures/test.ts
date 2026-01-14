import { test as base } from '@playwright/test';

export const test = base.extend({
  context: async ({ context }, use) => {
    await context.route(
      /googleads|doubleclick|googlesyndication/,
      route => route.abort()
    );

    await use(context);
  }
});