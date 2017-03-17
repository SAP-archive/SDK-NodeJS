'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _superagentProxy = require('superagent-proxy');

var _superagentProxy2 = _interopRequireDefault(_superagentProxy);

var _superagentPromise = require('superagent-promise');

var _superagentPromise2 = _interopRequireDefault(_superagentPromise);

var _resources = require('../resources');

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var agent = (0, _superagentPromise2.default)((0, _superagentProxy2.default)(_superagent2.default), Promise);

var Message = function Message(body, recastToken) {
  var _this = this;

  _classCallCheck(this, Message);

  this.addReply = function (replies) {
    return _this._messageStack = _this._messageStack.concat(replies);
  };

  this.reply = function () {
    var replies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return agent('POST', _constants2.default.MESSAGE_ENDPOINT.replace(':conversation_id', _this.conversationId)).set('Authorization', 'Token ' + _this.recastToken).send({ messages: [].concat(_toConsumableArray(_this._messageStack), _toConsumableArray(replies)) }).catch(function (err) {
      throw new _resources.RecastError(err);
    });
  };

  for (var key in body) {
    this[key] = body[key];
  }

  this.content = body.message.attachment.content;
  this.type = body.message.attachment.type;
  this.conversationId = body.message.conversation;
  this.recastToken = recastToken;
  this._messageStack = [];
};

exports.default = Message;