'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var Message = function Message(body, sapcaiToken) {
  var _this = this;

  (0, _classCallCheck3.default)(this, Message);

  this.addReply = function (replies) {
    return _this._messageStack = _this._messageStack.concat(replies);
  };

  this.reply = function () {
    var replies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var messages = _this._messageStack;

    if (replies instanceof Array) {
      messages.push.apply(messages, (0, _toConsumableArray3.default)(replies));
    } else {
      messages.push(replies);
    }
    _this._messageStack = [];
    return agent('POST', _constants2.default.MESSAGE_ENDPOINT.replace(':conversation_id', _this.conversationId)).set('Authorization', 'Token ' + _this.sapcaiToken).send({ messages: messages });
  };

  for (var key in body) {
    this[key] = body[key];
  }

  this.content = body.nlp.source;
  this.type = body.nlp.type;
  this.conversationId = body.conversation.conversation_id;
  this.sapcaiToken = sapcaiToken;
  this._messageStack = [];
};

exports.default = Message;
