'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Entity = function Entity(name, data) {
  var _this = this;

  (0, _classCallCheck3.default)(this, Entity);

  this.name = name;
  this.raw = data;
  (0, _lodash.forEach)(data, function (value, key) {
    return _this[key] = value;
  });
};

exports.default = Entity;