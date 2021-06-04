'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var Request = function Request(token, language) {
  (0, _classCallCheck3.default)(this, Request);

  _initialiseProps.call(this);

  this.token = token;
  this.language = language;
}

/*
 * /request (with text string)
 */


/*
 * /converse
 */
;

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.analyseText = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(text) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var token, proxy, data, request, res;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = options.token || _this.token;
              proxy = options.proxy;
              data = { text: text, language: options.language || _this.language };

              if (token) {
                _context.next = 5;
                break;
              }

              throw new _resources.SapcaiError('Parameter token is missing');

            case 5:
              request = agent('POST', _constants2.default.REQUEST_ENDPOINT).set('Authorization', 'Token ' + token);

              if (proxy) {
                request.proxy(proxy);
              }

              _context.next = 9;
              return request.send(data);

            case 9:
              res = _context.sent;
              return _context.abrupt('return', new _resources.Response(res.body.results));

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  this.converseText = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(text) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var token, proxy, data, request, res;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              token = options.token || _this.token;
              proxy = options.proxy;
              data = {
                text: text,
                language: options.language || _this.language,
                conversation_token: options.conversationToken,
                memory: options.memory
              };

              if (token) {
                _context2.next = 5;
                break;
              }

              throw new _resources.SapcaiError('Parameter token is missing');

            case 5:
              request = agent('POST', _constants2.default.CONVERSE_ENDPOINT).set('Authorization', 'Token ' + token);

              if (proxy) {
                request.proxy(proxy);
              }

              _context2.next = 9;
              return request.send(data);

            case 9:
              res = _context2.sent;
              return _context2.abrupt('return', new _resources.Conversation((0, _extends3.default)({}, res.body.results, { sapcaiToken: _this.token })));

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
};

exports.default = Request;