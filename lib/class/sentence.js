'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sentence = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entity = require('./entity');

var _lodash = require('lodash');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sentence = exports.Sentence = function () {
  function Sentence(sentence) {
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
  }

  /**
   * Returns the first Entity whose name matches the parameter
   * @param {String} name: the entity's name
   * @returns {Entity}: returns the first entity that matches - name -
   */


  _createClass(Sentence, [{
    key: 'get',
    value: function get(name) {
      var result = void 0;

      this.entities.forEach(function (entity) {
        if (entity.name === name && !result) {
          result = entity;
        }
      });
      return result;
    }

    /**
     * Returns all the entities whose name matches the parameter
     * @param {String} name: the entity's name
     * @returns {Array}: returns an array of Entity, or null
     */

  }, {
    key: 'all',
    value: function all(name) {
      var array = [];

      this.entities.forEach(function (entity) {
        if (entity.name === name) {
          array.push(entity);
        }
      });
      return array;
    }
  }]);

  return Sentence;
}();