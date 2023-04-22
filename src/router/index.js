const UsersController = require('../users/users.controller')
const ProductsController = require('../products/products.controller')
const CartsController = require('../carts/carts.controller')

const usersController = new UsersController()
const productsController = new ProductsController()
const cartsController = new CartsController()

const router = app => {
  app.use('/users', usersController.getRouter())
  app.use('/api/products', productsController.getRouter())
  app.use('/api/carts', cartsController.getRouter())
}

module.exports = router