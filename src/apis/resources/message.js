import superagent from 'superagent'
import superagentPromise from 'superagent-promise'

const agent = superagentPromise(superagent, Promise)

export default class Message {

  constructor (token) {
    this.messageStack = []
    this.token = token
  }

  addReply = (replies) => this.messageStack.concat(replies)

  reply = (replies = []) => {
    return agent('POST', '//URL HERE')
      .set('Authorization', `Token ${this.token}`)
      .send({ messages: [...this.messageStack, ...replies] })
      .catch(err => new RecastError(err))
  }

}
