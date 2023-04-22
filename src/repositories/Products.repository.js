const ProductsDTO = require("../dto/Product.dto");

class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getProducts(filter, condicionesQuery) {
    try {
      console.log("get repository");
      return await this.dao.getProducts(filter, condicionesQuery);
    } catch (error) {
      throw error;
    }
  }

  async addProduct(product) {
    try {
      const newProduct = new ProductsDTO(product);
      return await this.dao.addProduct(newProduct);
    } catch (error) {
      throw error;
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

module.exports = ProductsRepository;
