export default class Bots {
  constructor (client) {
    this.client = client
  }

  get = async (params, opts) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}`, params, opts)

  update = async (data, opts) => this.client.put(`/users/${this.client.userSlug}/bots/${this.client.botSlug}`, data, opts)
}
