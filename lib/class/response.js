'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _constants = require('../constants.js');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response = function Response(response) {
  var _this = this;

  _classCallCheck(this, Response);

  this.get = function (name) {
    return _this.entities.find(function (entity) {
      return entity.name === name;
    });
  };

  this.all = function (name) {
    return _this.entities.filter(function (entity) {
      return entity.name === name;
    });
  };

  this.intent = function () {
    return _this.intents[0] || null;
  };

  this.isAssert = function () {
    return _this.act === _constants2.default.ACT_ASSERT;
  };

  this.isCommand = function () {
    return _this.act === _constants2.default.ACT_COMMAND;
  };

  this.isWhQuery = function () {
    return _this.act === _constants2.default.ACT_WH_QUERY;
  };

  this.isYnQuery = function () {
    return _this.act === _constants2.default.ACT_YN_QUERY;
  };

  this.isAbbreviation = function () {
    return _this.type.indexOf(_constants2.default.TYPE_ABBREVIATION) !== -1;
  };

  this.isEntity = function () {
    return _this.type.indexOf(_constants2.default.TYPE_ENTITY) !== -1;
  };

  this.isDescription = function () {
    return _this.type.indexOf(_constants2.default.TYPE_DESCRIPTION) !== -1;
  };

  this.isHuman = function () {
    return _this.type.indexOf(_constants2.default.TYPE_HUMAN) !== -1;
  };

  this.isLocation = function () {
    return _this.type.indexOf(_constants2.default.TYPE_LOCATION) !== -1;
  };

  this.isNumber = function () {
    return _this.type.indexOf(_constants2.default.TYPE_NUMBER) !== -1;
  };

  this.isVPositive = function () {
    return _this.sentiment === _constants2.default.SENTIMENT_VERY_POSITIVE;
  };

  this.isPositive = function () {
    return _this.sentiment === _constants2.default.SENTIMENT_POSITIVE;
  };

  this.isNeutral = function () {
    return _this.sentiment === _constants2.default.SENTIMENT_NEUTRAL;
  };

  this.isNegative = function () {
    return _this.sentiment === _constants2.default.SENTIMENT_NEGATIVE;
  };

  this.isVNegative = function () {
    return _this.sentiment === _constants2.default.SENTIMENT_VERY_NEGATIVE;
  };

  this.raw = response;
  this.uuid = response.uuid;

  this.source = response.source;
  this.intents = response.intents;
  this.act = response.act;
  this.type = response.type;
  this.sentiment = response.sentiment;

  this.entities = [];
  (0, _lodash.forEach)(response.entities, function (value, key) {
    value.forEach(function (entity) {
      return _this.entities.push(new _entity2.default(key, entity));
    });
  });

  this.language = response.language;
  this.version = response.version;
  this.status = response.status;
  this.timestamp = response.timestamp;
}

/**
 * Returns the first Entity whose name matches the parameter
 * @param {String} name: the entity's name
 * @returns {Entity}: returns the first entity that matches - name -
 */


/**
 * Returns all the entities whose name matches the parameter
 * @param {String} name: the entity's name
 * @returns {Array}: returns an array of Entity
 */


/**
 * Returns the first Intent if there is one
 * @returns {Intent}: thie first Intent or null
 */


/**
 * ACT HELPERS
 * Returns whether or not the response act corresponds to the checked one
 * @returns {boolean}: true or false
 */


/**
 * TYPE HELPERS
 * Returns whether or not the response type corresponds to the checked one
 * @returns {boolean}: true or false
 */


/**
 * SENTIMENT HELPERS
 * Returns whether or not the response sentiment corresponds to the checked one
 * @returns {boolean}: true or false
 */
;

exports.default = Response;