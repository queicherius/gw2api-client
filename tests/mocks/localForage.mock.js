import localStorage from 'localstorage-memory'

export default {
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
  keys: () => {
    let keys = []

    for (var i = 0; i !== localStorage.length; i++) {
      keys.push(localStorage.key(i))
    }

    return Promise.resolve(keys)
  },
  clear: () => Promise.resolve(localStorage.clear())
}
