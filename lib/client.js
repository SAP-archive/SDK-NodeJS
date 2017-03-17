'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apis = require('./apis');

var _apis2 = _interopRequireDefault(_apis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function Client(token, language) {
  _classCallCheck(this, Client);

  for (var name in _apis2.default) {
    this[name] = new _apis2.default[name](token, language);
  }
};

Client.connect = _apis2.default.connect;
Client.request = _apis2.default.request;
exports.default = Client;