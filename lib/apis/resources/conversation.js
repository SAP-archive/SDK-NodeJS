'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _superagentProxy = require('superagent-proxy');

var _superagentProxy2 = _interopRequireDefault(_superagentProxy);

var _superagentPromise = require('superagent-promise');

var _superagentPromise2 = _interopRequireDefault(_superagentPromise);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _recastError = require('./recastError');

var _recastError2 = _interopRequireDefault(_recastError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var agent = (0, _superagentPromise2.default)((0, _superagentProxy2.default)(_superagent2.default), Promise);

var Conversation = function Conversation(_ref) {
  var _this = this;

  var conversation_token = _ref.conversation_token,
      next_actions = _ref.next_actions,
      response = _objectWithoutProperties(_ref, ['conversation_token', 'next_actions']);

  _classCallCheck(this, Conversation);

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

  this.setMemory = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(memory) {
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return agent('PUT', _constants2.default.CONVERSE_ENDPOINT).set('Authorization', 'Token ' + _this.recastToken).send({ memory: memory, conversation_token: _this.conversationToken });

            case 3:
              res = _context.sent;


              _this.memory = _extends({}, _this.memory, memory);
              return _context.abrupt('return', res.body.results);

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](0);
              throw new _recastError2.default(_context.t0);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 8]]);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.resetMemory = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(alias) {
      var data, res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              data = { conversation_token: _this.conversationToken, memory: {} };

              if (alias) {
                data.memory[alias] = null;
              }

              _context2.next = 5;
              return agent('PUT', _constants2.default.CONVERSE_ENDPOINT).set('Authorization', 'Token ' + _this.recastToken).send(data);

            case 5:
              res = _context2.sent;


              _this.memory = _extends({}, _this.memory, data.memory);
              return _context2.abrupt('return', res.body.results);

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2['catch'](0);
              throw new _recastError2.default(_context2.t0.message);

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[0, 10]]);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  this.resetConversation = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var res, key;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return agent('DELETE', _constants2.default.CONVERSE_ENDPOINT).set('Authorization', 'Token ' + _this.recastToken).send({ conversation_token: _this.conversationToken });

          case 3:
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

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3['catch'](0);
            throw new _recastError2.default(_context3.t0.message);

          case 16:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this, [[0, 13]]);
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