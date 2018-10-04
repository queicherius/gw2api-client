const emotionHash = require('@emotion/hash/dist/hash.cjs.js')

let cache = {}

function hash (string) {
  if (!cache[string]) {
    cache[string] = emotionHash(string)
  }

  return cache[string]
}

module.exports = hash
