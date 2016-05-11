import { forEach } from 'lodash'

export class Entity {
  constructor (name, data) {
    this.name = name
    this.raw = data
    forEach(data, (value, key) => this[key] = value)
  }
}
