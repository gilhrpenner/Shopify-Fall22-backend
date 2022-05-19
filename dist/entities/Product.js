"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Product = void 0;

class Product {
  constructor(product) {
    this.barcode = void 0;
    this.sku = void 0;
    this.name = void 0;
    this.description = void 0;
    this.quantity = void 0;
    this.location = void 0;
    Object.assign(this, product);
  }

  static create(product) {
    return new Product(product);
  }

}

exports.Product = Product;