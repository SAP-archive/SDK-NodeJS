import apis from './apis'

export default class Client {

  constructor (token, language, userSlug, botSlug) {
    this.connect = new apis.connect(token, language)
    this.request = new apis.request(token, language)
    this.build = new apis.build(token, language)

    if (userSlug && botSlug) {
      this.train = new apis.train(token, language, userSlug, botSlug)
    }
  }

  static connect = apis.connect

  static request = apis.request

  static train = apis.train

  static build = apis.build

}
