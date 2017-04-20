import superagent from 'superagent'
import superagentProxy from 'superagent-proxy'
import superagentPromise from 'superagent-promise'

import constants from '../constants'

const agent = superagentPromise(superagentProxy(superagent), Promise)

export default class Conversation {

  constructor ({ conversation_token, next_actions, ...response }) {
    for (const key in response) {
      this[key] = response[key]
    }

    this.nextActions = next_actions
    this.conversationToken = conversation_token
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
   * Returns the first Entity whose name matches the parameter
   * @param {String} name: the entity's name
   * @returns {Entity}: returns the first entity that matches - name -
   */
  get = name => this.entities[name] && this.entities[name][0] || null

  /**
   * Returns all the entities whose name matches the parameter
   * @param {String} name: the entity's name
   * @returns {Array}: returns an array of Entity
   */
  all = name => this.entities[name] || null

  /**
   * SENTIMENT HELPERS
   * Returns whether or not the response sentiment corresponds to the checked one
   * @returns {boolean}: true or false
   */
  isVPositive = () => this.sentiment === constants.SENTIMENT_VERY_POSITIVE

  isPositive = () => this.sentiment === constants.SENTIMENT_POSITIVE

  isNeutral = () => this.sentiment === constants.SENTIMENT_NEUTRAL

  isNegative = () => this.sentiment === constants.SENTIMENT_NEGATIVE

  isVNegative = () => this.sentiment === constants.SENTIMENT_VERY_NEGATIVE

  /**
   * Merge the conversation memory with the one in parameter
   * Returns the memory updated
   * @returns {object}: the memory updated
   */
  setMemory = async (memory) => {
    const res = await agent('PUT', constants.CONVERSE_ENDPOINT)
      .set('Authorization', `Token ${this.recastToken}`)
      .send({ memory, conversation_token: this.conversationToken })

    this.memory = { ...this.memory, ...memory }
    return res.body.results
  }

  /**
   * Reset the memory of the conversation
   * @returns {object}: the updated memory
   */
  resetMemory = async (alias) => {
    const data = { conversation_token: this.conversationToken, memory: {} }
    if (alias) { data.memory[alias] = null }

    const res = await agent('PUT', constants.CONVERSE_ENDPOINT)
      .set('Authorization', `Token ${this.recastToken}`)
      .send(data)

    this.memory = { ...this.memory, ...data.memory }
    return res.body.results
  }

  /**
   * Reset the conversation
   * @returns {object}: the updated memory
   */
  resetConversation = async () => {
    const res = await agent('DELETE', constants.CONVERSE_ENDPOINT)
      .set('Authorization', `Token ${this.recastToken}`)
      .send({ conversation_token: this.conversationToken })

    this.intents = []
    this.replies = []
    this.nextActions = []
    this.entities = []
    this.action = null
    for (const key in this.memory) {
      this.memory[key] = null
    }

    return res.body.results
  }
}
