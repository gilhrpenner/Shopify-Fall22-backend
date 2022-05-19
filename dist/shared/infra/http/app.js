"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.httpServer = exports.app = void 0;

require("express-async-errors");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _hpp = _interopRequireDefault(require("hpp"));

var _http = require("http");

var _AppError = require("../../errors/AppError");

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
exports.app = app;
const httpServer = (0, _http.createServer)(app);
exports.httpServer = httpServer;
app.set('view engine', 'ejs');
app.use(_express.default.static('public'));
app.use((0, _hpp.default)());
app.use(_express.default.json({
  limit: '10mb'
}));
app.use((0, _cors.default)());
app.use(_routes.router);
app.use((req, res) => {
  return res.status(404).json({
    error: 'Not Found',
    reasons: [{
      reason: 'invalid_path',
      message: 'The requested path could not be found',
      data: req.path,
      location: 'path'
    }]
  });
});
app.use((err, req, res, next) => {
  if (err instanceof _AppError.AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  } // I'd normally use a logger here or something better than just a simple log


  console.error(err.message);
  return res.status(500).json({
    status: 'error',
    message: `Internal server error!`
  });
});