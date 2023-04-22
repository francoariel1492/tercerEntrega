const Product = require("./models/products.model");

class ProductsMongoDao {
  constructor() {}

  async getProducts(filter, condicionesQuery) {
    try {
      console.log("mongo");
      // const products = await Product.paginate(filter, condicionesQuery);
      const products = await Product.find(filter, condicionesQuery);
      return products;
    } catch (error) {
      return error;
    }
  }

  async addProduct(product) {
    try {
      const condition = await Product.findOne({ code: product.code });
      if (condition) {
        return "Product already in stock";
      } else {
        const addMongoProduct = await Product.create(product);
        return "Product added successfully";
      }
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      const getProductByIdMongo = await Product.findById(id);
      return getProductByIdMongo;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const deleteByIdMongo = await Product.findByIdAndDelete(id);
      return "deleted product successfully";
    } catch (error) {
      return error;
    }
  }
//   async updateProduct(id, product) {
//     try {
//       const getProductByIdMongo = await Product.findByIdAndUpdate(id, product);
//       return "Updated product successfully";
//     } catch (error) {
//       throw error;
//     }
//   }
async updateProduct(id, product) {
    try {
      const existingProduct = await Product.findById(id);
      if (!existingProduct) {
        throw new Error('Product not found');
      }
      const updatedProduct = await Product.findByIdAndUpdate(id, product);
      return "Updated product successfully";
    } catch (error) {
      throw error;
    }
  }

  async addToDB(productsJson) {
    try {
      console.log("mongon");
      const newProducts = await Product.insertMany(productsJson);
      return newProducts;
    } catch (error) {
      return error;
    }
  }
  async deleteAll(){
    return await Product.deleteMany()
  }
}

module.exports = ProductsMongoDao;
