const emotionHash = require('@emotion/hash/dist/hash.browser.cjs.js').default

const cache: {[key: string]: string} = {}

export function hash (string: string): string {
  if (!cache[string]) {
    cache[string] = emotionHash(string)
  }

  return cache[string]
}
