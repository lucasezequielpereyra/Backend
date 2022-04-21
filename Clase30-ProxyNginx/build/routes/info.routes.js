"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _os = _interopRequireDefault(require("os"));

var router = (0, _express.Router)();
router.get('/', function (req, res) {
  res.send("SO: ".concat(process.platform, " \n NODE: ").concat(process.version, " \n RESERVED MEMORY: ").concat(process.memoryUsage().rss, " \n EXECUTION PATH").concat(process.execPath, " \n PID: ").concat(process.pid, " \n PROJECT DIRECTORY: ").concat(process.cwd(), " \n ENTRY ARGUMENTS: ").concat(process.argv, " \n  CPUS: ").concat(_os["default"].cpus().length, " "));
});
var _default = router;
exports["default"] = _default;