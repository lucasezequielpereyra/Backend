"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _faker = require("@faker-js/faker");

function generateProducts() {
  return {
    name: _faker.faker.commerce.product(),
    price: _faker.faker.commerce.price(),
    image: _faker.faker.image["abstract"]()
  };
}

var _default = generateProducts;
exports["default"] = _default;