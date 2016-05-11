import * as request from 'superagent'
import { Response } from './response'
import { RecastError } from './error'

export class Client {

  constructor (token) {
    this.token = token
  }

  /*
    Performs a text request on Recast.AI API
    | Args |
      - text - String, the text to process
      - callback - Callback function, will be called with the result of the request
      - options - Optional Hash, request's options
    | Throw |
      - Error - On bad request
      - RecastError - On missing token
  */
  textRequest (text, callback, options) {
    const TOKEN = (options && options.token) ? options.token : this.token

    if (!TOKEN) {
      throw new RecastError('Token is missing')
    } else {
      request.post('https://api.recast.ai/v1/request')
        .set('Authorization', `Token ${TOKEN}`)
        .send({ text })
        .end((err, res) => {
          if (err) {
            throw new RecastError(res.message)
          } else {
            return callback(new Response(res.body))
          }
        })
    }
  }

  /*
    Performs a voice file request on Recast.AI API
    | Args |
      - file - File, the voice file to process
      - callback - Callback function, will be called with the result of the request
      - options - Optional Hash, request's options
    | Throw |
      - Error - On bad request
      - RecastError - On missing token
  */
  fileRequest (file, callback, options) {
    const TOKEN = (options && options.token) ? options.token : this.token

    if (!TOKEN) {
      throw new RecastError('Token is missing')
    } else {
      request.post('https://api.recast.ai/v1/request')
        .attach('voice', file)
        .set('Authorization', `Token ${TOKEN}`)
        .set('Content-Type', '')
        .end((err, res) => {
          if (err) {
            throw new RecastError(res.message)
          } else {
            return callback(new Response(res.body))
          }
        })
    }
  }
}
