const emotionHash = require('@emotion/hash')

let cache = {}

function hash (string) {
  if (!cache[string]) {
    cache[string] = emotionHash(string)
  }

  return cache[string]
}

module.exports = hash
