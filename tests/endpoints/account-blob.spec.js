/* eslint-env jest */
const endpoint = require('../../src/endpoints/account-blob')

function mockClient (hasGuildPermission) {
  return {
    account: () => ({
      get: () => _s({
        name: 'lol.1234',
        guilds: ['key-1234', 'key-5678'],
        guild_leader: hasGuildPermission ? ['key-1234'] : undefined
      }),
      achievements: () => ({ get: () => _s([{ id: 1, foo: 'bar' }]) }),
      bank: () => ({ get: () => _s([{ id: 123, foo: 'bar' }]) }),
      dungeons: () => ({ get: () => _s(['detha']) }),
      dyes: () => ({ get: () => _s([1, 2, 3]) }),
      finishers: () => ({ get: () => _s([1, 2, 3]) }),
      gliders: () => ({ get: () => _s([1, 2, 3]) }),
      home: () => ({
        cats: () => ({ get: () => _s([{ id: 1, hint: 'chicken' }]) }),
        nodes: () => ({ get: () => _s(['quartz_node', 'airship_cargo']) })
      }),
      inventory: () => ({ get: () => _s([{ id: 123, foo: 'bar' }]) }),
      luck: () => ({ get: () => _s(123) }),
      mailcarriers: () => ({ get: () => _s([1, 2, 3]) }),
      masteries: () => ({ get: () => _s([{ id: 123, foo: 'bar' }]) }),
      mastery: () => ({
        points: () => ({ get: () => _s([1, 2, 3]) })
      }),
      materials: () => ({ get: () => _s([{ id: 123, foo: 'bar' }]) }),
      minis: () => ({ get: () => _s([1, 2, 3]) }),
      mounts: () => ({
        skins: () => ({ get: () => _s([1, 2, 3]) }),
        types: () => ({ get: () => _s([1, 2, 3]) })
      }),
      novelties: () => ({ get: () => _s([1, 2, 3]) }),
      outfits: () => ({ get: () => _s([1, 2, 3]) }),
      raids: () => ({ get: () => _s(['keep_construct']) }),
      recipes: () => ({ get: () => _s([1, 2, 3]) }),
      skins: () => ({ get: () => _s([1, 2, 3]) }),
      titles: () => ({ get: () => _e({ response: { status: 403 } }) }),
      wallet: () => ({ get: () => _s([{ id: 123, foo: 'bar' }]) }),
      pvp: () => ({
        games: () => ({ all: () => _s([{ id: 123, foo: 'bar' }]) }),
        heroes: () => ({ get: () => _s([1, 2, 3]) }),
        standings: () => ({ get: () => _s([{ id: 123, foo: 'bar' }]) }),
        stats: () => ({ get: () => _s([{ id: 123, foo: 'bar' }]) })
      })
    }),
    characters: () => ({
      all: () => _s([{ id: 123, foo: 'bar' }, { id: 123, flags: ['Beta'], herp: 'derp' }])
    }),
    commerce: () => ({
      transactions: () => ({
        current: () => ({
          buys: () => ({ all: () => _s([{ id: 123, foo: 'bar' }]) }),
          sells: () => ({ all: () => _s([{ id: 123, foo: 'bar' }]) })
        })
      }),
      delivery: () => ({
        get: () => _s({ coins: 1337 })
      })
    }),
    guild: hasGuildPermission
      ? () => ({
        get: () => _s({ id: 123, foo: 'bar' }),
        members: () => ({ get: () => _s([{ id: 123, foo: 'bar' }]) }),
        ranks: () => ({ get: () => _s([{ id: 123, foo: 'bar' }]) }),
        stash: () => ({ get: () => _s([{ id: 123, foo: 'bar' }]) }),
        teams: () => ({ get: () => _e({ content: { text: 'access restricted to guild leaders' } }) }),
        treasury: () => ({ get: () => _s([{ id: 123, foo: 'bar' }]) }),
        upgrades: () => ({ get: () => _s([1, 2, 3]) })
      })
      : undefined
  }
}

function _s (response) {
  return Promise.resolve(response)
}

function _e (response) {
  return Promise.reject(response)
}

const expectedResponse = {
  account: { name: 'lol.1234', guilds: ['key-1234', 'key-5678'], guild_leader: ['key-1234'] },
  achievements: [{ id: 1, foo: 'bar' }],
  bank: [{ id: 123, foo: 'bar' }],
  characters: [{ id: 123, foo: 'bar' }],
  commerce: {
    buys: [{ id: 123, foo: 'bar' }],
    sells: [{ id: 123, foo: 'bar' }],
    delivery: { coins: 1337 }
  },
  dungeons: ['detha'],
  dyes: [1, 2, 3],
  finishers: [1, 2, 3],
  gliders: [1, 2, 3],
  home: {
    cats: [{ id: 1, hint: 'chicken' }],
    nodes: ['quartz_node', 'airship_cargo']
  },
  luck: 123,
  mailcarriers: [1, 2, 3],
  masteries: [{ id: 123, foo: 'bar' }],
  mastery: {
    points: [1, 2, 3]
  },
  materials: [{ id: 123, foo: 'bar' }],
  minis: [1, 2, 3],
  mounts: {
    skins: [1, 2, 3],
    types: [1, 2, 3]
  },
  novelties: [1, 2, 3],
  outfits: [1, 2, 3],
  pvp: {
    games: [{ id: 123, foo: 'bar' }],
    heroes: [1, 2, 3],
    standings: [{ id: 123, foo: 'bar' }],
    stats: [{ id: 123, foo: 'bar' }]
  },
  raids: ['keep_construct'],
  recipes: [1, 2, 3],
  shared: [{ id: 123, foo: 'bar' }],
  skins: [1, 2, 3],
  titles: null,
  wallet: [{ id: 123, foo: 'bar' }],
  guilds: [
    {
      data: { id: 123, foo: 'bar' },
      members: [{ id: 123, foo: 'bar' }],
      ranks: [{ id: 123, foo: 'bar' }],
      stash: [{ id: 123, foo: 'bar' }],
      teams: null,
      treasury: [{ id: 123, foo: 'bar' }],
      upgrades: [1, 2, 3]
    }
  ]
}

describe('endpoints > account.blob()', () => {
  it('test /v2/account .blob()', async () => {
    let content = await endpoint({ client: mockClient(true) })

    expect(content).toEqual(expectedResponse)
  })

  it('test /v2/account .blob() without guilds permission', async () => {
    let content = await endpoint({ client: mockClient(false) })

    expect(content).toEqual({
      ...expectedResponse,
      account: { name: 'lol.1234', guilds: ['key-1234', 'key-5678'], guild_leader: undefined },
      guilds: []
    })
  })

  it('test wrap() handling api errors', async () => {
    function mockEndpoint () {
      let error = new Error()
      error.response = { status: 503 }
      error.content = { text: 'API is disabled' }

      return _e(error)
    }

    let response = await endpoint.wrap(mockEndpoint)()
    expect(response).toEqual(null)
  })

  it('test /v2/account .blob() handling library errors', async () => {
    function mockEndpoint () {
      return _e(new Error('Oh no.'))
    }

    let error

    try {
      await endpoint.wrap(mockEndpoint)()
    } catch (err) {
      error = err
    }

    expect(error.message).toEqual('Oh no.')
  })
})
