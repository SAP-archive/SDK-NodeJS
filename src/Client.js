import apis from './apis'

export default class Client {

  constructor (token) {
    for (const name in apis) {
      this[name] = new apis[name](token)
    }
  }

}
