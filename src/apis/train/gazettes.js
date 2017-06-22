export default class Gazettes {
  constructor (client) {
    this.client = client
  }

  list = async () => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/gazettes`)

  getBySlug = async (slug) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/logs/${slug}`)

  deleteBySlug = async (slug) => this.client.del(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/logs/${slug}`)

  create = async (data) => this.client.post(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/gazettes`, data)

  update = async (data) => this.client.put(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/gazettes`, data)

  listSynonyms = async (slug) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/gazettes/${slug}/synonyms`)

  getSynonymBySlug = async (gazetteSlug, synonymSlug) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/gazettes/${gazetteSlug}/synonyms/${synonymSlug}`)

  createOneSynonym = async (slug, data) => this.client.post(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/gazettes/${slug}/synonyms/`, data)

  createBulkSynonyms = async (slug, data) => this.client.post(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/gazettes/${slug}/synonyms/bulk_create`, data)

  updateSynonymBySlug = async (gazetteSlug, synonymSlug, data) => this.client.put(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/gazettes/${gazetteSlug}/synonyms/${synonymSlug}`, data)

  deleteSynonymBySlug = async (gazetteSlug, synonymSlug) => this.client.del(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/gazettes/${gazetteSlug}/synonyms/${synonymSlug}`)
}
