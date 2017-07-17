import superagent from 'superagent'
import superagentProxy from 'superagent-proxy'
import superagentPromise from 'superagent-promise'

const agent = superagentPromise(superagentProxy(superagent), Promise)

import constants from '../constants'
import { Message } from '../resources'

export default class Connect {

  constructor (token) {
    this.token = token
  }

  handleMessage = (req, res, onMessageReceived) => {
    if (typeof res.status === 'function') {
      res.status(200).send()
    } else {
      res.status = 200
    }

    return onMessageReceived(new Message(req.body, this.token))
  }

  sendMessage = (messages, conversationId) => {
    return agent('POST', constants.MESSAGE_ENDPOINT.replace(':conversation_id', conversationId))
      .set('Authorization', `Token ${this.token}`)
      .send({ messages })
  }

  broadcastMessage = (messages) => {
    return agent('POST', constants.CONVERSATION_ENDPOINT)
      .set('Authorization', `Token ${this.token}`)
      .send({ messages })
  }

  activateFallback = (conversationId) => {
    return agent('POST', `${constants.CONNECT_ENDPOINT}/conversations/${conversationId}/fallback/activate`)
      .set('Authorization', `Token ${this.token}`)
      .send()
  }

  deactivateFallback = (conversationId) => {
    return agent('POST', `${constants.CONNECT_ENDPOINT}/conversations/${conversationId}/fallback/deactivate`)
      .set('Authorization', `Token ${this.token}`)
      .send()
  }

}
