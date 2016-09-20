'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecastError = exports.Entity = exports.Response = exports.Client = undefined;

var _client = require('./class/client');

var _client2 = _interopRequireDefault(_client);

var _response = require('./class/response');

var _response2 = _interopRequireDefault(_response);

var _entity = require('./class/entity');

var _entity2 = _interopRequireDefault(_entity);

var _error = require('./class/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Client = _client2.default;
exports.Response = _response2.default;
exports.Entity = _entity2.default;
exports.RecastError = _error2.default;


var client = new _client2.default('67fceb7d95016f06c1e4e861dca3fbed');

client.textRequest('test').then(function (err, res) {
  console.log('YOLO');
});

while (true) {}