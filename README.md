This repo contains **Playwright** end-to-end tests for **expandtesting.com**.
It's a **portfolio project** showcasing how I write and structure automated tests.

## What’s in here
- Playwright test specs
- Shared setup using `test.beforeEach`
- UI interaction and assertion checks (dropdowns, forms, basic elements)

## How the tests are structured

- Each test targets a specific page
- Locators are defined close to where they’re used for readability
- Assertions check both structure (counts, text) and behaviour (selected values)
- Loops are used to avoid repetitive test steps
