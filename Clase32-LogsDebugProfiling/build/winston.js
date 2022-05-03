"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = require("winston");

var format = _winston.format.combine(_winston.format.colorize(), _winston.format.timestamp(), _winston.format.align(), _winston.format.printf(function (info) {
  return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.message);
}));

var logger = {
  error: (0, _winston.createLogger)({
    level: 'error',
    format: format,
    transports: [new _winston.transports.File({
      filename: './src/log/error.log'
    }), new _winston.transports.Console({
      level: 'error'
    })]
  }),
  warn: (0, _winston.createLogger)({
    level: 'warn',
    format: format,
    transports: [new _winston.transports.File({
      filename: './src/log/warn.log'
    }), new _winston.transports.Console({
      level: 'warn'
    })]
  }),
  info: (0, _winston.createLogger)({
    level: 'info',
    format: format,
    transports: [new _winston.transports.Console({
      level: 'info'
    })]
  })
};
var _default = logger;
exports["default"] = _default;