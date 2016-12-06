/* eslint-env node, mocha */
import {expect} from 'chai'
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

describe('endpoints > account.blob()', () => {
  it('test /v2/account .blob()', async () => {
    endpoint.__set__('api', makeApi({
      account: () => ({
        get: () => Promise.resolve({name: 'lol.1234', guilds: ['key-1234', 'key-5678'], guild_leader: ['key-1234']}),
        achievements: () => ({get: () => Promise.resolve([{id: 1, foo: 'bar'}])}),
        bank: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        dyes: () => ({get: () => Promise.resolve([1, 2, 3])}),
        finishers: () => ({get: () => Promise.resolve([1, 2, 3])}),
        inventory: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        materials: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        minis: () => ({get: () => Promise.resolve([1, 2, 3])}),
        outfits: () => ({get: () => Promise.resolve([1, 2, 3])}),
        recipes: () => ({get: () => Promise.resolve([1, 2, 3])}),
        skins: () => ({get: () => Promise.resolve([1, 2, 3])}),
        titles: () => ({get: () => Promise.reject({response: {status: 403}})}),
        wallet: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        pvp: () => ({
          games: () => ({all: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
          standings: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
          stats: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])})
        })
      }),
      characters: () => ({
        all: () => Promise.resolve([{id: 123, foo: 'bar'}])
      }),
      commerce: () => ({
        transactions: () => ({
          current: () => ({
            buys: () => ({all: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
            sells: () => ({all: () => Promise.resolve([{id: 123, foo: 'bar'}])})
          })
        })
      }),
      guild: () => ({
        get: () => Promise.resolve({id: 123, foo: 'bar'}),
        members: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        ranks: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        stash: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        teams: () => ({get: () => Promise.reject({content: {text: 'access restricted to guild leaders'}})}),
        treasury: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        upgrades: () => ({get: () => Promise.resolve([1, 2, 3])})
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
      dyes: [1, 2, 3],
      finishers: [1, 2, 3],
      materials: [{id: 123, foo: 'bar'}],
      minis: [1, 2, 3],
      outfits: [1, 2, 3],
      pvp: {
        games: [{id: 123, foo: 'bar'}],
        standings: [{id: 123, foo: 'bar'}],
        stats: [{id: 123, foo: 'bar'}]
      },
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
          teams: null,
          treasury: [{id: 123, foo: 'bar'}],
          upgrades: [1, 2, 3]
        }
      ]
    })
  })

  it('test /v2/account .blob() without guilds permission', async () => {
    endpoint.__set__('api', makeApi({
      account: () => ({
        get: () => Promise.resolve({name: 'lol.1234', guilds: ['key-1234', 'key-5678']}),
        achievements: () => ({get: () => Promise.resolve([{id: 1, foo: 'bar'}])}),
        bank: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        dyes: () => ({get: () => Promise.resolve([1, 2, 3])}),
        finishers: () => ({get: () => Promise.resolve([1, 2, 3])}),
        inventory: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        materials: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        minis: () => ({get: () => Promise.resolve([1, 2, 3])}),
        outfits: () => ({get: () => Promise.resolve([1, 2, 3])}),
        recipes: () => ({get: () => Promise.resolve([1, 2, 3])}),
        skins: () => ({get: () => Promise.resolve([1, 2, 3])}),
        titles: () => ({get: () => Promise.reject({response: {status: 403}})}),
        wallet: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
        pvp: () => ({
          games: () => ({all: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
          standings: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
          stats: () => ({get: () => Promise.resolve([{id: 123, foo: 'bar'}])})
        })
      }),
      characters: () => ({
        all: () => Promise.resolve([{id: 123, foo: 'bar'}])
      }),
      commerce: () => ({
        transactions: () => ({
          current: () => ({
            buys: () => ({all: () => Promise.resolve([{id: 123, foo: 'bar'}])}),
            sells: () => ({all: () => Promise.resolve([{id: 123, foo: 'bar'}])})
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
      dyes: [1, 2, 3],
      finishers: [1, 2, 3],
      materials: [{id: 123, foo: 'bar'}],
      minis: [1, 2, 3],
      outfits: [1, 2, 3],
      pvp: {
        games: [{id: 123, foo: 'bar'}],
        standings: [{id: 123, foo: 'bar'}],
        stats: [{id: 123, foo: 'bar'}]
      },
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
        get: () => Promise.reject('Oh no.')
      })
    }))

    let error

    try {
      await endpoint({})
    } catch (err) {
      error = err
    }

    expect(error).to.deep.equal('Oh no.')
  })
})
