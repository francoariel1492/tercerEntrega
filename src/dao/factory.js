const { persistence } = require("../config/app.config");

let UsersDao;
let ProductsDao;
let CartsDao;

switch (persistence) {
    case 'memory':
        UsersDao = require("./memory/Users.memory");
        ProductsDao = require("./memory/Products.memory");
        CartsDao = require("./memory/Carts.memory")
        break;

    case 'mongo':
        UsersDao = require("./mongo/Users.mongo");
        ProductsDao = require("./mongo/Products.mongo");
        CartsDao = require("./mongo/Carts.mongo")
        break;

    default:
        throw new Error(`Invalid persistence option: ${persistence}`);
}

module.exports = { UsersDao, ProductsDao, CartsDao };
