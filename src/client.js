import apis from './apis'

export default class Client {

  constructor (token, language) {
    for (const name in apis) {
      this[name] = new apis[name](token, language)
    }
  }

  static connect = apis.connect

  static request = apis.request

}
