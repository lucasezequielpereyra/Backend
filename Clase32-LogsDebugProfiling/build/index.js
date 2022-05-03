"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _path = _interopRequireDefault(require("path"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _passport = _interopRequireDefault(require("passport"));

var _cluster = _interopRequireDefault(require("cluster"));

var _os = require("os");

var _passportFacebook = require("passport-facebook");

var _compression = _interopRequireDefault(require("compression"));

var _winston = _interopRequireDefault(require("./winston"));

var _products = _interopRequireDefault(require("./mocks/products.mocks"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _info = _interopRequireDefault(require("./routes/info.routes"));

var _random = _interopRequireDefault(require("./routes/random.routes"));

var _http = _interopRequireDefault(require("http"));

var _socket = require("./socket");

// Routes
// Paths
var rouetView = _path["default"].join(__dirname, '../views');

var routeLayout = _path["default"].join(__dirname, '../views/layouts');

var routePublic = _path["default"].join(__dirname, '../public'); // Container Instance


var productsMock = new _products["default"](); // Server

var app = (0, _express["default"])();

var server = _http["default"].createServer(app);

var port = process.argv[2] || 4000;
var modoCluster = process.argv[3] == 'CLUSTER';
// MdW
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

var FacebookStrategy = _passportFacebook.Strategy;
var FACEBOOK_APP_ID = '1021784038762015';
var FACEBOOK_APP_SECRET = '22696df231280b712d70c624646fdfb6';

_passport["default"].use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:".concat(port, "/auth/facebook/callback"),
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

(0, _socket.socket)(io);

if (modoCluster && _cluster["default"].isPrimary) {
  var numCPUs = (0, _os.cpus)().length;
  console.log("N\xFAmero de procesadores: ".concat(numCPUs));
  console.log("PID MASTER ".concat(process.pid));

  for (var i = 0; i < numCPUs; i++) {
    _cluster["default"].fork();
  }

  _cluster["default"].on('exit', function (worker) {
    console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString());

    _cluster["default"].fork();
  });
} else {
  // Routes
  app.get('/', function (req, res) {
    _winston["default"].info.info('GET: se ha accedido a ' + req.url);

    res.render('index', {});
  });
  app.use('/auth', _auth["default"]);
  app.use('/info', (0, _compression["default"])(), _info["default"]);
  app.use('/random', _random["default"]);
  app.get('/api/products-test', function (req, res) {
    _winston["default"].info.info('GET: se ha accedido a ' + req.url);

    productsMock.popular();
    var prds = productsMock.listAll();
    res.render('products', {
      products: prds
    });
  });
  app.get('*', function (req, res) {
    _winston["default"].warn.warn('ERROR: se ha accedido a ' + req.url);
  });
  app.listen(port, function (err) {
    if (!err) _winston["default"].info.info("Servidor express escuchando en el puerto ".concat(port, " - PID WORKER ").concat(process.pid));
  });
}