"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _path = _interopRequireDefault(require("path"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _passport = _interopRequireDefault(require("passport"));

var _passportFacebook = require("passport-facebook");

var _os = require("os");

var _cluster = _interopRequireDefault(require("cluster"));

var _products = _interopRequireDefault(require("./mocks/products.mocks"));

var _authors = _interopRequireDefault(require("./daos/authors.dao"));

var _messages = _interopRequireDefault(require("./daos/messages.dao"));

var _products2 = _interopRequireDefault(require("./daos/products.dao"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _info = _interopRequireDefault(require("./routes/info.routes"));

var _random = _interopRequireDefault(require("./routes/random.routes"));

var FacebookStrategy = _passportFacebook.Strategy;

// Paths
var rouetView = _path["default"].join(__dirname, '../views');

var routeLayout = _path["default"].join(__dirname, '../views/layouts');

var routePublic = _path["default"].join(__dirname, '../public'); // Container Instance


var authorDao = new _authors["default"]();
var messageDao = new _messages["default"]();
var productsDao = new _products2["default"]();
var productsMock = new _products["default"](); // Server

var app = (0, _express["default"])();

var http = require('http');

var server = http.createServer(app);
var port = process.argv[2] || 4000; // MdW

app.use((0, _morgan["default"])('dev'));
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"]["static"](routePublic)); // Session

app.use((0, _expressSession["default"])({
  store: _connectMongo["default"].create({
    mongoUrl: 'mongodb+srv://lucasezequiel:riverplate123@cluster0.qzap6.mongodb.net/clase24?retryWrites=true&w=majority'
  }),
  secret: 'secret_word',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 600000
  }
})); // HBS

app.set('views', rouetView);
app.set('view engine', 'hbs');
app.engine('hbs', (0, _expressHandlebars["default"])({
  extname: 'hbs',
  layoutsDir: routeLayout,
  defaultLayout: 'main'
})); // Passport Config

var FACEBOOK_APP_ID = '1021784038762015';
var FACEBOOK_APP_SECRET = '22696df231280b712d70c624646fdfb6';

_passport["default"].use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:4000/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email']
}, function (accessToken, refreshToken, profile, cb) {
  console.log('accessToken: ', accessToken);
  console.log('refreshToken: ', refreshToken);
  console.log(profile);
  cb(null, profile);
}));

_passport["default"].serializeUser(function (user, cb) {
  cb(null, user);
});

_passport["default"].deserializeUser(function (obj, cb) {
  cb(null, obj);
}); // Passport


app.use(_passport["default"].initialize());
app.use(_passport["default"].session()); // Socket

var _require = require('socket.io'),
    Server = _require.Server;

var io = new Server(server); // Socket Config

io.on('connection', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(socket) {
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
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
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

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }()); // Add Msg

            socket.on('newMsg', /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
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

              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
var numCPUs = (0, _os.cpus)().length;

if (_cluster["default"].isPrimary) {
  console.log("Primary ".concat(process.pid, " is running")); // Routes

  app.get('/', function (req, res) {
    res.render('index', {});
  });
  app.use('/auth', _auth["default"]);
  app.use('/info', _info["default"]);
  app.get('/api/products-test', function (req, res) {
    productsMock.popular();
    var prds = productsMock.listAll();
    res.render('products', {
      products: prds
    });
  });
  server.listen(port, function () {
    console.log('Server running on ' + port);
  });
} else {
  app.use('/random', _random["default"]);
  server.listen(port, function () {
    console.log('Server running on ' + port);
  });
}