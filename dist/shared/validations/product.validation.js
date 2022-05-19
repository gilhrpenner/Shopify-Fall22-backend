"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upsertProductValidation = exports.updateProductQuantityValidation = exports.deleteProductValidation = exports.assignWarehouseValidation = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upsertProductValidation = payload => {
  const schema = _joi.default.object({
    barcode: _joi.default.string().required(),
    sku: _joi.default.string().required(),
    name: _joi.default.string().required(),
    description: _joi.default.string().required(),
    quantity: _joi.default.number().required()
  });

  return schema.validate(payload);
};

exports.upsertProductValidation = upsertProductValidation;

const updateProductQuantityValidation = payload => {
  const schema = _joi.default.object({
    barcode: _joi.default.string().required(),
    quantity: _joi.default.number().required()
  });

  return schema.validate(payload);
};

exports.updateProductQuantityValidation = updateProductQuantityValidation;

const deleteProductValidation = payload => {
  const schema = _joi.default.object({
    barcodes: _joi.default.array().items(_joi.default.string()).required()
  });

  return schema.validate(payload);
};

exports.deleteProductValidation = deleteProductValidation;

const assignWarehouseValidation = payload => {
  const schema = _joi.default.object({
    barcode: _joi.default.string().required(),
    location: _joi.default.object({
      warehouseId: _joi.default.string().required(),
      aisle: _joi.default.number().required(),
      bin: _joi.default.number().required()
    }).required()
  });

  return schema.validate(payload);
};

exports.assignWarehouseValidation = assignWarehouseValidation;