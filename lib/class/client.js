'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _formData = require('form-data');

var _formData2 = _interopRequireDefault(_formData);

var _response = require('./response');

var _response2 = _interopRequireDefault(_response);

var _conversation = require('./conversation');

var _conversation2 = _interopRequireDefault(_conversation);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function () {
  function Client(token, language) {
    _classCallCheck(this, Client);

    this.token = token;
    this.language = language;
  }

  /**
   * Perform a text request on /converse Recast.AI API endpoint
   * @param {String} text: the text to process
   * @param {Object} options: [optional] request's options
   */


  _createClass(Client, [{
    key: 'textConverse',
    value: function textConverse(text, options) {
      var token = options && options.token || this.token;
      var data = {
        text: text,
        language: options && options.language || this.language,
        conversation_token: options && options.conversationToken,
        memory: options && options.memory
      };
      var proxy = options && options.proxy;
      if (!token) {
        return Promise.reject('Token is missing');
      }

      var request = {
        method: 'post',
        url: _constants2.default.CONVERSE_ENDPOINT,
        headers: { Authorization: 'Token ' + token },
        data: data
      };
      if (proxy) {
        request.proxy = proxy;
      }

      return new Promise(function (resolve, reject) {
        (0, _axios2.default)(request).then(function (res) {
          return resolve(new _conversation2.default(res.data.results));
        }).catch(function (err) {
          return reject(new _error2.default(err.message));
        });
      });
    }

    /**
     * Perform a text request on Recast.AI
     * @param {String} text: the text to process
     * @param {Object} options: [optional] request's options
     */

  }, {
    key: 'textRequest',
    value: function textRequest(text, options) {
      var token = options && options.token || this.token;
      var data = { text: text, language: options && options.language || this.language };
      var proxy = options && options.proxy;
      if (!token) {
        return Promise.reject('Token is missing');
      }

      var request = {
        method: 'post',
        url: _constants2.default.REQUEST_ENDPOINT,
        headers: { Authorization: 'Token ' + token },
        data: data
      };
      if (proxy) {
        request.proxy = proxy;
      }

      return new Promise(function (resolve, reject) {
        (0, _axios2.default)(request).then(function (res) {
          return resolve(new _response2.default(res.data.results));
        }).catch(function (err) {
          return reject(new _error2.default(err.message));
        });
      });
    }

    /**
     * Perform a voice file request on Recast.AI
     * @param {String} file: the name of the file to process
     * @param {Object} options: [optional] request's options
     */

  }, {
    key: 'fileRequest',
    value: function fileRequest(file, options) {
      var token = options && options.token || this.token;
      var language = options && options.language || this.language;
      var proxy = options && options.proxy;
      if (!token) {
        return Promise.reject(new _error2.default('Token is missing'));
      }

      var data = new _formData2.default();
      data.append('voice', file);
      if (language) {
        data.append('language', language);
      }

      var request = {
        method: 'post',
        url: _constants2.default.REQUEST_ENDPOINT,
        headers: { Authorization: 'Token ' + token },
        data: data
      };
      if (proxy) {
        request.proxy = proxy;
      }

      return new Promise(function (resolve, reject) {
        (0, _axios2.default)(request).then(function (res) {
          return resolve(new _response2.default(res.data.results));
        }).catch(function (err) {
          return reject(new _error2.default(err.message));
        });
      });
    }
  }]);

  return Client;
}();

exports.default = Client;