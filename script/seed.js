'use strict'

const db = require('../server/db/db')
const { Users, Products, Orders, OrderProducts } = require('../server/db/models')
const { faker } = require('@faker-js/faker');

async function seed() {
  try {
    await db.sync({ force: true })
    console.log('db synced!')


    // Declare a variable and set it equal to an array. 
    let users = []

    // This for loop decides how many datapoints you will create.
    // If you want to change the amount, just change the number in the for loop!
    for (let i = 0; i < 20; i++) {
      // The keys in this user object are set equal to the fake information

      let newUser = {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        address: faker.location.streetAddress() + ", " + faker.location.city() + ", " + faker.location.state({ abbreviated: true }) + ' ' + faker.location.zipCode('#####'),
        phone: faker.phone.number('+1 ###-###-####'),
        // password: faker.internet.password({ length: 10}),
        password: 'hi',

      }
      console.log(`Password for user ${i + 1} is:`, newUser.password);

      // For each fake user you create, you're going to push them into the user array you declare above
      users.push(newUser)
    }

    // For each user in the array, you are going to create a new user instance in the database
    await Promise.all(users.map((user) => Users.create(user)));


    // Declare a variable and set it equal to an array. 
    let orders = []

    // This for loop decides how many datapoints you will create.
    // If you want to change the amount, just change the number in the for loop!
    for (let i = 0; i < 20; i++) {
      // The keys in this user object are set equal to the fake information

      let newOrders = {
        userId: faker.number.int({ min: 1, max: 20 })
      }

      // For each fake user you create, you're going to push them into the user array you declare above
      orders.push(newOrders)
    }

    // For each user in the array, you are going to create a new user instance in the database
    await Promise.all(orders.map((order) => Orders.create(order)))

    // Declare a variable and set it equal to an array. 
    let products = []
    // let prices = [] // Array to store the randomly generated prices

    // This for loop decides how many datapoints you will create.
    // If you want to change the amount, just change the number in the for loop!
    for (let i = 0; i < 20; i++) {
      const price = faker.commerce.price({ min: 1, max: 200 })
      // console.log(price)
      // prices.push(price)
      // The keys in this user object are set equal to the fake information

      let newProducts = {
        name: faker.commerce.productName(),
        image: faker.image.urlLoremFlickr({ category: 'fashion' }),
        description: faker.commerce.productAdjective(),
        category: faker.commerce.product(),
        price: price,
        stock: '2'
      }

      // For each fake user you create, you're going to push them into the user array you declare above
      products.push(newProducts)
    }

    // For each user in the array, you are going to create a new user instance in the database
    await Promise.all(products.map((product) => Products.create(product)));

    // Declare a variable and set it equal to an array. 
    let orderProducts = []
    // let orderProductsCounter = 1

    // This for loop decides how many datapoints you will create.
    // If you want to change the amount, just change the number in the for loop!
    for (let i = 0; i < 20; i++) {
      // const quantity = faker.number.int({ min: 1, max: 2 })
      // const finalPrice = quantity === 2 ? prices[i] * 2 : prices[i] // Use the stored price for the corresponding order product. Double the price if quantity is 2, otherwise use the regular price
      // The keys in this user object are set equal to the fake information

      let newOrderProducts = {
        orderId: faker.number.int({ min: 1, max: 20 }),
        productId: faker.number.int({ min: 1, max: 20 }),
        quantity: faker.number.int({ min: 1, max: 50 }),
        //   quantity: quantity,
        //   price: finalPrice,
        //   productId: orderProductsCounter
      }

      // For each fake user you create, you're going to push them into the user array you declare above
      orderProducts.push(newOrderProducts)
      // orderProductsCounter++; // Increment the orderProducts counter variable

    }

    // For each user in the array, you are going to create a new user instance in the database
    await Promise.all(orderProducts.map((oProduct) => OrderProducts.create(oProduct)));

    console.log(`seeded ${users.length} users. Woof~`)
    console.log(`seeded ${orders.length} orders. Woof~`)
    console.log(`seeded ${products.length} products. Woof~`)
    console.log(`seeded ${orderProducts.length} order products. Woof~`)

  } catch (err) {
    console.log(err)
  }

  console.log(`seeded successfully`)
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  }
  finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed