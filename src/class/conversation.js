import { forEach } from 'lodash'

import constants from '../constants'
import RecastError from './error'
import Entity from './entity'

const agent = require('superagent-promise')(require('superagent-proxy')(require('superagent')), Promise)

export default class Conversation {

  constructor (response) {
    this.raw = response
    this.uuid = response.uuid
    this.source = response.source
    this.replies = response.replies
    this.action = response.action
    this.nextActions = response.next_actions
    this.memory = response.memory

    this.entities = []
    forEach(response.entities, (value, key) => {
      value.forEach(entity => this.entities.push(new Entity(key, entity)))
    })

    this.intents = response.intents
    this.conversationToken = response.conversation_token
    this.language = response.language
    this.timestamp = response.timestamp
    this.status = response.status
  }

  /**
   * Returns the first reply if there is one
   * @returns {String}: this first reply or null
   */
  reply = () => this.replies[0] || null

  /**
   * Returns the first next action if there is one
   * @returns {String}: this first reply or null
   */
  nextAction = () => this.nextActions[0] || null

  /**
   * Returns a concatenation of the replies
   * @returns {String}: the concatenation of the replies
   */
  joinedReplies = (sep = ' ') => this.replies.join(sep)

  /**
   * Returns the memory matching the alias
   * or all the memory if no alias provided
   * @returns {object}: the memory
   */
  getMemory = alias => alias ? this.memory[alias] : this.memory

  /**
   * Merge the conversation memory with the one in parameter
   * Returns the memory updated
   * @returns {object}: the memory updated
   */
  static setMemory (token, conversationToken, memory) {
    return new Promise((resolve, reject) => {
      agent('PUT', constants.CONVERSE_ENDPOINT)
        .set('Authorization', `Token ${token}`)
        .send({ conversation_token: conversationToken, memory })
        .then(res => resolve(res.body.results))
        .catch(err => reject(new RecastError(err.message)))
    })
  }

  /**
   * Reset the memory of the conversation
   * @returns {object}: the updated memory
   */
  static resetMemory (token, conversationToken, alias) {
    const data = { conversation_token: conversationToken }
    if (alias) { data.memory = { alias: null } }

    return new Promise((resolve, reject) => {
      agent('PUT', constants.CONVERSE_ENDPOINT)
        .set('Authorization', `Token ${token}`)
        .send(data)
        .then(res => resolve(res.body.results))
        .catch(err => reject(new RecastError(err.message)))
    })
  }

  /**
   * Reset the conversation
   * @returns {object}: the updated memory
   */
  static resetConversation (token, conversationToken) {
    return new Promise((resolve, reject) => {
      agent('DELETE', constants.CONVERSE_ENDPOINT)
        .set('Authorization', `Token ${token}`)
        .send({ conversation_token: conversationToken })
        .then(res => resolve(res.body.results))
        .catch(err => reject(new RecastError(err.message)))
    })
  }
}
