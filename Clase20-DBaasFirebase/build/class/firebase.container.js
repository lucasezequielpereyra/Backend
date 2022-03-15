"use strict";

var _firebaseAdmin = require("firebase-admin");

var _config = require("../config");

var serviceAccount = require(_config.configFirebase);

_firebaseAdmin.admin.initializeApp({
  credential: _firebaseAdmin.admin.credential.cert(serviceAccount)
});