'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _lodash = require('lodash');

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Conversation = function () {
  function Conversation(response) {
    var _this = this;

    _classCallCheck(this, Conversation);

    this.reply = function () {
      return _this.replies[0] || null;
    };

    this.nextAction = function () {
      return _this.nextActions[0] || null;
    };

    this.joinedReplies = function () {
      var sep = arguments.length <= 0 || arguments[0] === undefined ? ' ' : arguments[0];
      return _this.replies.join(sep);
    };

    this.getMemory = function (alias) {
      return alias ? _this.memory[alias] : _this.memory;
    };

    this.raw = response;

    this.uuid = response.uuid;
    this.source = response.source;
    this.replies = response.replies;
    this.action = response.action;
    this.nextActions = response.next_actions;
    this.memory = response.memory;

    this.entities = [];
    (0, _lodash.forEach)(response.entities, function (value, key) {
      value.forEach(function (entity) {
        return _this.entities.push(new _entity2.default(key, entity));
      });
    });

    this.intents = response.intents;
    this.conversationToken = response.conversation_token;

    this.language = response.language;
    this.timestamp = response.timestamp;
    this.status = response.status;
  }

  /**
   * Returns the first reply if there is one
   * @returns {String}: this first reply or null
   */


  /**
   * Returns the first next action if there is one
   * @returns {String}: this first reply or null
   */


  /**
   * Returns a concatenation of the replies
   * @returns {String}: the concatenation of the replies
   */


  /**
   * Returns the memory matching the alias
   * or all the memory if no alias provided
   * @returns {object}: the memory
   */


  _createClass(Conversation, null, [{
    key: 'setMemory',


    /**
     * Merge the conversation memory with the one in parameter
     * Returns the memory updated
     * @returns {object}: the memory updated
     */
    value: function setMemory(token, conversationToken, memory) {
      var data = { conversation_token: conversationToken, memory: memory };
      var request = {
        method: 'put',
        url: _constants2.default.CONVERSE_ENDPOINT,
        headers: { Authorization: 'Token ' + token },
        data: data
      };

      return new Promise(function (resolve, reject) {
        (0, _axios2.default)(request).then(function (res) {
          return resolve(res.data.results);
        }).catch(function (err) {
          return reject(new _error2.default(err.message));
        });
      });
    }

    /**
     * Reset the memory of the conversation
     * @returns {object}: the updated memory
     */

  }, {
    key: 'resetMemory',
    value: function resetMemory(token, conversationToken, alias) {
      var data = { conversation_token: conversationToken };
      if (alias) {
        data.memory = { alias: null };
      }
      var request = {
        method: 'put',
        url: _constants2.default.CONVERSE_ENDPOINT,
        headers: { Authorization: 'Token ' + token },
        data: data
      };

      return new Promise(function (resolve, reject) {
        (0, _axios2.default)(request).then(function (res) {
          return resolve(res.data.results);
        }).catch(function (err) {
          return reject(new _error2.default(err.message));
        });
      });
    }

    /**
     * Reset the conversation
     * @returns {object}: the updated memory
     */

  }, {
    key: 'resetConversation',
    value: function resetConversation(token, conversationToken) {
      var request = {
        method: 'delete',
        url: _constants2.default.CONVERSE_ENDPOINT,
        headers: { Authorization: 'Token ' + token },
        data: { conversation_token: conversationToken }
      };

      return new Promise(function (resolve, reject) {
        (0, _axios2.default)(request).then(function (res) {
          return resolve(res.data.results);
        }).catch(function (err) {
          return reject(new _error2.default(err.message));
        });
      });
    }
  }]);

  return Conversation;
}();

exports.default = Conversation;