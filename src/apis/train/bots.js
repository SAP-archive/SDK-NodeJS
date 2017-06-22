export default class Bots {
  constructor (client) {
    this.client = client
  }

  get = async () => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}`)

  update = async (data) => this.client.put(`/users/${this.client.userSlug}/bots/${this.client.botSlug}`, data)
}
