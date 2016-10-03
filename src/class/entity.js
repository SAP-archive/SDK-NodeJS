import { forEach } from 'lodash'

export default class Entity {
  constructor (name, data) {
    this.name = name
    this.raw = data
    forEach(data, (value, key) => this[key] = value)
  }
}
