import Client from './client'

// Each time the api wrapper is called, we give back a new instance
export default function () {
  return new Client()
}
