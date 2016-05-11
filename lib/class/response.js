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
    _classCallCheck(this, Response);

    this.raw = response;
    response = response.results;
    this.source = response.source;
    this.intents = response.intents;
    this.sentences = response.sentences.map(function (sentence) {
      return new _sentence.Sentence(sentence);
    });
    this.version = response.version;
    this.timestamp = response.timestamp;
    this.status = response.status;
  }

  /*
    Returns the first intent if there is one
  */


  _createClass(Response, [{
    key: 'intent',
    value: function intent() {
      return this.intents ? this.intents[0] : null;
    }

    /*
      Returns the first sentence if there is one
    */

  }, {
    key: 'sentence',
    value: function sentence() {
      return this.sentences ? this.sentences[0] : null;
    }

    /*
      Returns the first entity whose name matches the parameter
      | Args |
        - name - String, the entity's name
      | Return |
        - An instance of Entity or undefined
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

    /*
      Returns all the entities whose name matches the parameter
      | Args |
        - name - String, the entity's name
      | Return |
        - An array of Entity's instances or an empty array
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