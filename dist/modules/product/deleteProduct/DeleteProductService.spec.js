"use strict";

require("reflect-metadata");

var _ProductRepository = require("../../../repositories/in-memory/ProductRepository");

var _AppError = require("../../../shared/errors/AppError");

var _common = require("../../../shared/utils/common.jest");

var _DeleteProductService = require("./DeleteProductService");

describe('Test product delete service', () => {
  let productRepository;
  let deleteProductService;
  beforeAll(async () => {
    productRepository = new _ProductRepository.ProductRepository();
    deleteProductService = new _DeleteProductService.DeleteProductService(productRepository);
  });
  it('should delete all products', async () => {
    await productRepository.create(_common.firstProduct);
    await productRepository.create(_common.secondProduct);
    await productRepository.create(_common.thirdProduct);
    expect(await productRepository.findAll()).toHaveLength(3);
    await deleteProductService.execute({
      barcodes: [_common.secondProduct.barcode, _common.thirdProduct.barcode, _common.firstProduct.barcode]
    });
    expect(await productRepository.findAll()).toHaveLength(0);
  });
  it('should not delete any product, barcodes missing', async () => {
    await expect(deleteProductService.execute({
      barcodes: undefined
    })).rejects.toEqual(new _AppError.AppError('"barcodes" is required', 422));
  });
  it('should not delete any product, barcodes is not an array', async () => {
    await expect(deleteProductService.execute({
      barcodes: 'undefined'
    })).rejects.toEqual(new _AppError.AppError('"barcodes" must be an array', 422));
  });
});