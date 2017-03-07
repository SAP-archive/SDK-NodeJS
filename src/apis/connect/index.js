import Connect from './connect'

export default class ConnectAPI {

  constructor (token) {
    this.connect = new Connect(token)
  }

}
