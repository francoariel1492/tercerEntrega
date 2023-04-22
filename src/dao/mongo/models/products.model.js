const mongoose = require("mongoose");

const productsCollection = "product";

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  title: String,
  description: String,
  price: Number,
  thumbnail: Array,
  code: String,
  stock: Number,
  status: {
    type: Boolean,
    default: true
  },
  category: String,
  idd: Number,
});

productSchema.methods.getId = function () {
  return this._id;
};

const Product = mongoose.model(productsCollection, productSchema);

module.exports = Product;


