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

var Intents = function Intents(client) {
  var _this = this;

  (0, _classCallCheck3.default)(this, Intents);

  this.list = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(params, opts) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", _this.client.get("/users/" + _this.client.userSlug + "/bots/" + _this.client.botSlug + "/versions/" + _this.client.botVersion + "/dataset/intents", params, opts));

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

  this.getBySlug = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(slug, params, opts) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", _this.client.get("/users/" + _this.client.userSlug + "/bots/" + _this.client.botSlug + "/versions/" + _this.client.botVersion + "/dataset/intents/" + slug, params, opts));

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

  this.deleteBySlug = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(slug, params, opts) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", _this.client.del("/users/" + _this.client.userSlug + "/bots/" + _this.client.botSlug + "/versions/" + _this.client.botVersion + "/dataset/intents/" + slug, params, opts));

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

  this.getEntities = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(slug, params, opts) {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", _this.client.get("/users/" + _this.client.userSlug + "/bots/" + _this.client.botSlug + "/versions/" + _this.client.botVersion + "/dataset/intents/" + slug + "/entities", params, opts));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x9, _x10, _x11) {
      return _ref4.apply(this, arguments);
    };
  }();

  this.getExpressions = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(slug, params, opts) {
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", _this.client.get("/users/" + _this.client.userSlug + "/bots/" + _this.client.botSlug + "/versions/" + _this.client.botVersion + "/dataset/intents/" + slug + "/expressions", params, opts));

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }));

    return function (_x12, _x13, _x14) {
      return _ref5.apply(this, arguments);
    };
  }();

  this.getExpressionById = function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(slug, id, params, opts) {
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", _this.client.get("/users/" + _this.client.userSlug + "/bots/" + _this.client.botSlug + "/versions/" + _this.client.botVersion + "/dataset/intents/" + slug + "/expressions/" + id, params, opts));

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    }));

    return function (_x15, _x16, _x17, _x18) {
      return _ref6.apply(this, arguments);
    };
  }();

  this.deleteExpressionById = function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(slug, id, params, opts) {
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", _this.client.del("/users/" + _this.client.userSlug + "/bots/" + _this.client.botSlug + "/versions/" + _this.client.botVersion + "/dataset/intents/" + slug + "/expressions/" + id, params, opts));

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, _this);
    }));

    return function (_x19, _x20, _x21, _x22) {
      return _ref7.apply(this, arguments);
    };
  }();

  this.createOneExpression = function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(slug, data, opts) {
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", _this.client.post("/users/" + _this.client.userSlug + "/bots/" + _this.client.botSlug + "/versions/" + _this.client.botVersion + "/dataset/intents/" + slug + "/expressions", data, opts));

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, _this);
    }));

    return function (_x23, _x24, _x25) {
      return _ref8.apply(this, arguments);
    };
  }();

  this.createBulkExpressions = function () {
    var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(slug, data, opts) {
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              return _context9.abrupt("return", _this.client.post("/users/" + _this.client.userSlug + "/bots/" + _this.client.botSlug + "/versions/" + _this.client.botVersion + "/dataset/intents/" + slug + "/expressions/bulk_create", data, opts));

            case 1:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, _this);
    }));

    return function (_x26, _x27, _x28) {
      return _ref9.apply(this, arguments);
    };
  }();

  this.updateExpressionById = function () {
    var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(slug, id, data, opts) {
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt("return", _this.client.put("/users/" + _this.client.userSlug + "/bots/" + _this.client.botSlug + "/versions/" + _this.client.botVersion + "/dataset/intents/" + slug + "/expressions/" + id, data, opts));

            case 1:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, _this);
    }));

    return function (_x29, _x30, _x31, _x32) {
      return _ref10.apply(this, arguments);
    };
  }();

  this.create = function () {
    var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(data, opts) {
      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              return _context11.abrupt("return", _this.client.post("/users/" + _this.client.userSlug + "/bots/" + _this.client.botSlug + "/versions/" + _this.client.botVersion + "/dataset/intents", data, opts));

            case 1:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, _this);
    }));

    return function (_x33, _x34) {
      return _ref11.apply(this, arguments);
    };
  }();

  this.update = function () {
    var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(data, opts) {
      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", _this.client.put("/users/" + _this.client.userSlug + "/bots/" + _this.client.botSlug + "/versions/" + _this.client.botVersion + "/dataset/intents", data, opts));

            case 1:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, _this);
    }));

    return function (_x35, _x36) {
      return _ref12.apply(this, arguments);
    };
  }();

  this.client = client;
};

exports.default = Intents;