'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _superagentProxy = require('superagent-proxy');

var _superagentProxy2 = _interopRequireDefault(_superagentProxy);

var _superagentPromise = require('superagent-promise');

var _superagentPromise2 = _interopRequireDefault(_superagentPromise);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var agent = (0, _superagentPromise2.default)((0, _superagentProxy2.default)(_superagent2.default), _promise2.default);

var Conversation = function Conversation(_ref) {
  var _this = this;

  var conversation_token = _ref.conversation_token,
      next_actions = _ref.next_actions,
      response = (0, _objectWithoutProperties3.default)(_ref, ['conversation_token', 'next_actions']);
  (0, _classCallCheck3.default)(this, Conversation);

  this.reply = function () {
    return _this.replies[0] || null;
  };

  this.nextAction = function () {
    return _this.nextActions[0] || null;
  };

  this.joinedReplies = function () {
    var sep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
    return _this.replies.join(sep);
  };

  this.getMemory = function (alias) {
    return alias ? _this.memory[alias] : _this.memory;
  };

  this.get = function (name) {
    return _this.entities[name] && _this.entities[name][0] || null;
  };

  this.all = function (name) {
    return _this.entities[name] || null;
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

  this.setMemory = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(memory) {
      var res;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return agent('PUT', _constants2.default.CONVERSE_ENDPOINT).set('Authorization', 'Token ' + _this.sapcaiToken).send({ memory: memory, conversation_token: _this.conversationToken });

            case 2:
              res = _context.sent;


              _this.memory = (0, _extends3.default)({}, _this.memory, memory);
              return _context.abrupt('return', res.body.results);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.resetMemory = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(alias) {
      var data, res;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              data = { conversation_token: _this.conversationToken, memory: {} };

              if (alias) {
                data.memory[alias] = null;
              }

              _context2.next = 4;
              return agent('PUT', _constants2.default.CONVERSE_ENDPOINT).set('Authorization', 'Token ' + _this.sapcaiToken).send(data);

            case 4:
              res = _context2.sent;


              _this.memory = (0, _extends3.default)({}, _this.memory, data.memory);
              return _context2.abrupt('return', res.body.results);

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  this.resetConversation = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var res, key;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return agent('DELETE', _constants2.default.CONVERSE_ENDPOINT).set('Authorization', 'Token ' + _this.sapcaiToken).send({ conversation_token: _this.conversationToken });

          case 2:
            res = _context3.sent;


            _this.intents = [];
            _this.replies = [];
            _this.nextActions = [];
            _this.entities = [];
            _this.action = null;
            for (key in _this.memory) {
              _this.memory[key] = null;
            }

            return _context3.abrupt('return', res.body.results);

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  for (var key in response) {
    this[key] = response[key];
  }

  this.nextActions = next_actions;
  this.conversationToken = conversation_token;
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
 * SENTIMENT HELPERS
 * Returns whether or not the response sentiment corresponds to the checked one
 * @returns {boolean}: true or false
 */


/**
 * Merge the conversation memory with the one in parameter
 * Returns the memory updated
 * @returns {object}: the memory updated
 */


/**
 * Reset the memory of the conversation
 * @returns {object}: the updated memory
 */


/**
 * Reset the conversation
 * @returns {object}: the updated memory
 */
;

exports.default = Conversation;