"use strict";

require("reflect-metadata");

var _AppError = require("../../shared/errors/AppError");

var _common = require("../../shared/utils/common.jest");

var _WarehouseRepository = require("./WarehouseRepository");

describe('Test warehouse repository in memory', () => {
  let warehouseRepository;
  beforeAll(() => {
    warehouseRepository = new _WarehouseRepository.WarehouseRepository();
  });
  it('should create a warehouse', async () => {
    const warehouse = await warehouseRepository.create(_common.firstWarehouse);
    expect(warehouse).toBeInstanceOf(Object);
    expect(warehouse).toHaveProperty('id');
    expect(warehouse.name).toBe(_common.firstWarehouse.name);
    expect(warehouse.address.street).toBe(_common.firstWarehouse.address.street);
  });
  it('should find a warehouse by id', async () => {
    const warehouse = await warehouseRepository.create(_common.secondWarehouse);
    const warehouseFound = await warehouseRepository.findById(warehouse.id);
    expect(warehouseFound).toEqual(warehouse);
  });
  it('should not find the warehouse by id, id does not exists', async () => {
    const found = await warehouseRepository.findById('id-does-not-exists');
    expect(found).toBeUndefined();
  });
  it('should get all warehouses', async () => {
    const warehouses = await warehouseRepository.findAll();
    expect(warehouses).toBeInstanceOf(Array);
    expect(warehouses).toHaveLength(2);
  });
  it('should find a warehouse by name', async () => {
    const warehouse = await warehouseRepository.create(_common.thirdWarehouse);
    const warehouseFound = await warehouseRepository.findByName(warehouse.name);
    expect(warehouseFound).toBeInstanceOf(Array);
    expect(warehouseFound).toHaveLength(1);
    expect(warehouseFound[0]).toEqual(warehouse);
  });
  it('should find all warehouses that has "Warehouse" in the name', async () => {
    const warehouses = await warehouseRepository.findByName('Warehouse');
    expect(warehouses).toBeInstanceOf(Array);
    expect(warehouses).toHaveLength(3);
  });
  it('should not find any warehouse by name, name does not exists', async () => {
    const warehouses = await warehouseRepository.findByName('Any name');
    expect(warehouses).toBeInstanceOf(Array);
    expect(warehouses).toHaveLength(0);
  });
  it('should find a warehouse by postal code', async () => {
    const warehouseFound = await warehouseRepository.findByPostalCode('R2C5G1');
    expect(warehouseFound).toBeInstanceOf(Array);
    expect(warehouseFound).toHaveLength(1);
  });
  it('should update a warehouse name', async () => {
    const warehouse = await warehouseRepository.findByName(_common.firstWarehouse.name);
    const updatedWarehouse = await warehouseRepository.update(warehouse[0].id, { ..._common.firstWarehouse,
      name: `${_common.firstWarehouse.name} - updated!`
    });
    expect(updatedWarehouse).toBeInstanceOf(Object);
    expect(updatedWarehouse.name).toBe(`${_common.firstWarehouse.name} - updated!`);
  });
  it('should not update a warehouse name, warehouse does not exists', async () => {
    await expect(warehouseRepository.update('id-does-not-exists', { ..._common.firstWarehouse,
      name: `${_common.firstWarehouse.name} - updated!`
    })).rejects.toEqual(new _AppError.AppError('Warehouse not found'));
  });
  it('should delete a warehouse', async () => {
    const warehouse = await warehouseRepository.create(_common.secondWarehouse);
    const warehouses = await warehouseRepository.findAll();
    const countWarehouses = warehouses.length;
    await warehouseRepository.delete(warehouse.id);
    const warehouseFound = await warehouseRepository.findById(warehouse.id);
    expect(warehouseFound).toBeUndefined();
    expect(await warehouseRepository.findAll()).toHaveLength(countWarehouses - 1);
  });
  it('should not delete a warehouse, warehouse does not exists', async () => {
    await expect(warehouseRepository.delete('id-does-not-exists')).rejects.toEqual(new _AppError.AppError('Warehouse not found'));
  });
});