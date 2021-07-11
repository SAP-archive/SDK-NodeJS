"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logs = function Logs(client) {
  var _this = this;

  (0, _classCallCheck3.default)(this, Logs);

  this.list = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(params, opts) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", _this.client.get("/users/" + _this.client.userSlug + "/bots/" + _this.client.botSlug + "/versions/" + _this.client.botVersion + "/dataset/logs", params, opts));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  this.getById = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id, params, opts) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", _this.client.get("/users/" + _this.client.userSlug + "/bots/" + _this.client.botSlug + "/versions/" + _this.client.botVersion + "/dataset/logs/" + id, params, opts));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x3, _x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.deleteById = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(id, params, opts) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", _this.client.del("/users/" + _this.client.userSlug + "/bots/" + _this.client.botSlug + "/versions/" + _this.client.botVersion + "/dataset/logs/" + id, params, opts));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));

    return function (_x6, _x7, _x8) {
      return _ref3.apply(this, arguments);
    };
  }();

  this.deleteBulk = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(data, opts) {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", _this.client.post("/users/" + _this.client.userSlug + "/bots/" + _this.client.botSlug + "/versions/" + _this.client.botVersion + "/dataset/logs/bulk_destroy", data, opts));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x9, _x10) {
      return _ref4.apply(this, arguments);
    };
  }();

  this.archiveBulk = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(data, opts) {
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", _this.client.put("/users/" + _this.client.userSlug + "/bots/" + _this.client.botSlug + "/versions/" + _this.client.botVersion + "/dataset/logs/bulk_archive", data, opts));

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }));

    return function (_x11, _x12) {
      return _ref5.apply(this, arguments);
    };
  }();

  this.client = client;
};

exports.default = Logs;