"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _passport = _interopRequireDefault(require("passport"));

var _winston = _interopRequireDefault(require("../winston"));

var router = (0, _express.Router)();
router.get('/facebook', _passport["default"].authenticate('facebook'));
router.get('/facebook/callback', _passport["default"].authenticate('facebook', {
  failureRedirect: '/logout',
  successRedirect: '/auth/success/',
  authType: 'reauthenticate'
}));
router.get('/success/', function (req, res) {
  if (req.isAuthenticated()) {
    !req.user.visitas ? req.user.visitas = 1 : req.user.visitas++;
    var datosUsuario = {
      nombre: req.user.displayName,
      foto: req.user.photos[0].value
    };
    res.render('index', {
      contador: req.user.visitas,
      data: datosUsuario
    });
  } else {
    res.render('index', {
      error: 'Error de autentificacion'
    });
  }
});
router.get('/logout', function (req, res) {
  var _req$user;

  _winston["default"].info.info("".concat(req.user.displayName, " ha cerrado sesion"));

  var user = (_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user.displayName;
  req.logout();
  res.render('index', {
    dataLogout: user
  });
});
var _default = router;
exports["default"] = _default;