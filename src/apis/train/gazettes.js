export default class Gazettes {
  constructor (client) {
    this.client = client
  }

  list = async (params, opts) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/gazettes`, params, opts)

  getBySlug = async (slug, params, opts) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/logs/${slug}`, params, opts)

  deleteBySlug = async (slug, params, opts) => this.client.del(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/logs/${slug}`, params, opts)

  create = async (data, opts) => this.client.post(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/gazettes`, data, opts)

  update = async (data, opts) => this.client.put(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/gazettes`, data, opts)

  listSynonyms = async (slug, params, opts) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/gazettes/${slug}/synonyms`, params, opts)

  getSynonymBySlug = async (gazetteSlug, synonymSlug, params, opts) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/gazettes/${gazetteSlug}/synonyms/${synonymSlug}`, params, opts)

  createOneSynonym = async (slug, data, opts) => this.client.post(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/gazettes/${slug}/synonyms`, data, opts)

  createBulkSynonyms = async (slug, data, opts) => this.client.post(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/gazettes/${slug}/synonyms/bulk_create`, data, opts)

  updateSynonymBySlug = async (gazetteSlug, synonymSlug, data, opts) => this.client.put(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/gazettes/${gazetteSlug}/synonyms/${synonymSlug}`, data, opts)

  deleteSynonymBySlug = async (gazetteSlug, synonymSlug, params, opts) => this.client.del(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/gazettes/${gazetteSlug}/synonyms/${synonymSlug}`, params, opts)
}
