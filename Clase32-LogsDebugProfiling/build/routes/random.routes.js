"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _child_process = require("child_process");

var router = (0, _express.Router)();
router.get('/', function (req, res) {
  logger.info.info('GET: se ha accedido a ' + req.url);
  var quantity = Number(req.query.cant) || 100000000;

  if (req.query.cant < 0 || req.query.cant > 1000) {
    res.status(400).json({
      msg: 'El numero ingresado tiene que ser del 1 al 1000'
    });
    return;
  }

  var cantidad = (0, _child_process.fork)('./src/child.js');
  cantidad.send({
    cantidad: quantity
  });
  cantidad.on('message', function (contador) {
    res.json(contador);
  });
});
var _default = router;
exports["default"] = _default;