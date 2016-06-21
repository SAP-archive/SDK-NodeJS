'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _response = require('./response');

var _error = require('./error');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = exports.Client = function () {
  function Client(token, language) {
    _classCallCheck(this, Client);

    this.token = token;
    this.language = language;
  }

  /**
   * Perform a text request on Recast.AI
   * @param {String} text: the text to process
   * @param {Function} callback: the callback which be called with the Response of the request or a the RecastError
   * @param {Hash} options: [optional] request's options
   */


  _createClass(Client, [{
    key: 'textRequest',
    value: function textRequest(text, callback, options) {
      var TOKEN = options && options.token || this.token;
      var LANGUAGE = options && options.language ? options.language : this.language;
      var params = { text: text };

      if (LANGUAGE) {
        params.language = LANGUAGE;
      }

      if (!TOKEN) {
        return callback(null, new _error.RecastError('Token is missing'));
      } else {
        _superagent2.default.post('https://api.recast.ai/v1/request').set('Authorization', 'Token ' + TOKEN).send(params).end(function (err, res) {
          if (err) {
            return callback(res, new _error.RecastError(err.message));
          } else {
            return callback(new _response.Response(res.body), null);
          }
        });
      }
    }

    /**
     * Perform a voice file request on Recast.AI
     * @param {String} file: the name of the file to process
     * @param {Function} callback: the callback which be called with the Response of the request or with a RecastError
     * @param {Hash} options: [optional] request's options
     */

  }, {
    key: 'fileRequest',
    value: function fileRequest(file, callback, options) {
      var TOKEN = options && options.token ? options.token : this.token;
      var LANGUAGE = options && options.language ? options.language : this.language;
      var params = {};

      if (LANGUAGE) {
        params.language = LANGUAGE;
      }

      if (!TOKEN) {
        return callback(null, new _error.RecastError('Token is missing'));
      } else {
        var req = _superagent2.default.post('https://api.recast.ai/v1/request').attach('voice', file).set('Authorization', 'Token ' + TOKEN).set('Content-Type', '');

        if (LANGUAGE) {
          req.send(params);
        }

        req.end(function (err, res) {
          if (err) {
            return callback(res, new _error.RecastError(err.message));
          } else {
            return callback(new _response.Response(res.body));
          }
        });
      }
    }
  }]);

  return Client;
}();