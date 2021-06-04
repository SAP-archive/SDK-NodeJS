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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var agent = (0, _superagentPromise2.default)((0, _superagentProxy2.default)(_superagent2.default), _promise2.default);

var Build = function Build(token, language) {
  (0, _classCallCheck3.default)(this, Build);

  _initialiseProps.call(this);

  this.token = token;
  this.language = language;
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.dialog = function (message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var memory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var log_level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'info';

    var token = options.token || _this.token;
    var proxy = options.proxy;
    var data = {
      message: message,
      conversation_id: options.conversationId,
      language: options.language || _this.language,
      log_level: log_level
    };
    if (memory) data['memory'] = memory;

    var request = agent('POST', _constants2.default.DIALOG_ENDPOINT + '/dialog').set('Authorization', 'Token ' + token);
    if (proxy) {
      request.proxy(proxy);
    }
    return request.send(data).then(function (res) {
      return res.body.results;
    });
  };

  this.getConversation = function (user, bot, version, conversationId) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    var token = options.token || _this.token;
    var proxy = options.proxy;

    var request = agent('GET', _constants2.default.DIALOG_ENDPOINT + '/users/' + user + '/bots/' + bot + '/versions/' + version + '/builder/conversation_states/' + conversationId).set('Authorization', 'Token ' + token);
    if (proxy) {
      request.proxy(proxy);
    }
    return request.send();
  };

  this.updateConversation = function (user, bot, version, conversationId) {
    var data = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

    var token = options.token || _this.token;
    var proxy = options.proxy;
    if (data.memory && data.memory.constructor !== Object) {
      return _promise2.default.reject('Invalid memory parameter');
    }

    var request = agent('PUT', _constants2.default.DIALOG_ENDPOINT + '/users/' + user + '/bots/' + bot + '/versions/' + version + '/builder/conversation_states/' + conversationId).set('Authorization', 'Token ' + token);
    if (proxy) {
      request.proxy(proxy);
    }
    return request.send(data);
  };

  this.deleteConversation = function (user, bot, version, conversationId) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    var token = options.token || _this.token;
    var proxy = options.proxy;

    var request = agent('DELETE', _constants2.default.DIALOG_ENDPOINT + '/users/' + user + '/bots/' + bot + '/versions/' + version + '/builder/conversation_states/' + conversationId).set('Authorization', 'Token ' + token);
    if (proxy) {
      request.proxy(proxy);
    }
    return request.send();
  };
};

exports.default = Build;