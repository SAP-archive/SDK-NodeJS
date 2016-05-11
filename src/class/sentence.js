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
}
