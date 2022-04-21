"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var dbUrl = 'mongodb+srv://lucasezequiel:riverplate123@cluster0.qzap6.mongodb.net/clase26?retryWrites=true&w=majority';

_mongoose["default"].connect(dbUrl).then(function () {
  return console.log('mongo db is connected');
})["catch"](function (error) {
  return console.log(error);
});

var MongoContainer = /*#__PURE__*/function () {
  function MongoContainer(collectionName, schema) {
    (0, _classCallCheck2["default"])(this, MongoContainer);
    this.collection = _mongoose["default"].model(collectionName, schema);
  }

  (0, _createClass2["default"])(MongoContainer, [{
    key: "listAll",
    value: function () {
      var _listAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.collection.find({});

              case 3:
                return _context.abrupt("return", _context.sent);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", _context.t0);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      function listAll() {
        return _listAll.apply(this, arguments);
      }

      return listAll;
    }()
  }, {
    key: "deleteById",
    value: function () {
      var _deleteById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.collection.deleteOne({
                  _id: id
                });

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", _context2.t0);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 6]]);
      }));

      function deleteById(_x) {
        return _deleteById.apply(this, arguments);
      }

      return deleteById;
    }()
  }]);
  return MongoContainer;
}();

var _default = MongoContainer;
exports["default"] = _default;