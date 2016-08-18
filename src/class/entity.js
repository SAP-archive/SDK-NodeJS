import { forEach } from 'lodash'

export default class Entity {
  constructor (name, data) {
    this.name = name
    forEach(data, (value, key) => this[key] = value)
  }
}
