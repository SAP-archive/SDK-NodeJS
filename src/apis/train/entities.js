export default class Entities {
  constructor (client) {
    this.client = client
  }

  list = async () => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/entities`)

  listPublic = async () => this.client.get('/entities')

  create = async (data) => this.client.post('/entities', data)
}
