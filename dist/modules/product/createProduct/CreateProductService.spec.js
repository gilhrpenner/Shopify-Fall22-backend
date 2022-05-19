"use strict";

require("reflect-metadata");

var _ProductRepository = require("../../../repositories/in-memory/ProductRepository");

var _AppError = require("../../../shared/errors/AppError");

var _common = require("../../../shared/utils/common.jest");

var _CreateProductService = require("./CreateProductService");

describe('Test product creation', () => {
  let productRepository;
  let createProductService;
  beforeAll(async () => {
    productRepository = new _ProductRepository.ProductRepository();
    createProductService = new _CreateProductService.CreateProductService(productRepository);
  });
  it('should create a product', async () => {
    const product = await createProductService.execute(_common.firstProduct);
    expect(product).toBeInstanceOf(Object);
    expect(product.barcode).toBe(_common.firstProduct.barcode);
    expect(product.name).toBe(_common.firstProduct.name);
    expect(product.quantity).toBe(_common.firstProduct.quantity);
    expect(product.location).toBeUndefined();
    const products = await productRepository.findAll();
    expect(products).toBeInstanceOf(Array);
    expect(products).toHaveLength(1);
  });
  it('should not create a product, product already exists', async () => {
    await createProductService.execute(_common.secondProduct);
    await expect(createProductService.execute(_common.secondProduct)).rejects.toEqual(new _AppError.AppError('Product already exists'));
  });
  it('should not create a product, missing barcode', async () => {
    await expect(createProductService.execute({ ..._common.secondProduct,
      barcode: undefined
    })).rejects.toEqual(new _AppError.AppError('"barcode" is required', 422));
  });
});