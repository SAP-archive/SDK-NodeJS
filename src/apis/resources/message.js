import superagent from 'superagent'
import superagentProxy from 'superagent-proxy'
import superagentPromise from 'superagent-promise'

import constants from '../constants'

const agent = superagentPromise(superagentProxy(superagent), Promise)

export default class Message {

  constructor (body, recastToken) {
    for (const key in body) {
      this[key] = body[key]
    }

    this.content = body.message.attachment.content
    this.type = body.message.attachment.type
    this.conversationId = body.message.conversation
    this.recastToken = recastToken
    this._messageStack = []
  }

  addReply = (replies) => this._messageStack = this._messageStack.concat(replies)

  reply = (replies = []) => {
    const messages = this._messageStack

    if (replies instanceof Array) {
      messages.push(...replies)
    } else {
      messages.push(replies)
    }
    this._messageStack = []
    return agent('POST', constants.MESSAGE_ENDPOINT.replace(':conversation_id', this.conversationId))
      .set('Authorization', `Token ${this.recastToken}`)
      .send({ messages })
  }

}
