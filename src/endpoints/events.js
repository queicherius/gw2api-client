import AbstractEndpoint from '../endpoint'

export default class EventsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v1/event_details.json'
  }

  async all () {
    return transformV1Format(await this.request(this.url))
  }

  async get (id) {
    return transformV1Format(await this.request(`${this.url}?event_id=${id}`))[0]
  }
}

function transformV1Format (json) {
  let events = json.events
  let transformed = []

  for (let id in events) {
    transformed.push({
      id: id,
      ...events[id]
    })
  }

  return transformed
}
