"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uuidv4Pattern = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const uuidv4Pattern = _joi.default.string().guid({
  version: 'uuidv4'
});

exports.uuidv4Pattern = uuidv4Pattern;