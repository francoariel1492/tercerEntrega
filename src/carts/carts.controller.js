const Route = require("../router/router");
const { carts } = require("../repositories");

class CartRouter extends Route {
  init() {
    //👍
    this.get("/", ["PUBLIC"], async (req, res) => {
      try {
        const cart = await carts.getCarts();
        console.log(cart)
        res.sendSuccess(cart)
      } catch (error) {
        res.sendServerError(`${error}`);
      }
    });

    //👍
    this.post("/", ["PUBLIC"], async (req, res) => {
      try {
        const newCart = req.body
        console.log(newCart)
        const createdCart = await carts.addCart(newCart);
        console.log(createdCart)
        res.sendSuccess(createdCart)
      } catch (error) {
        res.status(500).sendServerError({ mesagge: "Internal server error" });
      }
    });
    //👍
    this.get("/:id", ["PUBLIC"], async (req, res) => {
      try {
        const cartId = req.params.id;
        const cart = await carts.getCartById(cartId);
        if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
        }
        res.sendSuccess(cart)
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
    });

    this.post("/:cid/products/:pid", ["PUBLIC"], async (req, res) => {
      try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const getCartById = await carts.getCartById(cartId);
        const verifyExistence = getCartById.products.find(
          (e) => e.product == productId
        );
        console.log(verifyExistence)

        if (verifyExistence) {
          const updateCartProducts = await carts.postCartProductsId(
            cartId,
            productId,
            true
          );
          res.status(200).json({ mesagge: updateCartProducts });
        } else {
          const updateCartProducts = await carts.postCartProductsId(
            cartId,
            productId,
            false
          );
          res.status(200).json({ mesagge: updateCartProducts });
        }
      } catch (error) {
        res.status(500).json({ message: "Internal server rerror" });
      }
    });

    this.delete("/:cid/products/:pid", async (req, res) => {
      try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const getCartById = await carts.getCartById(cartId);
        const getProductById = await productManager.getProductById(productId);
        const productoTitulo = getProductById.title;

        const verifyExistence = getCartById.products.find(
          (p) => p.product._id == productId
        );
        console.log(verifyExistence);
        if (verifyExistence === undefined) {
          res.status(404).json({ mesagge: "not found" });
        } else {
          const productsArrayPosition = getCartById.products.findIndex(
            (item) => item.id === productId
          );
          getCartById.products.splice(productsArrayPosition, 1);
          let newArray = getCartById.products;
          const deleteCartProducts = await carts.deleteCartProductsId(
            cartId,
            newArray
          );
          res.status(200).json({ mesagge: deleteCartProducts });
        }
      } catch (error) {
        res.status(500).json({ message: "Internal server rerror" });
      }
    });

    this.delete("/:id", async (req, res) => {
      try {
        const cartId = req.params.id;
        const getById = await carts.deleteById(cartId);
        res.status(200).json({ mesagge: getById });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    //👍
    this.delete("/", ["PUBLIC"], async (req, res) => {
      try {
        const pDeleted = await carts.deleteAll();
        res.sendSuccess({ mesagge: pDeleted });
      } catch (error) {
        res.status(500).sendServerError({ message: "Internal Server Error" });
      }
    });

    this.put("/:cid/products/:pid", async (req, res) => {
      const { quantity } = req.body;
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const getCartById = await carts.getCartById(cartId);

      const verifyExistence = getCartById.products.find(
        (e) => e.product == productId
      );

      if (verifyExistence) {
        const updateCartProducts = await carts.updateCartProductsId(
          cartId,
          productId,
          true,
          quantity
        );
        res.status(200).json({ mesagge: "cart products updated" });
      } else {
        const updateCartProducts = await carts.updateCartProductsId(
          cartId,
          productId,
          false,
          quantity
        );
        res.status(200).json({ mesagge: "cart products updated" });
      }
    });
    this.put("/:cid", async (req, res) => {
      const { products } = req.body;
      const cartId = req.params.cid;
      const getCartById = await carts.updateCartId(cartId, products);
      res.status(200).json(getCartById);
    });
  }
}

//Ejemplo de body
// {
//     "products": [
//         {
//         "product": "63ed6ef62c4930c20f2e046e",
//         "quantity": 1
//     },
//     {
//         "product": "63ed6f052c4930c20f2e0472",
//         "quantity": 1
//     },
//     {
//         "product": "63ed6f672c4930c20f2e0490",
//         "quantity": 1
//     }
//     ]
// }

module.exports = CartRouter;
