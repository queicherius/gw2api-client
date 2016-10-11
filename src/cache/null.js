export default {
  get: (key) => promisify(false),
  set: (key, value) => promisify(false),
  mget: (keys) => promisify([]),
  mset: (array) => false
}

function promisify (value) {
  return new Promise(resolve => resolve(value))
}
