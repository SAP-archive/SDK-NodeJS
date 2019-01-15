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

  dialog = (message, options = {}, memory = null, log_level = 'info') => {
    const token = options.token || this.token
    const proxy = options.proxy
    const data = {
      message,
      conversation_id: options.conversationId,
      language: options.language || this.language,
      log_level: log_level,
    }
		if (memory)
			data['memory'] = memory

    const request = agent('POST', `${constants.DIALOG_ENDPOINT}/dialog`)
      .set('Authorization', `Token ${token}`)
    if (proxy) { request.proxy(proxy) }
    return request.send(data).then(res => res.body.results)
  }

  getConversation = (user, bot, version, conversationId, options = {}) => {
    const token = options.token || this.token
    const proxy = options.proxy

    const request = agent('GET', `${constants.DIALOG_ENDPOINT}/users/${user}/bots/${bot}/versions/${version}/builder/conversation_states/${conversationId}`)
      .set('Authorization', `Token ${token}`)
    if (proxy) { request.proxy(proxy) }
    return request.send()
  }

  updateConversation = (user, bot, version, conversationId, data = {}, options = {}) => {
    const token = options.token || this.token
    const proxy = options.proxy
    if (data.memory && data.memory.constructor !== Object) {
      return Promise.reject('Invalid memory parameter')
    }

    const request = agent('PUT', `${constants.DIALOG_ENDPOINT}/users/${user}/bots/${bot}/versions/${version}/builder/conversation_states/${conversationId}`)
      .set('Authorization', `Token ${token}`)
    if (proxy) { request.proxy(proxy) }
    return request.send(data)
  }

  deleteConversation = (user, bot, version, conversationId, options = {}) => {
    const token = options.token || this.token
    const proxy = options.proxy

    const request = agent('DELETE', `${constants.DIALOG_ENDPOINT}/users/${user}/bots/${bot}/versions/${version}/builder/conversation_states/${conversationId}`)
      .set('Authorization', `Token ${token}`)
    if (proxy) { request.proxy(proxy) }
    return request.send()
  }

}
