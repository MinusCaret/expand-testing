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

    await page.goto('https://fakestoreapi.com')

    const products = await page.evaluate(async () => {
        const response = await fetch('/products')
        return await response.json()
    })
    
    expect(products).toBeInstanceOf(Array)

    //Check if item is using real data
    expect(products[0].title).toContain('Fjallraven')
    expect(products.length).toBe(20)
    console.log(products)
})

test('GET /products/{id} returns single product', async ({ page }) => {
    await page.route('**/products/*', async route => {
        const url = route.request().url()
        //grab ID from the end of the URL
        const idFromUrl = parseInt(url.split('/').pop() ?? '')
        const singleProduct = mockProducts.find(product => product.id === idFromUrl)

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(singleProduct)
        })
    })

    await page.goto('https://fakestoreapi.com')

    const randomId = Math.floor(Math.random() * 20) + 1
    const product = await page.evaluate(async (id) => {
        const response = await fetch(`/products/${id}`)
        return await response.json()
    }, randomId)
    
    expect(product).not.toBeInstanceOf(Array)
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

test('POST /products creates a new product', async ({ page }) => {
    const newProductData = {
        title: faker.commerce.productName(),
        price: faker.number.float({ fractionDigits: 2, min: 5, max: 100 }),
        description: faker.commerce.productDescription(),
        category: faker.commerce.product(), //api accepts anything as long as it's a string, otherwise use an array
        image: faker.image.url()
    }
    
    await page.route('**/products', async route => {
        if (route.request().method() === 'POST') {
            const sentData = route.request().postDataJSON()

            await route.fulfill({
                status: 201,
                contentType: 'application/json',
                json: {
                    id: 21,
                    ...sentData 
                }
            })
        } else {
            await route.continue()
        }
    })
    
    await page.goto('https://fakestoreapi.com')

    const responseBody = await page.evaluate(async (data) => {
        const response = await fetch('/products', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        return await response.json();
    }, newProductData)

    expect(responseBody.id).toBe(21)
    expect(responseBody.title).toBe(newProductData.title)
    console.log(responseBody)
})

// test('PUT /products/{id} updates product by ID', async ({ request }) => {

// })

// test('DEL /products/{id} deletes specific product by ID', async ({ request }) => {

// }) 