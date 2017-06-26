export default class Entities {
  constructor (client) {
    this.client = client
  }

  list = async (params, opts) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/entities`, params, opts)

  listPublic = async (params, opts) => this.client.get('/entities', params, opts)

  create = async (data, opts) => this.client.post('/entities', data, opts)
}
