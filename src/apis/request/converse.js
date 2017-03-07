import superagent from 'superagent'
import superagentProxy from 'superagent-proxy'
import superagentPromise from 'superagent-promise'

import constants from '../constants'
import { Conversation, RecastError } from '../resources'

const agent = superagentPromise(superagentProxy(superagent), Promise)

export default class Converse {

  constructor (token, language) {
    this.token = token
    this.language = language
  }

  textConverse = async (text, options = {}) => {
    const token = options.token || this.token
    const proxy = options.proxy
    const data = {
      text,
      language: options.language || this.language,
      conversation_token: options.conversationToken,
      memory: options.memory,
    }
    if (!token) { throw new RecastError('Parameter token is missing') }

    try {
      const request = agent('POST', constants.CONVERSE_ENDPOINT)
        .set('Authorization', `Token ${this.token}`)
      if (proxy) { request.proxy(proxy) }

      const res = await request.send(data)
      return new Conversation({ ...res.body.results, recastToken: this.token })
    } catch (err) {
      throw new RecastError(err.message)
    }
  }

}
