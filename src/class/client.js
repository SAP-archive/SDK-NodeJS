import request from 'superagent'
require('superagent-proxy')(request)

import Response from './response'
import RecastError from './error'
import constants from '../constants'

export default class Client {

  constructor (token, language) {
    this.token = token
    this.language = language
  }

  /**
   * Perform a text request on Recast.AI
   * @param {String} text: the text to process
   * @param {Function} callback: the callback which be called with the Response of the request or a the RecastError
   * @param {Object} options: [optional] request's options
   */
  textRequest (text, callback, options) {
    const TOKEN = options && options.token || this.token
    const LANGUAGE = options && options.language || this.language
    const PROXY = options && options.proxy
    const params = { text }

    if (LANGUAGE) { params.language = LANGUAGE }

    if (!TOKEN) {
      return callback(new RecastError('Token is missing'), null)
    } else {
      const req = request.post(constants.API_ENDPOINT)
        .set('Authorization', `Token ${TOKEN}`)

      if (PROXY) { req.proxy(PROXY) }

      req.send(params)
        .end((err, res) => {
          if (err) {
            return callback(new RecastError(err.message), err)
          } else {
            return callback(null, new Response(res.body))
          }
        })
    }
  }

  /**
   * Perform a voice file request on Recast.AI
   * @param {String} file: the name of the file to process
   * @param {Function} callback: the callback which be called with the Response of the request or with a RecastError
   * @param {Object} options: [optional] request's options
   */
  fileRequest (file, callback, options) {
    const TOKEN = options && options.token || this.token
    const LANGUAGE = options && options.language || this.language
    const PROXY = options && options.proxy
    const params = {}

    if (LANGUAGE) { params.language = LANGUAGE }

    if (!TOKEN) {
      return callback(new RecastError('Token is missing'), null)
    } else {
      const req = request.post(constants.API_ENDPOINT)
        .attach('voice', file)
        .set('Authorization', `Token ${TOKEN}`)
        .set('Content-Type', '')

      if (PROXY) { req.proxy(PROXY) }
      if (LANGUAGE) { req.send(params) }

      req.end((err, res) => {
        if (err) {
          return callback(new RecastError(err.message), err)
        } else {
          return callback(null, new Response(res.body))
        }
      })
    }
  }
}
