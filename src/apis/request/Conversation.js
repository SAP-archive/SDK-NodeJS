import superagent from 'superagent'
import superagentPromise from 'superagent-promise'

export default class Conversation {

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
      let request = agent('POST', constants.CONVERSE_ENDPOINT)
        .set('Authorization', `Token ${this.token}`)
      if (proxy) { request.proxy(proxy) }

      let res = await request.send(data)
      return new Converse(res.body.results)
    } catch (err) {
      throw new RecastError(err.message)
    }
  }

}
