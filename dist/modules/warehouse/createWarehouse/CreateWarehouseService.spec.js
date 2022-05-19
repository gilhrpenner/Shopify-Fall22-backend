"use strict";

var _WarehouseRepository = require("../../../repositories/in-memory/WarehouseRepository");

var _AppError = require("../../../shared/errors/AppError");

var _common = require("../../../shared/utils/common.jest");

require("reflect-metadata");

var _CreateWarehouseService = require("./CreateWarehouseService");

describe('Test warehouse creation', () => {
  let warehouseRepository;
  let createWarehouseService;
  beforeAll(() => {
    warehouseRepository = new _WarehouseRepository.WarehouseRepository();
    createWarehouseService = new _CreateWarehouseService.CreateWarehouseService(warehouseRepository);
  });
  it('should create a warehouse', async () => {
    const warehouse = await createWarehouseService.execute(_common.firstWarehouse);
    expect(warehouse).toBeInstanceOf(Object);
    expect(warehouse).toHaveProperty('id');
    expect(warehouse.name).toBe(_common.firstWarehouse.name);
    expect(warehouse.address.street).toBe(_common.firstWarehouse.address.street);
  });
  it('should not create a warehouse, missing name', async () => {
    const mockData = { ..._common.firstWarehouse
    };
    delete mockData.name;
    await expect(createWarehouseService.execute(mockData)).rejects.toEqual(new _AppError.AppError('"name" is required', 422));
  });
  it('should not create a warehouse, missing address', async () => {
    const mockData = { ..._common.firstWarehouse
    };
    delete mockData.address;
    await expect(createWarehouseService.execute(mockData)).rejects.toEqual(new _AppError.AppError('"address" is required', 422));
  });
  it('should not create a warehouse, missing aisles', async () => {
    const mockData = { ..._common.firstWarehouse
    };
    delete mockData.aisles;
    await expect(createWarehouseService.execute(mockData)).rejects.toEqual(new _AppError.AppError('"aisles" is required', 422));
  });
});