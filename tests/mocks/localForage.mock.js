import localStorage from 'localstorage-memory'

export default {
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
  key: (index) => Promise.resolve(localStorage.key(index)),
  length: () => Promise.resolve(localStorage.length),
  keys: () => {
    let keys = []
    for (let i = 0; i !== localStorage.length; i++) {
      keys.push(localStorage.key(i))
    }

    return Promise.resolve(keys)
  },
  clear: () => Promise.resolve(localStorage.clear())
}
