import { forEach } from 'lodash'

import Entity from './entity'
import constants from '../constants.js'

export default class Response {

  constructor (response) {
    this.raw = response
    this.uuid = response.uuid

    this.source = response.source
    this.intents = response.intents
    this.act = response.act
    this.type = response.type
    this.sentiment = response.sentiment

    this.entities = []
    forEach(response.entities, (value, key) => {
      value.forEach(entity => this.entities.push(new Entity(key, entity)))
    })

    this.language = response.language
    this.version = response.version
    this.status = response.status
    this.timestamp = response.timestamp
  }

  /**
   * Returns the first Entity whose name matches the parameter
   * @param {String} name: the entity's name
   * @returns {Entity}: returns the first entity that matches - name -
   */
  get = name => this.entities.find(entity => entity.name === name)

  /**
   * Returns all the entities whose name matches the parameter
   * @param {String} name: the entity's name
   * @returns {Array}: returns an array of Entity
   */
  all = name => this.entities.filter(entity => entity.name === name)

  /**
   * Returns the first Intent if there is one
   * @returns {Intent}: thie first Intent or null
   */
  intent = () => this.intents[0] || null

  /**
   * ACT HELPERS
   * Returns whether or not the response act corresponds to the checked one
   * @returns {boolean}: true or false
   */
  isAssert = () => this.act === constants.ACT_ASSERT

  isCommand = () => this.act === constants.ACT_COMMAND

  isWhQuery = () => this.act === constants.ACT_WH_QUERY

  isYnQuery = () => this.act === constants.ACT_YN_QUERY

  /**
   * TYPE HELPERS
   * Returns whether or not the response type corresponds to the checked one
   * @returns {boolean}: true or false
   */
  isAbbreviation = () => this.type.indexOf(constants.TYPE_ABBREVIATION) !== -1

  isEntity = () => this.type.indexOf(constants.TYPE_ENTITY) !== -1

  isDescription = () => this.type.indexOf(constants.TYPE_DESCRIPTION) !== -1

  isHuman = () => this.type.indexOf(constants.TYPE_HUMAN) !== -1

  isLocation = () => this.type.indexOf(constants.TYPE_LOCATION) !== -1

  isNumber = () => this.type.indexOf(constants.TYPE_NUMBER) !== -1

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

}
