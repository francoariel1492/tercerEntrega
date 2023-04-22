class CartsDTO {
  constructor(cart) {
    this.id = cart._id;
    this.products = cart.items.map((item) => ({
      id: item.product._id,
      product_id: item.product._id,
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
    }));
  }
}

module.exports = CartsDTO;



