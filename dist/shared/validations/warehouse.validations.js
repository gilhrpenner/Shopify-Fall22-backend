"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upsertWarehouseValidation = exports.deleteWarehouseValidation = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _shared = require("./shared.patterns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upsertWarehouseValidation = payload => {
  const schema = _joi.default.object({
    name: _joi.default.string().required(),
    address: _joi.default.object({
      street: _joi.default.string().required(),
      city: _joi.default.string().required(),
      province: _joi.default.string().required(),
      postalCode: _joi.default.string().required()
    }).required(),
    aisles: _joi.default.object({
      rows: _joi.default.number().min(1).required(),
      binsPerRow: _joi.default.number().min(1).required()
    }).required()
  });

  return schema.validate(payload);
};

exports.upsertWarehouseValidation = upsertWarehouseValidation;

const deleteWarehouseValidation = id => {
  return _shared.uuidv4Pattern.validate(id);
};

exports.deleteWarehouseValidation = deleteWarehouseValidation;