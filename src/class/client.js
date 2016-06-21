import request from 'superagent'
import { Response } from './response'
import { RecastError } from './error'

export class Client {

  constructor (token, language) {
    this.token = token
    this.language = language
  }

  /**
   * Perform a text request on Recast.AI
   * @param {String} text: the text to process
   * @param {Function} callback: the callback which be called with the Response of the request or a the RecastError
   * @param {Hash} options: [optional] request's options
   */
  textRequest (text, callback, options) {
    const TOKEN = options && options.token || this.token
    const LANGUAGE = (options && options.language) ? options.language : this.language
    const params = { text }

    if (LANGUAGE) {
      params.language = LANGUAGE
    }

    if (!TOKEN) {
      return callback(null, new RecastError('Token is missing'))
    } else {
      request.post('https://api.recast.ai/v1/request')
        .set('Authorization', `Token ${TOKEN}`)
        .send(params)
        .end((err, res) => {
          if (err) {
            return callback(res, new RecastError(err.message))
          } else {
            return callback(new Response(res.body), null)
          }
        })
    }
  }

  /**
   * Perform a voice file request on Recast.AI
   * @param {String} file: the name of the file to process
   * @param {Function} callback: the callback which be called with the Response of the request or with a RecastError
   * @param {Hash} options: [optional] request's options
   */
  fileRequest (file, callback, options) {
    const TOKEN = (options && options.token) ? options.token : this.token
    const LANGUAGE = (options && options.language) ? options.language : this.language
    const params = {}

    if (LANGUAGE) {
      params.language = LANGUAGE
    }

    if (!TOKEN) {
      return callback(null, new RecastError('Token is missing'))
    } else {
      const req = request.post('https://api.recast.ai/v1/request')
        .attach('voice', file)
        .set('Authorization', `Token ${TOKEN}`)
        .set('Content-Type', '')

      if (LANGUAGE) {
        req.send(params)
      }

      req.end((err, res) => {
        if (err) {
          return callback(res, new RecastError(err.message))
        } else {
          return callback(new Response(res.body))
        }
      })
    }
  }
}
