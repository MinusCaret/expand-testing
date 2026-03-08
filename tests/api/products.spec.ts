import { test, expect } from '@playwright/test'
import mockProducts from '../../test-data/mockProducts.json'
import { faker } from '@faker-js/faker'

test('GET /products returns product list', async ({ page }) => {
    await page.route('**/products', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            json: mockProducts
        })
    }) 

    const response = await page.request.get('/products')

    const contentType = response.headers()['content-type']
    if (!contentType || !contentType.includes('application/json')) {
        const body = await response.text()
        throw new Error(`Expected JSON but got ${contentType}. Body: ${body.slice(0, 100)}...`)
    }
    
    const products = await response.json()
    
    expect(response.ok()).toBeTruthy()
    expect(products).toBeInstanceOf(Array)

    //Check if item is using real data
    expect(products[0].title).toContain('Fjallraven')
    expect(products.length).toBe(20);
})

// test('GET /products/{id} returns single product', async ({ request }) => {
//     const randomId = Math.floor(Math.random() * 20) + 1
//     const response = await request.get(`/products/${randomId}`)

//     expect(response.ok()).toBeTruthy()

//     const product = await response.json()

//     expect(product).not.toBeInstanceOf(Array)
//     expect(typeof product).toBe('object')

//     expect(product.id).toBe(randomId)

//     expect(product).toMatchObject({
//     id: expect.any(Number),
//     title: expect.any(String),
//     price: expect.any(Number),
//     description: expect.any(String),
//     category: expect.any(String),
//     image: expect.any(String),
//     rating: expect.objectContaining({
//         rate: expect.any(Number),
//         count: expect.any(Number)
//     })
//   })
//     console.log(product)
// })

// test('POST /products creates a new product', async ({ request }) => {
//     const newProductData = {
//         title: faker.commerce.productName(),
//         price: faker.number.float({ fractionDigits: 2, min: 5, max: 100 }),
//         description: faker.commerce.productDescription(),
//         category: faker.commerce.product(), //api accepts anything as long as it's a string, otherwise use an array
//         image: faker.image.url()
//     }

//     const response = await request.post('/products', {
//         data: newProductData
//     })

//     expect(response.ok()).toBeTruthy()

//     const responseBody = await response.json()
//     console.log(responseBody)

//     expect(responseBody).toMatchObject({
//         id: expect.any(Number),
//         title: newProductData.title,
//         price: newProductData.price
//     })
// })

// test('PUT /products/{id} updates product by ID', async ({ request }) => {

// })

// test('DEL /products/{id} deletes specific product by ID', async ({ request }) => {

// }) 