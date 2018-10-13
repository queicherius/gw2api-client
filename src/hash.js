const emotionHash = require('@emotion/hash/dist/hash.browser.cjs.js').default

let cache = {}

function hash (string) {
  if (!cache[string]) {
    cache[string] = emotionHash(string)
  }

  return cache[string]
}

module.exports = hash
