import { Entity } from './entity'
import { forEach } from 'lodash'

export class Sentence {

  constructor (sentence) {
    this.source = sentence.source
    this.type = sentence.type
    this.action = sentence.action
    this.agent = sentence.agent
    this.polarity = sentence.polarity
    this.entities = []
    forEach(sentence.entities, (value, key) => {
      value.forEach(entity => this.entities.push(new Entity(key, entity)))
    })
  }

  /**
   * Returns the first Entity whose name matches the parameter
   * @param {String} name: the entity's name
   * @returns {Entity}: returns the first entity that matches - name -
   */
  get (name) {
    let result

    this.entities.forEach(entity => {
      if (entity.name === name && !result) {
        result = entity
      }
    })
    return result
  }

  /**
   * Returns all the entities whose name matches the parameter
   * @param {String} name: the entity's name
   * @returns {Array}: returns an array of Entity, or null
   */
  all (name) {
    const array = []

    this.entities.forEach(entity => {
      if (entity.name === name) {
        array.push(entity)
      }
    })
    return array
  }
}
