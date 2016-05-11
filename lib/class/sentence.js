'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sentence = undefined;

var _entity = require('./entity');

var _lodash = require('lodash');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sentence = exports.Sentence = function Sentence(sentence) {
  var _this = this;

  _classCallCheck(this, Sentence);

  this.source = sentence.source;
  this.type = sentence.type;
  this.action = sentence.action;
  this.agent = sentence.agent;
  this.polarity = sentence.polarity;
  this.entities = [];
  (0, _lodash.forEach)(sentence.entities, function (value, key) {
    value.forEach(function (entity) {
      return _this.entities.push(new _entity.Entity(key, entity));
    });
  });
};