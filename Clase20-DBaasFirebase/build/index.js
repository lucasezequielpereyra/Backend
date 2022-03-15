"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = process.env.PORT || 8080;

_app["default"].listen(PORT);

console.log("Server listen on port ".concat(PORT));