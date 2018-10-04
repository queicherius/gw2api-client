const Client = require('./client')

// Each time the api wrapper is called, we give back a new instance
module.exports = function () {
  return new Client()
}
