This repo contains **Playwright** end-to-end tests for **expandtesting.com**.
It's a portfolio project showcasing how I write and structure automated tests.

## What’s in here
- Playwright tests covering forms, UI testing and more
- Tests are currently functional and cover positive & negative scenarios
- Introduced ad blocking fixture to remove third-party noise and improve test stability
- **Work in progress:** Refactoring existing tests into a POM structure for improved maintainability and scalability

## How the tests are structured

- Each test targets a specific page or feature
- Locators are defined close to where they’re used for readability
- Assertions check both structure (counts, text) and behaviour (selected values)
- Loops are used to avoid repetitive test steps
