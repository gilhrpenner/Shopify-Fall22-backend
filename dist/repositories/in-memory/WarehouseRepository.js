"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoryWarehouses = exports.WarehouseRepository = void 0;

var _uuid = require("uuid");

var _AppError = require("../../shared/errors/AppError");

const memoryWarehouses = [];
exports.memoryWarehouses = memoryWarehouses;

class WarehouseRepository {
  create(warehouse) {
    const newWarehouse = {
      id: (0, _uuid.v4)(),
      ...warehouse
    };
    memoryWarehouses.push(newWarehouse);
    return Promise.resolve(newWarehouse);
  }

  update(id, warehouseData) {
    const warehouseIndex = memoryWarehouses.findIndex(warehouse => warehouse.id === id);

    if (warehouseIndex === -1) {
      return Promise.reject(new _AppError.AppError('Warehouse not found'));
    }

    memoryWarehouses[warehouseIndex] = { ...memoryWarehouses[warehouseIndex],
      ...warehouseData
    };
    return Promise.resolve(memoryWarehouses[warehouseIndex]);
  }

  delete(id) {
    const warehouseIndex = memoryWarehouses.findIndex(warehouse => warehouse.id === id);

    if (warehouseIndex === -1) {
      return Promise.reject(new _AppError.AppError('Warehouse not found'));
    }

    memoryWarehouses.splice(warehouseIndex, 1);
    return Promise.resolve();
  }

  findById(id) {
    const warehouse = memoryWarehouses.find(warehouse => warehouse.id === id);
    return Promise.resolve(warehouse);
  }

  findAll() {
    return Promise.resolve(memoryWarehouses);
  }

  findByName(name) {
    const names = name.toLowerCase().split(' ');
    const warehouses = memoryWarehouses.filter(warehouse => names.every(name => warehouse.name.toLowerCase().includes(name)));
    return Promise.resolve(warehouses);
  }

  findByPostalCode(postalCode) {
    const postalCodeCleaned = postalCode.replace(/\s/g, '').toLocaleLowerCase();
    const warehouses = memoryWarehouses.filter(warehouse => warehouse.address.postalCode.replace(/\s/g, '').toLocaleLowerCase() === postalCodeCleaned);
    return Promise.resolve(warehouses);
  }

}

exports.WarehouseRepository = WarehouseRepository;