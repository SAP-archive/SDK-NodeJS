'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function Entity(name, data) {
  var _this = this;

  _classCallCheck(this, Entity);

  this.name = name;
  this.raw = data;
  (0, _lodash.forEach)(data, function (value, key) {
    return _this[key] = value;
  });
};

exports.default = Entity;