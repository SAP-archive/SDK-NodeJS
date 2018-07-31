import superagent from 'superagent'
import superagentProxy from 'superagent-proxy'
import superagentPromise from 'superagent-promise'

const agent = superagentPromise(superagentProxy(superagent), Promise)

import constants from '../constants'

export default class Build {

  constructor (token, language) {
    this.token = token
    this.language = language
  }

  dialog = (message, options = {}, memory = {}, log_level = 0) => {
    const token = options.token || this.token
    const proxy = options.proxy
    const data = {
      message,
      conversation_id: options.conversationId,
      language: options.language || this.language,
      memory: memory,
      log_level: log_level,
    }

    const request = agent('POST', `${constants.DIALOG_ENDPOINT}/dialog`)
      .set('Authorization', `Token ${token}`)
    if (proxy) { request.proxy(proxy) }
    return request.send(data).then(res => res.body.results)
  }

  getConversation = (user, bot, conversationId, options = {}) => {
    const token = options.token || this.token
    const proxy = options.proxy

    const request = agent('POST', `${constants.DIALOG_ENDPOINT}/dialog`)
      .set('Authorization', `Token ${token}`)
    if (proxy) { request.proxy(proxy) }
    return request.send()
  }

  updateConversation = (user, bot, conversationId, data = {}, options = {}) => {
    const token = options.token || this.token
    const proxy = options.proxy
    if (data.memory && data.memory.constructor !== Object) {
      return Promise.reject('Invalid memory parameter')
    }

    const request = agent('POST', `${constants.DIALOG_ENDPOINT}/dialog`)
      .set('Authorization', `Token ${token}`)
    if (proxy) { request.proxy(proxy) }
    return request.send(data)
  }

  deleteConversation = (user, bot, conversationId, options = {}) => {
    const token = options.token || this.token
    const proxy = options.proxy

    const request = agent('POST', `${constants.DIALOG_ENDPOINT}/dialog`)
      .set('Authorization', `Token ${token}`)
    if (proxy) { request.proxy(proxy) }
    return request.send()
  }

}
