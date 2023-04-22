const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  items: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product'
        },
        quantity: Number
      }
    ],
    default: [{}]
  }
});

cartSchema.pre('find', function () {
  this.populate('items.product', 'title price');
});

cartSchema.pre('findOne', function () {
  this.populate('items.product', 'title price');
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
