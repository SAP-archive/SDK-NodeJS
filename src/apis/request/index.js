import Request from './request'
import Converse from './converse'

export default class RequestAPI {

  constructor (token) {
    this.request = new Request(token)
    this.converse = new Converse(token)
  }

}
