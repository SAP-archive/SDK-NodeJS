import FormData from 'form-data'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'

const agent = superagentPromise(superagent, Promise)

export default class Request {
  
  constructor (token, language) {
    this.token = token
    this.language = language
  }

  textRequest = async (text, options = {}) => {
    const token = options.token || this.token
    const proxy = options.proxy
    const data = { text, language: options.language || this.language }
    if (!token) { throw new RecastError('Parameter token is missing') }

    try {
      let request = agent('POST', constants.REQUEST_ENDPOINT)
        .set('Authorization', `Token ${this.token}`)
      if (proxy) { request.proxy(proxy) }

      let res = await request.send(data)
      return new Response(res.body.results)
    } catch (err) {
      throw new RecastError(err.message)
    }
  }

  fileRequest = async (file, options = {}) => {
    const token = options.token || this.token
    const proxy = options.token
    const language = options.language || this.language
    if (!token) { throw new RecastError('Parameter token is missing') }

    try {
      let request = agent('POST', constants.REQUEST_ENDPOINT)
        .set('Authorization', `Token ${this.token}`)
      if (proxy) { request.proxy(proxy) }

      let res = await request.attach('voice', file).send()
      return new Response(res.body.results)
    } catch (err) {
      throw new RecastError(err.message)
    }
  }
}


