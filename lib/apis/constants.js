'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  REQUEST_ENDPOINT: 'https://api.cai.tools.sap/v2/request',
  CONVERSE_ENDPOINT: 'https://api.cai.tools.sap/v2/converse',
  DIALOG_ENDPOINT: 'https://api.cai.tools.sap/build/v1',
  CONVERSATION_ENDPOINT: 'https://api.cai.tools.sap/connect/v1/messages',
  MESSAGE_ENDPOINT: 'https://api.cai.tools.sap/connect/v1/conversations/:conversation_id/messages',
  TRAIN_ENDPOINT: 'https://api.cai.tools.sap/train/v2',

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