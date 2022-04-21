"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _generateProducts = _interopRequireDefault(require("../utils/generateProducts"));

var ProductsMock = /*#__PURE__*/function () {
  function ProductsMock() {
    (0, _classCallCheck2["default"])(this, ProductsMock);
    this.elements = [];
  }

  (0, _createClass2["default"])(ProductsMock, [{
    key: "listAll",
    value: function listAll() {
      return (0, _toConsumableArray2["default"])(this.elements);
    }
  }, {
    key: "popular",
    value: function popular() {
      var cant = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
      var populateList = [];

      for (var i = 0; i < cant; i++) {
        var newProduct = (0, _generateProducts["default"])();
        populateList.push(newProduct);
      }

      this.elements = populateList;
      return populateList;
    }
  }]);
  return ProductsMock;
}();

var _default = ProductsMock;
exports["default"] = _default;