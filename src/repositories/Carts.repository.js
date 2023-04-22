const CartsDTO = require("../dto/Carts.dto");

class CartsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getCarts() {
    try {
      return await this.dao.getCarts();
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id) {
    try {
      return this.dao.getCartById(id)
    } catch (error) {
      throw error;
    }
  }

  async addCart(newCart) {
    try {
      const cartCreated = new CartsDTO(newCart);
      return await this.dao.addCart(cartCreated);
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      return await this.dao.getProductById(id);
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      return await this.dao.deleteById(id);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, newUpdatedProduct) {
    try {
      const updatedProduct = new ProductsDTO(newUpdatedProduct);
      return await this.dao.updateProduct(id, updatedProduct);
    } catch (error) {
      throw error;
    }
  }

  async addToDB(productsJson) {
    console.log("repository");
    try {
      return await this.dao.addToDB(productsJson);
    } catch (error) {
      throw error;
    }
  }
  async deleteAll() {
    return await this.dao.deleteAll();
  }
}

module.exports = CartsRepository;
