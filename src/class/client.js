import FormData from 'form-data'

import Response from './response'
import Conversation from './conversation'
import RecastError from './error'
import constants from '../constants'

const agent = require('superagent-promise')(require('superagent-proxy')(require('superagent')), Promise)

export default class Client {

  constructor (token, language) {
    this.token = token
    this.language = language
  }

  /**
   * Perform a text request on /converse Recast.AI API endpoint
   * @param {String} text: the text to process
   * @param {Object} options: [optional] request's options
   */
  textConverse (text, options) {
    const token = options && options.token || this.token
    const data = {
      text,
      language: options && options.language || this.language,
      conversation_token: options && options.conversationToken,
      memory: options && options.memory,
    }
    const proxy = options && options.proxy
    if (!token) { return Promise.reject('Token is missing') }

    const request = agent('POST', constants.CONVERSE_ENDPOINT)
      .set('Authorization', `Token ${token}`)
    if (proxy) { request.proxy(proxy) }

    return new Promise((resolve, reject) => {
      request.send(data)
        .then(res => resolve(new Conversation(res.body.results)))
        .catch(err => reject(new RecastError(err.message)))
    })
  }

  /**
   * Perform a text request on Recast.AI
   * @param {String} text: the text to process
   * @param {Object} options: [optional] request's options
   */
  textRequest (text, options) {
    const token = options && options.token || this.token
    const data = { text, language: options && options.language || this.language }
    const proxy = options && options.proxy
    if (!token) { return Promise.reject('Token is missing') }

    const request = agent('POST', constants.REQUEST_ENDPOINT)
      .set('Authorization', `Token ${token}`)
    if (proxy) { request.proxy(proxy) }

    return new Promise((resolve, reject) => {
      request.send(data)
      .then(res => resolve(new Response(res.body.results)))
      .catch(err => reject(new RecastError(err.message)))
    })
  }

  /**
   * Perform a voice file request on Recast.AI
   * @param {String} file: the name of the file to process
   * @param {Object} options: [optional] request's options
   */
  fileRequest (file, options) {
    const token = options && options.token || this.token
    const language = options && options.language || this.language
    const proxy = options && options.proxy
    if (!token) { return Promise.reject(new RecastError('Token is missing')) }

    const data = new FormData()
    data.append('voice', file)
    if (language) { data.append('language', language) }

    const request = agent('POST', constants.REQUEST_ENDPOINT)
      .set('Authorization', `Token ${token}`)
    if (proxy) { request.proxy(proxy) }

    return new Promise((resolve, reject) => {
      request.attach('voice', file).send()
        .then(res => resolve(new Response(res.body.results)))
        .catch(err => reject(new RecastError(err.message)))
    })
  }
}
