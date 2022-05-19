"use strict";

require("reflect-metadata");

var _ProductRepository = require("../../../repositories/in-memory/ProductRepository");

var _WarehouseRepository = require("../../../repositories/in-memory/WarehouseRepository");

var _AppError = require("../../../shared/errors/AppError");

var _common = require("../../../shared/utils/common.jest");

var _AssignWarehouseService = require("./AssignWarehouseService");

describe('test assign location to product', () => {
  let productRepository;
  let warehouseRepository;
  let assignWarehouseService;
  beforeAll(async () => {
    productRepository = new _ProductRepository.ProductRepository();
    warehouseRepository = new _WarehouseRepository.WarehouseRepository();
    assignWarehouseService = new _AssignWarehouseService.AssignWarehouseService(productRepository);
    await warehouseRepository.create(_common.firstWarehouse);
    await warehouseRepository.create(_common.secondWarehouse);
    await productRepository.create(_common.firstProduct);
    await productRepository.create(_common.secondProduct);
    await productRepository.create(_common.thirdProduct);
  });
  it('should assign location to product', async () => {
    const warehouseOne = await warehouseRepository.findByName(_common.firstWarehouse.name);
    const product = await assignWarehouseService.execute({
      barcode: _common.firstProduct.barcode,
      location: {
        warehouseId: warehouseOne[0].id,
        aisle: 10,
        bin: 10
      }
    });
    expect(product).toBeInstanceOf(Object);
    expect(product.barcode).toBe(_common.firstProduct.barcode);
    expect(product.name).toBe(_common.firstProduct.name);
    expect(product.quantity).toBe(_common.firstProduct.quantity);
    expect(product.location.warehouseId).toBe(warehouseOne[0].id);
  });
  it('should not assign location to product, product does not exist', async () => {
    const warehouseTwo = await warehouseRepository.findByName(_common.firstWarehouse.name);
    await expect(assignWarehouseService.execute({
      barcode: '123456789',
      location: {
        warehouseId: warehouseTwo[0].id,
        aisle: 10,
        bin: 10
      }
    })).rejects.toEqual(new _AppError.AppError('Product does not exist'));
  });
  it('should not assign a location to a product, barcode undefined', async () => {
    await expect(assignWarehouseService.execute({
      barcode: undefined,
      location: {
        warehouseId: '123456789',
        aisle: 10,
        bin: 10
      }
    })).rejects.toEqual(new _AppError.AppError('"barcode" is required', 422));
  });
});