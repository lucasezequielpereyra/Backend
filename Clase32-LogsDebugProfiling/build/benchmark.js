"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _autocannon = _interopRequireDefault(require("autocannon"));

var _stream = require("stream");

var run = function run(url) {
  var buf = [];
  var outputStream = new _stream.PassThrough();
  var inst = (0, _autocannon["default"])({
    url: url,
    connections: 100,
    pipelining: 1,
    duration: 20
  });

  _autocannon["default"].track(inst, {
    outputStream: outputStream
  });

  outputStream.on('data', function (data) {
    return buf.push(data);
  });
  inst.on('done', function () {
    process.stdout.write(Buffer.concat(buf));
  });
};

console.log('Running benchmark...');
run('http://localhost:8081/info');