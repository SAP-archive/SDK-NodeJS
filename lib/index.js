'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = exports.request = undefined;

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _apis = require('./apis');

var _apis2 = _interopRequireDefault(_apis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _client2.default;
var request = exports.request = _apis2.default.request;
var connect = exports.connect = _apis2.default.connect;