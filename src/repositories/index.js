const UsersRepository = require("./Users.repository");
const ProductsRepository = require("./Products.repository");
const CartsRepository = require("./Carts.repository");

//aca llega la clase completa segun la persistencia elegida
const { UsersDao, ProductsDao, CartsDao } = require("../dao/factory");

//y aca la instanciamos, ATENCION A ESTO

const users = new UsersRepository(new UsersDao());
const products = new ProductsRepository(new ProductsDao());
const carts = new CartsRepository(new CartsDao());

module.exports = { users, products, carts };
