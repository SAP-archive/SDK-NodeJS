import axios from 'axios'
import FormData from 'form-data'

import Response from './response'
import Conversation from './conversation'
import RecastError from './error'
import constants from '../constants'

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

    const request = {
      method: 'post',
      url: constants.CONVERSE_ENDPOINT,
      headers: { Authorization: `Token ${token}` },
      data,
    }
    if (proxy) { request.proxy = proxy }

    return new Promise((resolve, reject) => {
      axios(request)
        .then(res => resolve(new Conversation(res.data.results)))
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

    const request = {
      method: 'post',
      url: constants.REQUEST_ENDPOINT,
      headers: { Authorization: `Token ${token}` },
      data,
    }
    if (proxy) { request.proxy = proxy }

    return new Promise((resolve, reject) => {
      axios(request)
        .then(res => resolve(new Response(res.data.results)))
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

    const request = {
      method: 'post',
      url: constants.REQUEST_ENDPOINT,
      headers: { Authorization: `Token ${token}` },
      data,
    }
    if (proxy) { request.proxy = proxy }

    return new Promise((resolve, reject) => {
      axios(request)
        .then(res => resolve(new Response(res.data.results)))
        .catch(err => reject(new RecastError(err.message)))
    })
  }
}
