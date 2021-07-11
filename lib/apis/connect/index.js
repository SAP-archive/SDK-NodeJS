'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _resources = require('../resources');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var agent = (0, _superagentPromise2.default)((0, _superagentProxy2.default)(_superagent2.default), _promise2.default);

var Connect = function Connect(token) {
  var _this = this;

  (0, _classCallCheck3.default)(this, Connect);

  this.handleMessage = function (req, res, onMessageReceived) {
    if (typeof res.status === 'function') {
      res.status(200).send();
    } else {
      res.status = 200;
    }

    return onMessageReceived(new _resources.Message(req.body, _this.token));
  };

  this.sendMessage = function (messages, conversationId) {
    return agent('POST', _constants2.default.MESSAGE_ENDPOINT.replace(':conversation_id', conversationId)).set('Authorization', 'Token ' + _this.token).send({ messages: messages });
  };

  this.broadcastMessage = function (messages) {
    return agent('POST', _constants2.default.CONVERSATION_ENDPOINT).set('Authorization', 'Token ' + _this.token).send({ messages: messages });
  };

  this.token = token;
};

exports.default = Connect;