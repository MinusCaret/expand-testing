import { test, expect } from '@playwright/test'

// test.beforeEach(async ({page}) => {
//     await page.goto('https://fakestoreapi.com/docs')
// })

test('GET /products returns product list', async ({ request }) => {
  const res = await request.get('/products/')

  expect(res.status()).toBe(200)

  const products = await res.json()
  expect(products).toBeInstanceOf(Array)
  expect(products.length).toBeGreaterThan(0)

  expect(products[0]).toMatchObject({
    id: expect.any(Number),
    title: expect.any(String),
    price: expect.any(Number),
    category: expect.any(String),
  })

  //console.log(products)
})