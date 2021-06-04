'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _bots = require('./bots');

var _bots2 = _interopRequireDefault(_bots);

var _entities = require('./entities');

var _entities2 = _interopRequireDefault(_entities);

var _gazettes = require('./gazettes');

var _gazettes2 = _interopRequireDefault(_gazettes);

var _intents = require('./intents');

var _intents2 = _interopRequireDefault(_intents);

var _logs = require('./logs');

var _logs2 = _interopRequireDefault(_logs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var agent = (0, _superagentPromise2.default)((0, _superagentProxy2.default)(_superagent2.default), _promise2.default);

var Train = function Train(token, language, version, userSlug, botSlug) {
  (0, _classCallCheck3.default)(this, Train);

  _initialiseProps.call(this);

  if (typeof userSlug !== 'string' || typeof botSlug !== 'string') {
    throw new _resources.SapcaiError('Train client must be initiated with a user slug and a bot slug');
  }

  this.token = token;
  this.language = language;
  this.userSlug = userSlug;
  this.botSlug = botSlug;
  this.botVersion = version;

  this.bots = new _bots2.default(this);
  this.entities = new _entities2.default(this);
  this.gazettes = new _gazettes2.default(this);
  this.intents = new _intents2.default(this);
  this.logs = new _logs2.default(this);
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.get = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var token, proxy, request;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = options.token || _this.token;
              proxy = options.proxy;

              if (token) {
                _context.next = 4;
                break;
              }

              throw new _resources.SapcaiError('Parameter token is missing');

            case 4:
              request = agent.get('' + _constants2.default.TRAIN_ENDPOINT + url).query(params).set('Authorization', 'Token ' + token);

              if (proxy) {
                request.proxy(proxy);
              }

              return _context.abrupt('return', request.send());

            case 7:
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

  this.del = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var token, proxy, request;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              token = options.token || _this.token;
              proxy = options.proxy;

              if (token) {
                _context2.next = 4;
                break;
              }

              throw new _resources.SapcaiError('Parameter token is missing');

            case 4:
              request = agent.del('' + _constants2.default.TRAIN_ENDPOINT + url).query(params).set('Authorization', 'Token ' + token);

              if (proxy) {
                request.proxy(proxy);
              }

              return _context2.abrupt('return', request.send());

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.post = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(url) {
      var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var token, proxy, request;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              token = options.token || _this.token;
              proxy = options.proxy;

              if (token) {
                _context3.next = 4;
                break;
              }

              throw new _resources.SapcaiError('Parameter token is missing');

            case 4:
              request = agent.post('' + _constants2.default.TRAIN_ENDPOINT + url).send(body).set('Authorization', 'Token ' + token);

              if (proxy) {
                request.proxy(proxy);
              }

              return _context3.abrupt('return', request.send(body));

            case 7:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));

    return function (_x7) {
      return _ref3.apply(this, arguments);
    };
  }();

  this.put = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(url) {
      var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var token, proxy, request;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              token = options.token || _this.token;
              proxy = options.proxy;

              if (token) {
                _context4.next = 4;
                break;
              }

              throw new _resources.SapcaiError('Parameter token is missing');

            case 4:
              request = agent.put('' + _constants2.default.TRAIN_ENDPOINT + url).send(body).set('Authorization', 'Token ' + token);

              if (proxy) {
                request.proxy(proxy);
              }

              return _context4.abrupt('return', request.send(body));

            case 7:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x10) {
      return _ref4.apply(this, arguments);
    };
  }();
};

exports.default = Train;