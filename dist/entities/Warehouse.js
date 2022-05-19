"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Warehouse = void 0;

class Warehouse {
  constructor(warehouse) {
    this.id = void 0;
    this.name = void 0;
    this.address = void 0;
    this.aisles = void 0;
    Object.assign(this, warehouse);
  }

  static create(warehouse) {
    return new Warehouse(warehouse);
  }

}

exports.Warehouse = Warehouse;