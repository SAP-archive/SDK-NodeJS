"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Intent = function Intent(intent) {
  _classCallCheck(this, Intent);

  this.name = intent.name;
  this.confidence = intent.confidence;
};

exports.default = Intent;