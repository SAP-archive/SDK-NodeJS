'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Converse = exports.RecastError = exports.Entity = exports.Response = exports.Client = undefined;

var _client = require('./class/client');

var _client2 = _interopRequireDefault(_client);

var _response = require('./class/response');

var _response2 = _interopRequireDefault(_response);

var _entity = require('./class/entity');

var _entity2 = _interopRequireDefault(_entity);

var _error = require('./class/error');

var _error2 = _interopRequireDefault(_error);

var _converse = require('./class/converse');

var _converse2 = _interopRequireDefault(_converse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Client = _client2.default;
exports.Response = _response2.default;
exports.Entity = _entity2.default;
exports.RecastError = _error2.default;
exports.Converse = _converse2.default;


var client = new _client2.default('b3ccaff9ef520ee9ee8e01926d2ca7b1');
client.converseRequest('What is the weather in Paris ?').then(function (res) {
  var converseToken = res.converseToken;
  console.log('FIRST REQ', res);

  _converse2.default.setMemory('b3ccaff9ef520ee9ee8e01926d2ca7b1', converseToken, { client: { value: 'pouet' } }).then(function (res) {
    return console.log('SET MEM', res);
  }).catch(function (err) {
    return console.log('err', err);
  });

  _converse2.default.resetMemory('b3ccaff9ef520ee9ee8e01926d2ca7b1', converseToken, 'client').then(function (res) {
    return console.log('RESET MEM', res);
  }).catch(function (err) {
    return console.log('err', err);
  });

  _converse2.default.resetConversation('b3ccaff9ef520ee9ee8e01926d2ca7b1', converseToken).then(function (res) {
    return console.log('RESET CONV', res);
  }).catch(function (err) {
    return console.log('err', err);
  });
}).catch(function (err) {
  return console.log('error', err);
});