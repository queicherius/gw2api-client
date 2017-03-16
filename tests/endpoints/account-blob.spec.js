/* eslint-env node, mocha */
import { expect } from 'chai'
import endpoint from '../../src/endpoints/account-blob'

function makeApi (object) {
  return () => ({
    authenticate: () => ({
      language: () => ({
        cacheStorage: () => object
      })
    })
  })
}

function _s (response) {
  return Promise.resolve(response)
}

function _e (response) {
  return Promise.reject(response)
}

describe('endpoints > account.blob()', () => {
  it('test /v2/account .blob()', async () => {
    endpoint.__set__('api', makeApi({
      account: () => ({
        get: () => _s({name: 'lol.1234', guilds: ['key-1234', 'key-5678'], guild_leader: ['key-1234']}),
        achievements: () => ({get: () => _s([{id: 1, foo: 'bar'}])}),
        bank: () => ({get: () => _s([{id: 123, foo: 'bar'}])}),
        dungeons: () => ({get: () => _s(['detha'])}),
        dyes: () => ({get: () => _s([1, 2, 3])}),
        finishers: () => ({get: () => _s([1, 2, 3])}),
        home: () => ({
          cats: () => ({get: () => _s([{id: 1, hint: 'chicken'}])}),
          nodes: () => ({get: () => _s(['quartz_node', 'airship_cargo'])})
        }),
        inventory: () => ({get: () => _s([{id: 123, foo: 'bar'}])}),
        masteries: () => ({get: () => _s([{id: 123, foo: 'bar'}])}),
        materials: () => ({get: () => _s([{id: 123, foo: 'bar'}])}),
        minis: () => ({get: () => _s([1, 2, 3])}),
        outfits: () => ({get: () => _s([1, 2, 3])}),
        raids: () => ({get: () => _s(['keep_construct'])}),
        recipes: () => ({get: () => _s([1, 2, 3])}),
        skins: () => ({get: () => _s([1, 2, 3])}),
        titles: () => ({get: () => _e({response: {status: 403}})}),
        wallet: () => ({get: () => _s([{id: 123, foo: 'bar'}])}),
        pvp: () => ({
          games: () => ({all: () => _s([{id: 123, foo: 'bar'}])}),
          standings: () => ({get: () => _s([{id: 123, foo: 'bar'}])}),
          stats: () => ({get: () => _s([{id: 123, foo: 'bar'}])})
        })
      }),
      characters: () => ({
        all: () => _s([{id: 123, foo: 'bar'}])
      }),
      commerce: () => ({
        transactions: () => ({
          current: () => ({
            buys: () => ({all: () => _s([{id: 123, foo: 'bar'}])}),
            sells: () => ({all: () => _s([{id: 123, foo: 'bar'}])})
          })
        })
      }),
      guild: () => ({
        get: () => _s({id: 123, foo: 'bar'}),
        members: () => ({get: () => _s([{id: 123, foo: 'bar'}])}),
        ranks: () => ({get: () => _s([{id: 123, foo: 'bar'}])}),
        stash: () => ({get: () => _s([{id: 123, foo: 'bar'}])}),
        teams: () => ({get: () => _e({content: {text: 'access restricted to guild leaders'}})}),
        treasury: () => ({get: () => _s([{id: 123, foo: 'bar'}])}),
        upgrades: () => ({get: () => _s([1, 2, 3])})
      })
    }))

    let content = await endpoint({})

    expect(content).to.deep.equal({
      account: {name: 'lol.1234', guilds: ['key-1234', 'key-5678'], guild_leader: ['key-1234']},
      achievements: [{id: 1, foo: 'bar'}],
      bank: [{id: 123, foo: 'bar'}],
      characters: [{id: 123, foo: 'bar'}],
      commerce: {
        buys: [{id: 123, foo: 'bar'}],
        sells: [{id: 123, foo: 'bar'}]
      },
      dungeons: ['detha'],
      dyes: [1, 2, 3],
      finishers: [1, 2, 3],
      home: {
        cats: [{id: 1, hint: 'chicken'}],
        nodes: ['quartz_node', 'airship_cargo']
      },
      masteries: [{id: 123, foo: 'bar'}],
      materials: [{id: 123, foo: 'bar'}],
      minis: [1, 2, 3],
      outfits: [1, 2, 3],
      pvp: {
        games: [{id: 123, foo: 'bar'}],
        standings: [{id: 123, foo: 'bar'}],
        stats: [{id: 123, foo: 'bar'}]
      },
      raids: ['keep_construct'],
      recipes: [1, 2, 3],
      shared: [{id: 123, foo: 'bar'}],
      skins: [1, 2, 3],
      titles: null,
      wallet: [{id: 123, foo: 'bar'}],
      guilds: [
        {
          data: {id: 123, foo: 'bar'},
          members: [{id: 123, foo: 'bar'}],
          ranks: [{id: 123, foo: 'bar'}],
          stash: [{id: 123, foo: 'bar'}],
          teams: [],
          treasury: [{id: 123, foo: 'bar'}],
          upgrades: [1, 2, 3]
        }
      ]
    })
  })

  it('test /v2/account .blob() without guilds permission', async () => {
    endpoint.__set__('api', makeApi({
      account: () => ({
        get: () => _s({name: 'lol.1234', guilds: ['key-1234', 'key-5678']}),
        achievements: () => ({get: () => _s([{id: 1, foo: 'bar'}])}),
        bank: () => ({get: () => _s([{id: 123, foo: 'bar'}])}),
        dungeons: () => ({get: () => _s(['detha'])}),
        dyes: () => ({get: () => _s([1, 2, 3])}),
        finishers: () => ({get: () => _s([1, 2, 3])}),
        home: () => ({
          cats: () => ({get: () => _s([{id: 1, hint: 'chicken'}])}),
          nodes: () => ({get: () => _s(['quartz_node', 'airship_cargo'])})
        }),
        inventory: () => ({get: () => _s([{id: 123, foo: 'bar'}])}),
        masteries: () => ({get: () => _s([{id: 123, foo: 'bar'}])}),
        materials: () => ({get: () => _s([{id: 123, foo: 'bar'}])}),
        minis: () => ({get: () => _s([1, 2, 3])}),
        outfits: () => ({get: () => _s([1, 2, 3])}),
        raids: () => ({get: () => _s(['keep_construct'])}),
        recipes: () => ({get: () => _s([1, 2, 3])}),
        skins: () => ({get: () => _s([1, 2, 3])}),
        titles: () => ({get: () => _e({response: {status: 403}})}),
        wallet: () => ({get: () => _s([{id: 123, foo: 'bar'}])}),
        pvp: () => ({
          games: () => ({all: () => _s([{id: 123, foo: 'bar'}])}),
          standings: () => ({get: () => _s([{id: 123, foo: 'bar'}])}),
          stats: () => ({get: () => _s([{id: 123, foo: 'bar'}])})
        })
      }),
      characters: () => ({
        all: () => _s([{id: 123, foo: 'bar'}])
      }),
      commerce: () => ({
        transactions: () => ({
          current: () => ({
            buys: () => ({all: () => _s([{id: 123, foo: 'bar'}])}),
            sells: () => ({all: () => _s([{id: 123, foo: 'bar'}])})
          })
        })
      })
    }))

    let content = await endpoint({})

    expect(content).to.deep.equal({
      account: {name: 'lol.1234', guilds: ['key-1234', 'key-5678']},
      achievements: [{id: 1, foo: 'bar'}],
      bank: [{id: 123, foo: 'bar'}],
      characters: [{id: 123, foo: 'bar'}],
      commerce: {
        buys: [{id: 123, foo: 'bar'}],
        sells: [{id: 123, foo: 'bar'}]
      },
      dungeons: ['detha'],
      dyes: [1, 2, 3],
      finishers: [1, 2, 3],
      home: {
        cats: [{id: 1, hint: 'chicken'}],
        nodes: ['quartz_node', 'airship_cargo']
      },
      masteries: [{id: 123, foo: 'bar'}],
      materials: [{id: 123, foo: 'bar'}],
      minis: [1, 2, 3],
      outfits: [1, 2, 3],
      pvp: {
        games: [{id: 123, foo: 'bar'}],
        standings: [{id: 123, foo: 'bar'}],
        stats: [{id: 123, foo: 'bar'}]
      },
      raids: ['keep_construct'],
      recipes: [1, 2, 3],
      shared: [{id: 123, foo: 'bar'}],
      skins: [1, 2, 3],
      titles: null,
      wallet: [{id: 123, foo: 'bar'}],
      guilds: []
    })
  })

  it('test /v2/account .blob() handling errors', async () => {
    endpoint.__set__('api', makeApi({
      account: () => ({
        get: () => _e(new Error('Oh no.'))
      })
    }))

    let error

    try {
      await endpoint({})
    } catch (err) {
      error = err
    }

    expect(error.message).to.equal('Oh no.')
  })
})
