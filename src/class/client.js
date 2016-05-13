import request from 'superagent'
import { Response } from './response'
import { RecastError } from './error'

export class Client {

  constructor (token) {
    this.token = token
  }

  /**
   * Perform a text request on Recast.AI
   * @param {String} text: the text to process
   * @param {Function} callback: the callback which be called with the Response of the request or a the RecastError
   * @param {Hash} options: [optional] request's options
   */
  textRequest (text, callback, options) {
    const TOKEN = (options && options.token) ? options.token : this.token

    if (!TOKEN) {
      return callback(null, new RecastError('Token is missing'))
    } else {
      request.post('https://api.recast.ai/v1/request')
        .set('Authorization', `Token ${TOKEN}`)
        .send({ text })
        .end((err, res) => {
          if (err) {
            return callback(null, new RecastError(err.message))
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

    if (!TOKEN) {
      return callback(null, new RecastError('Token is missing'))
    } else {
      request.post('https://api.recast.ai/v1/request')
        .attach('voice', file)
        .set('Authorization', `Token ${TOKEN}`)
        .set('Content-Type', '')
        .end((err, res) => {
          if (err) {
            return callback(null, new RecastError(err.message))
          } else {
            return callback(new Response(res.body))
          }
        })
    }
  }
}
