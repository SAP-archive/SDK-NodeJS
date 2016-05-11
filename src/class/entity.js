import { forEach } from 'lodash'

export class Entity {
  constructor (name, data) {
    this.name = name
    forEach(data, (value, key) => this[key] = value)
  }
}
