import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

test('GET /products returns product list', async ({ request }) => {
    const response = await request.get('/products')

    //expect(response.ok()).toBeTruthy()

    if (!response.ok()) {
        console.error(`Error Status: ${response.status()}`);
        console.error(`Error Body: ${await response.text()}`);
    }

    const products = await response.json()
    expect(products).toBeInstanceOf(Array)
    expect(products.length).toBeGreaterThan(0)

    expect(products[0]).toMatchObject({
    id: expect.any(Number),
    title: expect.any(String),
    price: expect.any(Number),
    category: expect.any(String),
  })
    console.log(products)
})

test('GET /products/{id} returns single product', async ({ request }) => {
    const randomId = Math.floor(Math.random() * 20) + 1
    const response = await request.get(`/products/${randomId}`)

    expect(response.ok()).toBeTruthy()

    const product = await response.json()

    expect(product).not.toBeInstanceOf(Array)
    expect(typeof product).toBe('object')

    expect(product.id).toBe(randomId)

    expect(product).toMatchObject({
    id: expect.any(Number),
    title: expect.any(String),
    price: expect.any(Number),
    description: expect.any(String),
    category: expect.any(String),
    image: expect.any(String),
    rating: expect.objectContaining({
        rate: expect.any(Number),
        count: expect.any(Number)
    })
  })
    console.log(product)
})

test('POST /products creates a new product', async ({ request }) => {
    const newProductData = {
        title: faker.commerce.productName(),
        price: faker.number.float({ fractionDigits: 2, min: 5, max: 100 }),
        description: faker.commerce.productDescription(),
        category: faker.commerce.product(), //api accepts anything as long as it's a string, otherwise use an array
        image: faker.image.url()
    }

    const response = await request.post('/products', {
        data: newProductData
    })

    expect(response.ok()).toBeTruthy()

    const responseBody = await response.json()
    console.log(responseBody)

    expect(responseBody).toMatchObject({
        id: expect.any(Number),
        title: newProductData.title,
        price: newProductData.price
    })
})

test('PUT /products/{id} updates product by ID', async ({ request }) => {

})

test('DEL /products/{id} deletes specific product by ID', async ({ request }) => {

}) 