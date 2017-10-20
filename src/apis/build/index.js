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

  dialog = (message, options = {}) => {
    const token = options.token || this.token
    const data = {
      message,
      conversation_id: options.conversationId,
      language: options.language || this.language,
    }

    return agent('POST', `${constants.DIALOG_ENDPOINT}/dialog`)
      .set('Authorization', `Token ${token}`)
      .send(data)
      .then(res => res.body.results)
  }

  getConversation = (user, bot, conversationId, options = {}) => {
    const token = options.token || this.token
    return agent('GET', `${constants.DIALOG_ENDPOINT}/users/${user}/bots/${bot}/builders/v1/conversation_states/${conversationId}`)
      .set('Authorization', `Token ${token}`)
      .send()
  }

  updateConversation = (user, bot, conversationId, data = {}, options = {}) => {
    const token = options.token || this.token
    if (data.memory && data.memory.constructor !== Object) {
      return Promise.reject('Invalid memory parameter')
    }

    return agent('PUT', `${constants.DIALOG_ENDPOINT}/users/${user}/bots/${bot}/builders/v1/conversation_states/${conversationId}`)
      .set('Authorization', `Token ${token}`)
      .send(data)
  }

  deleteConversation = (user, bot, conversationId, options = {}) => {
    const token = options.token || this.token
    return agent('DELETE', `${constants.DIALOG_ENDPOINT}/users/${user}/bots/${bot}/builders/v1/conversation_states/${conversationId}`)
      .set('Authorization', `Token ${token}`)
      .send()
  }

}
