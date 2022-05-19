"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoryProducts = exports.ProductRepository = void 0;

var _AppError = require("../../shared/errors/AppError");

const memoryProducts = [];
exports.memoryProducts = memoryProducts;

class ProductRepository {
  findProductIndex(barcode) {
    return memoryProducts.findIndex(product => product.barcode === barcode);
  }

  create(product) {
    const newProduct = { ...product,
      location: undefined
    };
    memoryProducts.push(newProduct);
    return Promise.resolve(newProduct);
  }

  updateQuantity(barcode, quantity) {
    const productIndex = this.findProductIndex(barcode);

    if (productIndex === -1) {
      return Promise.reject(new _AppError.AppError('Product not found'));
    }

    memoryProducts[productIndex] = { ...memoryProducts[productIndex],
      quantity
    };
    return Promise.resolve(memoryProducts[productIndex]);
  }

  update(product) {
    const productIndex = this.findProductIndex(product.barcode);

    if (productIndex === -1) {
      return Promise.reject(new _AppError.AppError('Product not found'));
    }

    memoryProducts[productIndex] = { ...memoryProducts[productIndex],
      ...product
    };
    return Promise.resolve(memoryProducts[productIndex]);
  }

  delete(barcodes) {
    let productsDeleted = 0;
    barcodes.forEach(barcode => {
      const productIndex = this.findProductIndex(barcode);

      if (productIndex !== -1) {
        memoryProducts.splice(productIndex, 1);
        productsDeleted += 1;
      }
    });
    return Promise.resolve({
      productsDeleted
    });
  }

  assignLocation(payload) {
    const {
      barcode,
      location
    } = payload;
    const productIndex = this.findProductIndex(barcode);

    if (productIndex === -1) {
      return Promise.reject(new _AppError.AppError('Product not found'));
    }

    memoryProducts[productIndex] = { ...memoryProducts[productIndex],
      location
    };
    return Promise.resolve(memoryProducts[productIndex]);
  }

  findByBarcode(barcode) {
    const productIndex = this.findProductIndex(barcode);
    return Promise.resolve(memoryProducts[productIndex]);
  }

  findAll() {
    return Promise.resolve(memoryProducts);
  }

  findByName(name) {
    const names = name.toLocaleLowerCase().split(' ');
    const products = memoryProducts.filter(product => {
      return names.every(name => product.name.toLocaleLowerCase().includes(name));
    });
    return Promise.resolve(products);
  }

  findByDescription(description) {
    const descriptions = description.toLocaleLowerCase().split(' ');
    const products = memoryProducts.filter(product => {
      return descriptions.every(description => product.description.toLocaleLowerCase().includes(description));
    });
    return Promise.resolve(products);
  }

  findByWarehouseId(warehouseId) {
    const products = memoryProducts.filter(product => {
      return product.location && product.location.warehouseId === warehouseId;
    });
    return Promise.resolve(products);
  }

  unassignLocation(warehouseId) {
    memoryProducts.forEach((product, index) => {
      if (product.location && product.location.warehouseId === warehouseId) {
        memoryProducts[index].location = undefined;
      }
    });
    return Promise.resolve();
  }

}

exports.ProductRepository = ProductRepository;