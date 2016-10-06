'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  REQUEST_ENDPOINT: 'https://api.recast.ai/v2/request',
  CONVERSE_ENDPOINT: 'https://api.recast.ai/v2/converse',
  WS_ENDPOINT: 'wss://api.recast.ai/v2/request',

  ACT_ASSERT: 'assert',
  ACT_COMMAND: 'command',
  ACT_WH_QUERY: 'wh-query',
  ACT_YN_QUERY: 'yn-query',

  TYPE_ABBREVIATION: 'abbr:',
  TYPE_ENTITY: 'enty:',
  TYPE_DESCRIPTION: 'desc:',
  TYPE_HUMAN: 'hum:',
  TYPE_LOCATION: 'loc:',
  TYPE_NUMBER: 'num:',

  SENTIMENT_VERY_POSITIVE: 'vpositive',
  SENTIMENT_POSITIVE: 'positive',
  SENTIMENT_NEUTRAL: 'neutral',
  SENTIMENT_NEGATIVE: 'negative',
  SENTIMENT_VERY_NEGATIVE: 'vnegative'
};