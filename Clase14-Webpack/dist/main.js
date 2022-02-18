/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./Helpers/getData.js":
/*!****************************!*\
  !*** ./Helpers/getData.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const fs = __webpack_require__(/*! fs */ \"fs\");\r\n\r\nconst getData = async (file) => {\r\n  try {\r\n    const res = await fs.promises.readFile(file);\r\n    const data = await JSON.parse(res, null, 2);\r\n\r\n    return data;\r\n  } catch (err) {\r\n    console.log(\"Read Error\", err);\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://clase14-webpack/./Helpers/getData.js?");

/***/ }),

/***/ "./Helpers/isIn.js":
/*!*************************!*\
  !*** ./Helpers/isIn.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const fs = __webpack_require__(/*! fs */ \"fs\")\r\n\r\nconst isIn = (id, array) => {\r\n  return array.some((item) => item.id == id)\r\n}\r\n\r\nmodule.exports = isIn\r\n\n\n//# sourceURL=webpack://clase14-webpack/./Helpers/isIn.js?");

/***/ }),

/***/ "./Helpers/writeData.js":
/*!******************************!*\
  !*** ./Helpers/writeData.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const fs = __webpack_require__(/*! fs */ \"fs\")\r\n\r\nconst writeData = async (file, content) => {\r\n  try {\r\n    await fs.promises.writeFile(file, content)\r\n  } catch (err) {\r\n    console.log('Write Error', err)\r\n  }\r\n}\r\n\r\nmodule.exports = writeData\r\n\n\n//# sourceURL=webpack://clase14-webpack/./Helpers/writeData.js?");

/***/ }),

/***/ "./class/Container.ts":
/*!****************************!*\
  !*** ./class/Container.ts ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\n// Helpers\r\nconst getData_1 = __importDefault(__webpack_require__(/*! ../Helpers/getData */ \"./Helpers/getData.js\"));\r\nconst isIn_1 = __importDefault(__webpack_require__(/*! ../Helpers/isIn */ \"./Helpers/isIn.js\"));\r\nconst writeData_1 = __importDefault(__webpack_require__(/*! ../Helpers/writeData */ \"./Helpers/writeData.js\"));\r\nlet now = new Date();\r\nclass Container {\r\n    constructor(file) {\r\n        this.file = file;\r\n    }\r\n    save(product) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const data = yield (0, getData_1.default)(this.file);\r\n            if (!data) {\r\n                const arrayItems = [\r\n                    Object.assign(Object.assign({}, product), { id: 1, img: 'https://img.favpng.com/5/19/25/shopping-cart-icon-product-return-png-favpng-1ZJU3szBCWCr5YYXDXtgqG4ja.jpg' }),\r\n                ];\r\n                yield (0, writeData_1.default)(this.file, JSON.stringify(arrayItems, null, 2));\r\n                return `El producto ${product.name}, fue agregado con exito y su id es 1`;\r\n            }\r\n            const id = data[data.length - 1].id + 1;\r\n            const arrayItems = [\r\n                ...data,\r\n                Object.assign(Object.assign({}, product), { id: id, img: 'https://img.favpng.com/5/19/25/shopping-cart-icon-product-return-png-favpng-1ZJU3szBCWCr5YYXDXtgqG4ja.jpg' }),\r\n            ];\r\n            yield (0, writeData_1.default)(this.file, JSON.stringify(arrayItems, null, 2));\r\n            return `El producto ${product.name}, fue agregado con exito y su id es ${id} `;\r\n        });\r\n    }\r\n    saveMsg(msg) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const data = yield (0, getData_1.default)(this.file);\r\n            if (!data) {\r\n                const arrayItems = [\r\n                    Object.assign(Object.assign({}, msg), { time: now.toLocaleString(), id: 1 }),\r\n                ];\r\n                yield (0, writeData_1.default)(this.file, JSON.stringify(arrayItems, null, 2));\r\n                return `El mensaje fue guardado con exito `;\r\n            }\r\n            const id = data[data.length - 1].id + 1;\r\n            const arrayItems = [\r\n                ...data,\r\n                Object.assign(Object.assign({}, msg), { time: now.toLocaleString(), id: id }),\r\n            ];\r\n            yield (0, writeData_1.default)(this.file, JSON.stringify(arrayItems, null, 2));\r\n            return `El mensaje fue guardado con exito `;\r\n        });\r\n    }\r\n    getAll() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const data = yield (0, getData_1.default)(this.file);\r\n            return data;\r\n        });\r\n    }\r\n    getById(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const data = yield this.getAll();\r\n            if ((0, isIn_1.default)(id, data)) {\r\n                const productFound = data.find((prd) => prd.id == id);\r\n                return productFound;\r\n            }\r\n            return 'Producto no encontrado';\r\n        });\r\n    }\r\n    getRandomItem() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const data = yield this.getAll();\r\n            const random = Math.round(Math.random() * (data.length - 1));\r\n            return data[random];\r\n        });\r\n    }\r\n    deleteById(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const data = yield this.getAll();\r\n            if ((0, isIn_1.default)(id, data)) {\r\n                const productsFiltered = data.filter((prd) => prd.id != id);\r\n                yield (0, writeData_1.default)(this.file, JSON.stringify(productsFiltered, null, 2));\r\n                return `El elemento ${id} fue eliminado correctamente`;\r\n            }\r\n            return `El elemento ${id} no fue encontrado en el archivo`;\r\n        });\r\n    }\r\n    deleteAll() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield (0, writeData_1.default)(this.file, '');\r\n        });\r\n    }\r\n    editById(id, newProps) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const data = yield this.getAll();\r\n            if ((0, isIn_1.default)(id, data)) {\r\n                const index = data.findIndex((prd) => prd.id == id);\r\n                data[index] = Object.assign(Object.assign({}, newProps), { id: data[index].id });\r\n                yield (0, writeData_1.default)(this.file, JSON.stringify(data, null, 2));\r\n                return `El producto ${id} se actualizo correctamente`;\r\n            }\r\n            return `El producto ${id} no fue encontrado`;\r\n        });\r\n    }\r\n}\r\nexports[\"default\"] = Container;\r\nmodule.exports = Container;\r\n\n\n//# sourceURL=webpack://clase14-webpack/./class/Container.ts?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./class/Container.ts");
/******/ 	var __webpack_exports__ = __webpack_require__("./Helpers/getData.js");
/******/ 	
/******/ })()
;