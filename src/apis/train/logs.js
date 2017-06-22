export default class Logs {
  constructor (client) {
    this.client = client
  }

  list = async () => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/logs`)

  getById = async (id) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/logs/${id}`)

  deleteById = async (id) => this.client.del(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/logs/${id}`)

  deleteBulk = async (data) => this.client.post(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/logs/bulk_destroy`, data)

  archiveBulk = async (data) => this.client.put(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/logs/bulk_archive`, data)
}
