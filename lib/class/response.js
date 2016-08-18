'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Response = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sentence = require('./sentence');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response = exports.Response = function () {
  function Response(response) {
    var _this = this;

    _classCallCheck(this, Response);

    this.raw = function () {
      return _this.raw;
    };

    this.type = function () {
      return _this.type;
    };

    this.language = function () {
      return _this.language;
    };

    this.source = function () {
      return _this.source;
    };

    this.intents = function () {
      return _this.intents;
    };

    this.version = function () {
      return _this.version;
    };

    this.timestamp = function () {
      return _this.timestamp;
    };

    this.status = function () {
      return _this.status;
    };

    this.raw = response;
    response = response.results;
    this.source = response.source;
    this.intents = response.intents;
    this.language = response.language;
    this.type = response.type;
    this.sentences = response.sentences.map(function (sentence) {
      return new _sentence.Sentence(sentence);
    });
    this.version = response.version;
    this.timestamp = response.timestamp;
    this.status = response.status;
  }

  /**
   * Getters
   * @returns the corresponding attribute
   */


  _createClass(Response, [{
    key: 'intent',


    /**
     * Returns the first Intent if there is one
     * @returns {Sentence}: returns the first Intent or null
     */
    value: function intent() {
      return this.intents ? this.intents[0] : null;
    }

    /**
     * Returns the first Sentence if there is one
     * @returns {Sentence}: returns the first Sentence or null
     */

  }, {
    key: 'sentence',
    value: function sentence() {
      return this.sentences ? this.sentences[0] : null;
    }

    /**
     * Returns the first Entity whose name matches the parameter
     * @param {String} name: the entity's name
     * @returns {Entity}: returns the first entity that matches - name -
     */

  }, {
    key: 'get',
    value: function get(name) {
      var response = void 0;

      this.sentences.forEach(function (sentence) {
        sentence.entities.forEach(function (entity) {
          if (entity.name === name && !response) {
            response = entity;
          }
        });
      });
      return response;
    }

    /**
     * Returns all the entities whose name matches the parameter
     * @param {String} name: the entity's name
     * @returns {Array}: returns an array of Entity, or null
     */

  }, {
    key: 'all',
    value: function all(name) {
      var response = [];

      this.sentences.forEach(function (sentence) {
        sentence.entities.forEach(function (entity) {
          if (entity.name === name) {
            response.push(entity);
          }
        });
      });
      return response;
    }
  }]);

  return Response;
}();