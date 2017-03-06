import superagent from 'superagent'
import superagentPromise from 'superagentPromise'

export default class Connect {
  
  constructor (token) {
    this.token = token
  }

  handleMessage = (req, res, onMessageReceived) => {
    // TODO extract the informations we need from the request
    // TODO send back a 200 to the BotConnector
    // TODO call onMessageReceived with the extracted informations
  }

  sendMessage = (messages, conversationId) => {
    return agent('POST', '//URL HERE')
      .set('Authorization', `Token ${this.token}`)
      .send(messages)
      .catch(err => new RecastError(err))
  }

  broadcast = (messages) => {
    return agent('POST', '//URL HERE')
      .set('Authorization', `Token ${this.token}`)
      .send({ messages })
      .catch(err => new RecastError(err))
  }
} 
