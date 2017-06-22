export default class Intents {
  constructor (client) {
    this.client = client
  }

  list = async () => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents`)

  getBySlug = async (slug) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents/${slug}`)

  deleteBySlug = async (slug) => this.client.del(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents/${slug}`)

  getEntities = async (slug) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents/${slug}/entities`)

  getExpressions = async (slug) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents/${slug}/expressions`)

  getExpressionById = async (slug, id) => this.client.get(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents/${slug}/expressions/${id}`)

  deleteExpressionById = async (slug, id) => this.client.del(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents/${slug}/expressions/${id}`)

  createOneExpression = async (slug, data) => this.client.post(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents/${slug}/expressions`, data)

  createBulkExpressions = async (slug, data) => this.client.post(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents/${slug}/expressions/bulk_create`, data)

  updateExpressionById = async (slug, id, data) => this.client.put(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents/${slug}/expressions/${id}`, data)

  create = async (data) => this.client.post(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents`, data)

  update = async (data) => this.client.put(`/users/${this.client.userSlug}/bots/${this.client.botSlug}/intents`, data)
}
