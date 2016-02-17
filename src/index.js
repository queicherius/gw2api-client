require('babel-polyfill')

module.exports = () => new (require('./client.js'))()
