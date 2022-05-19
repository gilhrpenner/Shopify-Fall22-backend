"use strict";

var _ProductRepository = require("../../../repositories/in-memory/ProductRepository");

var _AppError = require("../../../shared/errors/AppError");

var _common = require("../../../shared/utils/common.jest");

require("reflect-metadata");

var _UpdateProductQuantityService = require("./UpdateProductQuantityService");

describe('Test product quantity update', () => {
  let productRepository;
  let updateProductQuantityService;
  beforeAll(async () => {
    productRepository = new _ProductRepository.ProductRepository();
    updateProductQuantityService = new _UpdateProductQuantityService.UpdateProductQuantityService(productRepository);
    await productRepository.create(_common.firstProduct);
  });
  it('should update a product quantity', async () => {
    const product = await updateProductQuantityService.execute({
      barcode: _common.firstProduct.barcode,
      quantity: 10
    });
    expect(product).toBeInstanceOf(Object);
    expect(product.quantity).toBe(10);
  });
  it('should not update a product quantity, product does not exists', async () => {
    await expect(updateProductQuantityService.execute({
      barcode: '123456789',
      quantity: 10
    })).rejects.toEqual(new _AppError.AppError('Product does not exists'));
  });
  it('should not update a product quantity, missing barcode', async () => {
    await expect(updateProductQuantityService.execute({
      barcode: undefined,
      quantity: 10
    })).rejects.toEqual(new _AppError.AppError('"barcode" is required', 422));
  });
});