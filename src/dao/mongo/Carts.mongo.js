const Cart = require("./models/cart.model");

class CartMongoDao {
  async getCarts() {
    try {
      const carts = await Cart.find();
      return carts;
    } catch (error) {
      return error;
    }
  }

  async addCart(cart) {
    try {
      const addMongoCart = await Cart.create(cart);
      return "Cart added successfully";
    } catch (error) {
      return error;
    }
  }

  async getCartById(id) {
    try {
      const getMongoCart = await Cart.findOne({ _id: id });
      return getMongoCart;
    } catch (error) {
      return error;
    }
  }

  async postCartProductsId(idCart, idProduct, exist) {
    try {
      const cart = await Cart.findById(idCart);
      if (exist) {
        const productsArrayPosition = cart.products.findIndex(
          (item) => item.product == idProduct
        );
        cart.products[productsArrayPosition].quantity =
          cart.products[productsArrayPosition].quantity + 1;
      } else {
        cart.products.push({ product: idProduct, quantity: 1 });
      }
      const response = Cart.findByIdAndUpdate(idCart, cart);
      //return "cart products updated";
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteCartProductsId(id, arrayProducts) {
    try {
      const ProductByIdMongo = await Cart.findByIdAndUpdate(id, {
        products: arrayProducts,
      });
      return "Cart product deleted";
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      const deleteByIdMongo = await Cart.findByIdAndDelete(id);
      return "deleted cart successfully";
    } catch (error) {
      return error;
    }
  }

  async deleteAll() {
    await Cart.deleteMany();
    return "All carts deleted";
  }

  async updateCartProductsId(idCart, idProduct, exist, quantity) {
    try {
      const cart = await Cart.findById(idCart);
      if (exist) {
        const productsArrayPosition = cart.products.findIndex(
          (item) => item.product == idProduct
        );
        cart.products[productsArrayPosition].quantity = quantity;
      } else {
        cart.products.push({ product: idProduct, quantity: quantity });
      }
      const response = Cart.findByIdAndUpdate(idCart, cart);
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateCartId(idCart, products) {
    try {
      const cart = await Cart.findById(idCart);
      cart.products = products;
      const response = Cart.findByIdAndUpdate(idCart, cart);
      return response;
    } catch (error) {
      return error;
    }
  }
}

module.exports = CartMongoDao;
