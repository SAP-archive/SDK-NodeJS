'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _apis = require('./apis');

var _apis2 = _interopRequireDefault(_apis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Client = function Client(token, language, version, userSlug, botSlug) {
  (0, _classCallCheck3.default)(this, Client);

  this.connect = new _apis2.default.connect(token, language);
  this.request = new _apis2.default.request(token, language);
  this.build = new _apis2.default.build(token, language);

  if (version && userSlug && botSlug) {
    this.train = new _apis2.default.train(token, language, version, userSlug, botSlug);
  }
};

Client.connect = _apis2.default.connect;
Client.request = _apis2.default.request;
Client.train = _apis2.default.train;
Client.build = _apis2.default.build;
exports.default = Client;