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

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _mongodb = _interopRequireDefault(require("../Class/mongodb.container"));

var _faker = require("@faker-js/faker");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var AuthorsDao = /*#__PURE__*/function (_MongoContainer) {
  (0, _inherits2["default"])(AuthorsDao, _MongoContainer);

  var _super = _createSuper(AuthorsDao);

  function AuthorsDao() {
    (0, _classCallCheck2["default"])(this, AuthorsDao);
    return _super.call(this, 'authors', {
      name: {
        type: String
      },
      lastname: {
        type: String
      },
      age: {
        type: Number
      },
      alias: {
        type: String
      },
      avatar: {
        type: String
      }
    }, {
      versionKey: false
    });
  }

  (0, _createClass2["default"])(AuthorsDao, [{
    key: "createAuthorDao",
    value: function () {
      var _createAuthorDao = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(name, lastName, age, alias) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.collection.create({
                  name: name,
                  lastName: lastName,
                  age: age,
                  alias: alias,
                  avatar: _faker.faker.image.avatar()
                });

              case 3:
                return _context.abrupt("return", _context.sent);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                console.error(_context.t0);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      function createAuthorDao(_x, _x2, _x3, _x4) {
        return _createAuthorDao.apply(this, arguments);
      }

      return createAuthorDao;
    }()
  }]);
  return AuthorsDao;
}(_mongodb["default"]);

var _default = AuthorsDao;
exports["default"] = _default;