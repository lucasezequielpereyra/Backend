"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _products = _interopRequireDefault(require("./routes/products.route"));

var _cart = _interopRequireDefault(require("./routes/cart.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use('/api/products', _products["default"]);
app.use('/api/cart', _cart["default"]);
var _default = app;
exports["default"] = _default;