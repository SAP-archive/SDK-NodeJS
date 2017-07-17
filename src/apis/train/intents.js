export default class Intents {
  constructor (client) {
    this.client = client
  }

  list = async (params, opts) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents`, params, opts)

  getBySlug = async (slug, params, opts) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents/${slug}`, params, opts)

  deleteBySlug = async (slug, params, opts) => this.client.del(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents/${slug}`, params, opts)

  getEntities = async (slug, params, opts) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents/${slug}/entities`, params, opts)

  getExpressions = async (slug, params, opts) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents/${slug}/expressions`, params, opts)

  getExpressionById = async (slug, id, params, opts) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents/${slug}/expressions/${id}`, params, opts)

  deleteExpressionById = async (slug, id, params, opts) => this.client.del(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents/${slug}/expressions/${id}`, params, opts)

  createOneExpression = async (slug, data, opts) => this.client.post(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents/${slug}/expressions`, data, opts)

  createBulkExpressions = async (slug, data, opts) => this.client.post(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents/${slug}/expressions/bulk_create`, data, opts)

  updateExpressionById = async (slug, id, data, opts) => this.client.put(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents/${slug}/expressions/${id}`, data, opts)

  create = async (data, opts) => this.client.post(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents`, data, opts)

  update = async (data, opts) => this.client.put(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents`, data, opts)
}
