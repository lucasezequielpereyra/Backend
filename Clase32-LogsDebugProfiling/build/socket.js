"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _winston = _interopRequireDefault(require("./winston"));

var _authors = _interopRequireDefault(require("./daos/authors.dao"));

var _messages = _interopRequireDefault(require("./daos/messages.dao"));

var _products = _interopRequireDefault(require("./daos/products.dao"));

var authorDao = new _authors["default"]();
var messageDao = new _messages["default"]();
var productsDao = new _products["default"]();

var socket = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(io) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            try {
              io.on('connection', /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(socket) {
                  var dataProducts, dataMsg;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          console.log('Cliente conectado'); // First List Check

                          _context3.next = 3;
                          return productsDao.listAll();

                        case 3:
                          dataProducts = _context3.sent;
                          socket.emit('firstUpdate', dataProducts);
                          _context3.next = 7;
                          return messageDao.listMessages();

                        case 7:
                          dataMsg = _context3.sent;
                          socket.emit('firstUpdateMsg', dataMsg); // Add Product

                          socket.on('newProduct', /*#__PURE__*/function () {
                            var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
                              var name, price, allPrd;
                              return _regenerator["default"].wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      name = data.name, price = data.price;
                                      _context.next = 3;
                                      return productsDao.createPorudctDao(name, price);

                                    case 3:
                                      _context.next = 5;
                                      return productsDao.listAll();

                                    case 5:
                                      allPrd = _context.sent;
                                      io.sockets.emit('updateOk', allPrd); // Update table products

                                    case 7:
                                    case "end":
                                      return _context.stop();
                                  }
                                }
                              }, _callee);
                            }));

                            return function (_x3) {
                              return _ref3.apply(this, arguments);
                            };
                          }()); // Add Msg

                          socket.on('newMsg', /*#__PURE__*/function () {
                            var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
                              var _data$, name, lastName, age, alias, text, auth, id, dataMsg;

                              return _regenerator["default"].wrap(function _callee2$(_context2) {
                                while (1) {
                                  switch (_context2.prev = _context2.next) {
                                    case 0:
                                      _data$ = data[0], name = _data$.name, lastName = _data$.lastName, age = _data$.age, alias = _data$.alias;
                                      text = data[1].text;
                                      _context2.next = 4;
                                      return authorDao.createAuthorDao(name, lastName, age, alias);

                                    case 4:
                                      auth = _context2.sent;
                                      id = auth._id;
                                      _context2.next = 8;
                                      return messageDao.createMessageDao(id, text);

                                    case 8:
                                      _context2.next = 10;
                                      return messageDao.listMessages();

                                    case 10:
                                      dataMsg = _context2.sent;
                                      io.sockets.emit('updateMsgOk', dataMsg);

                                    case 12:
                                    case "end":
                                      return _context2.stop();
                                  }
                                }
                              }, _callee2);
                            }));

                            return function (_x4) {
                              return _ref4.apply(this, arguments);
                            };
                          }());

                        case 11:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }());
            } catch (err) {
              _winston["default"].error.error(err);
            }

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function socket(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.socket = socket;