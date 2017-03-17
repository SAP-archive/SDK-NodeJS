'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _apis = require('./apis');

var _apis2 = _interopRequireDefault(_apis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Client = function Client(token, language) {
  (0, _classCallCheck3.default)(this, Client);

  for (var name in _apis2.default) {
    this[name] = new _apis2.default[name](token, language);
  }
};

Client.connect = _apis2.default.connect;
Client.request = _apis2.default.request;
exports.default = Client;