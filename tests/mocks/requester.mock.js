let responses = []
let options = []
let urls = []

var mock = {
  addResponse: (response) => {
    responses.push(response)
  },
  reset: () => {
    urls = []
    responses = []
  },
  urls: () => {
    return urls
  },
  options: () => {
    return options
  },
  lastUrl: () => {
    return urls[urls.length - 1]
  },
  lastOptions: () => {
    return options[options.length - 1]
  },
  single: async (url, opt) => {
    urls.push(url)
    options.push(opt)
    return responses.shift()
  },
  many: async (urls, opt) => {
    let requests = []
    for (let i in urls) {
      requests = requests.concat(await mock.single(urls[i], opt))
    }
    return requests
  }
}

module.exports = mock
