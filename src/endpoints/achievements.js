const AbstractEndpoint = require('../endpoint')

module.exports = class AchievementsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/achievements'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = false
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }

  categories () {
    return new CategoriesEndpoint(this)
  }

  groups () {
    return new GroupsEndpoint(this)
  }

  daily () {
    return new DailyEndpoint(this)
  }

  dailyTomorrow () {
    return new DailyTomorrowEndpoint(this)
  }
}

class CategoriesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/achievements/categories'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

class GroupsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/achievements/groups'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

class DailyEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/achievements/daily'
    this.cacheTime = 60 * 60
  }
}

class DailyTomorrowEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/achievements/daily/tomorrow'
    this.cacheTime = 60 * 60
  }
}
