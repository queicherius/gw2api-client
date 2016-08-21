const AbstractEndpoint = require('../endpoint.js')

class AchievementsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/achievements'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = false
    this.isLocalized = true
  }

  categories () {
    return new CategoriesEndpoint(this.client)
  }

  groups () {
    return new GroupsEndpoint(this.client)
  }

  daily () {
    return new DailyEndpoint(this.client)
  }

  dailyTomorrow () {
    return new DailyTomorrowEndpoint(this.client)
  }
}

class CategoriesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/achievements/categories'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

class GroupsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/achievements/groups'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
  }
}

class DailyEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/achievements/daily'
  }
}

class DailyTomorrowEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/achievements/daily/tomorrow'
  }
}

module.exports = AchievementsEndpoint
