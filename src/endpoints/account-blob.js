import flow from 'promise-control-flow'
import flat from 'flat'
import _get from 'fast-get'
import api from '../index.js'

export default function (parent) {
  const client = api()
    .authenticate(parent.apiKey)
    .language(parent.lang)
    .cacheStorage(parent.caches)

  client.fetch = parent.fetch

  const requests = {
    account: wrap(() => client.account().get()),
    achievements: wrap(() => client.account().achievements().get()),
    bank: wrap(() => client.account().bank().get()),
    characters: wrap(() => client.characters().all()),
    'commerce.buys': wrap(() => client.commerce().transactions().current().buys().all()),
    'commerce.sells': wrap(() => client.commerce().transactions().current().sells().all()),
    'commerce.delivery': wrap(() => client.commerce().delivery().get()),
    dungeons: wrap(() => client.account().dungeons().get()),
    dyes: wrap(() => client.account().dyes().get()),
    gliders: wrap(() => client.account().gliders().get()),
    finishers: wrap(() => client.account().finishers().get()),
    'home.cats': wrap(() => client.account().home().cats().get()),
    'home.nodes': wrap(() => client.account().home().nodes().get()),
    guilds: wrap(() => accountGuilds(client)),
    mailcarriers: wrap(() => client.account().mailcarriers().get()),
    masteries: wrap(() => client.account().masteries().get()),
    'mastery.points': wrap(() => client.account().mastery().points().get()),
    materials: wrap(() => client.account().materials().get()),
    minis: wrap(() => client.account().minis().get()),
    outfits: wrap(() => client.account().outfits().get()),
    'pvp.games': wrap(() => client.account().pvp().games().all()),
    'pvp.heroes': wrap(() => client.account().pvp().heroes().get()),
    'pvp.standings': wrap(() => client.account().pvp().standings().get()),
    'pvp.stats': wrap(() => client.account().pvp().stats().get()),
    raids: wrap(() => client.account().raids().get()),
    recipes: wrap(() => client.account().recipes().get()),
    shared: wrap(() => client.account().inventory().get()),
    skins: wrap(() => client.account().skins().get()),
    titles: wrap(() => client.account().titles().get()),
    wallet: wrap(() => client.account().wallet().get())
  }

  return flow.parallel(requests).then(data => {
    data = flat.unflatten(data)
    data.characters = filterBetaCharacters(data.characters)
    return data
  })
}

// Get the guild data accessible for the account
function accountGuilds (client) {
  return client.account().get().then(account => {
    if (!account.guild_leader) {
      return []
    }

    let requests = account.guild_leader.map(id => wrap(() => guildData(id)))
    return flow.parallel(requests)
  })

  function guildData (id) {
    let requests = {
      data: wrap(() => client.guild().get(id)),
      members: wrap(() => client.guild(id).members().get()),
      ranks: wrap(() => client.guild(id).ranks().get()),
      stash: wrap(() => client.guild(id).stash().get()),
      teams: wrap(() => Promise.resolve(null)),
      treasury: wrap(() => client.guild(id).treasury().get()),
      upgrades: wrap(() => client.guild(id).upgrades().get())
    }

    return flow.parallel(requests)
  }
}

// Filter out beta characters from the total account blob, since they are
// technically not part of the actual live account and live on a different server
function filterBetaCharacters (characters) {
  if (!characters) {
    return null
  }

  return characters.filter(x => !x.flags || !x.flags.includes('Beta'))
}

// Wrap a promise function so all errors that have to do with the API
// just result in an empty response instead of throwing an error
// This prevents API errors / changes breaking the entire infrastructure
export function wrap (func) {
  return () => new Promise((resolve, reject) => {
    func()
      .then(x => resolve(x))
      .catch(err => {
        let status = _get(err, 'response.status')
        let text = _get(err, 'content.text')

        if (status || text) {
          console.warn(`API error: ${text} (${status})`)
          return resolve(null)
        }

        reject(err)
      })
  })
}
