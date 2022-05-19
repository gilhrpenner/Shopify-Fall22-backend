"use strict";

require("reflect-metadata");

var _WarehouseRepository = require("../../../repositories/in-memory/WarehouseRepository");

var _AppError = require("../../../shared/errors/AppError");

var _common = require("../../../shared/utils/common.jest");

var _UpdateWarehouseService = require("./UpdateWarehouseService");

describe('Test warehouse update', () => {
  let warehouseRepository;
  let updateWarehouseService;
  beforeAll(() => {
    warehouseRepository = new _WarehouseRepository.WarehouseRepository();
    updateWarehouseService = new _UpdateWarehouseService.UpdateWarehouseService(warehouseRepository);
    warehouseRepository.create(_common.firstWarehouse);
  });
  it('should not update a warehouse, missing name', async () => {
    const warehouse = await warehouseRepository.findByName(_common.firstWarehouse.name);
    expect(warehouse).toBeDefined();
    expect(warehouse).toHaveLength(1);
    const mockData = { ..._common.firstWarehouse
    };
    delete mockData.name;
    await expect(updateWarehouseService.execute(warehouse[0].id, mockData)).rejects.toEqual(new _AppError.AppError('"name" is required', 422));
  });
  it('should not update a warehouse, id does not exist', async () => {
    await expect(updateWarehouseService.execute('invalid-id', _common.firstWarehouse)).rejects.toEqual(new _AppError.AppError('Warehouse not found', 404));
  });
  it('should update a warehouse', async () => {
    const warehouse = await warehouseRepository.findByName(_common.firstWarehouse.name);
    expect(warehouse).toBeDefined();
    expect(warehouse).toHaveLength(1);
    const warehouseUpdated = await updateWarehouseService.execute(warehouse[0].id, {
      name: 'name updated',
      address: {
        street: 'street updated',
        city: 'city updated',
        province: 'province updated',
        postalCode: 'postalCode updated'
      },
      aisles: {
        rows: 99,
        binsPerRow: 88
      }
    });
    expect(warehouseUpdated).toBeInstanceOf(Object);
    expect(warehouseUpdated).toHaveProperty('id');
    expect(warehouseUpdated.name).toBe('name updated');
    expect(warehouseUpdated.address.street).toBe('street updated');
    expect(warehouseUpdated.address.city).toBe('city updated');
    expect(warehouseUpdated.address.province).toBe('province updated');
    expect(warehouseUpdated.address.postalCode).toBe('postalCode updated');
    expect(warehouseUpdated.aisles.rows).toBe(99);
    expect(warehouseUpdated.aisles.binsPerRow).toBe(88);
  });
});