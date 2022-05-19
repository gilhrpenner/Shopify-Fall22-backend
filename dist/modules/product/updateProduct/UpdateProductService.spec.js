"use strict";

require("reflect-metadata");

var _ProductRepository = require("../../../repositories/in-memory/ProductRepository");

var _AppError = require("../../../shared/errors/AppError");

var _common = require("../../../shared/utils/common.jest");

var _UpdateProductService = require("./UpdateProductService");

describe('Test product update', () => {
  let productRepository;
  let updateProductService;
  beforeAll(async () => {
    productRepository = new _ProductRepository.ProductRepository();
    updateProductService = new _UpdateProductService.UpdateProductService(productRepository);
    await productRepository.create(_common.firstProduct);
  });
  it('should update a product', async () => {
    const product = await updateProductService.execute({ ..._common.firstProduct,
      name: 'New name',
      description: 'New description'
    });
    expect(product).toBeInstanceOf(Object);
    expect(product.barcode).toBe(_common.firstProduct.barcode);
    expect(product.name).toBe('New name');
    expect(product.description).toBe('New description');
    expect(product.quantity).toBe(_common.firstProduct.quantity);
    expect(product.location).toBeUndefined();
    const products = await productRepository.findAll();
    expect(products).toBeInstanceOf(Array);
    expect(products).toHaveLength(1);
  });
  it('should not update a product, product does not exist', async () => {
    await expect(updateProductService.execute({ ..._common.firstProduct,
      barcode: 'invalid'
    })).rejects.toEqual(new _AppError.AppError('Product does not exist'));
  });
  it('should not update a product, missing barcode', async () => {
    await expect(updateProductService.execute({ ..._common.firstProduct,
      barcode: undefined
    })).rejects.toEqual(new _AppError.AppError('"barcode" is required', 422));
  });
});