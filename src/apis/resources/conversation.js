import { forEach } from 'lodash'
import superagent from 'superagent'
import superagentProxy from 'superagent-proxy'
import superagentPromise from 'superagent-promise'

import constants from '../constants'
import RecastError from './recastError'
import Entity from './entity'

const agent = superagentPromise(superagentProxy(superagent), Promise)

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
  setMemory = async (memory) => {
    try {
      let res = await agent('PUT', constants.CONVERSE_ENDPOINT)
        .set('Authorization', `Token ${this.recastToken}`)
        .send({ memory, conversationToken: this.conversationToken })
      // TODO merge the new memory
      return res.body.results
    } catch (err) {
      throw new RecastError(err.message)
    }
    
  }

  /**
   * Reset the memory of the conversation
   * @returns {object}: the updated memory
   */
  resetMemory = async (alias) => {
    try {
      const data = { conversation_token: this.conversationToken, memory: {} }
      if (alias) { data.memory[alias] = null }

      let res = agent('PUT', constants.CONVERSE_ENDPOINT)
        .set('Authorization', `Token ${this.recastToken}`)
        .send(data)
      // TODO reset memory
      return res.body.results
    } catch (err) {
      throw new RecastError(err.message)
    }
  }

  /**
   * Reset the conversation
   * @returns {object}: the updated memory
   */
  resetConversation = async () => {
    try {
      let res = agent('DELETE', constants,CONVERSE_ENDPOINT)
        .set('Authorization', `Token ${this.recastToken}`)
        .send({ conversation_token: this.conversationToken })
      // TODO reset the entire conversation
    } catch (err) {
      throw new RecastError(err.message)
    }
  }
}
