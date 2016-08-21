# gw2api-client

[![Build Status](https://img.shields.io/travis/gw2efficiency/gw2api-client.svg?style=flat-square)](https://travis-ci.org/gw2efficiency/gw2api-client)
[![Coverage Status](https://img.shields.io/codecov/c/github/gw2efficiency/gw2api-client/master.svg?style=flat-square)](https://codecov.io/github/gw2efficiency/gw2api-client)

> Javascript wrapper for the official Guild Wars 2 API.

*This is part of [gw2efficiency](https://gw2efficiency.com). Please report all issues in [the central repository](https://github.com/gw2efficiency/issues/issues).*

## Install

```
npm install gw2e-gw2api-client
```

This module can be used for Node.js as well as browsers using [Browserify](https://github.com/substack/browserify-handbook#how-node_modules-works). 

**Requires the [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) to work.**

## Usage

### Basic usage

```js
async function example () {

  // Get the constructor of a client
  const client = require('gw2e-gw2api-client')
  
  // Actually generate a API client
  let api = client()
  
  // Optional: Set the language of the client
  api.language('en')
  
  // Optional: Authenticate the client using an API key
  api.authenticate('my-secret-key')
  
  // Get the ids of all items
  let items = await api.items().ids()
  
  // Note: If you want to request e.g. multiple items with different languages
  // or API keys in *parallel*, you have to use *different* client instances
  // for that, since language and key are connected to the client instance
  async.parallel([
    () => client().language('en').items().all(),
    () => client().language('de').items().all()
  ])
  
}
```

### Error handling

You can wrap every call in a `try...catch` statement, catching all possible errors.

```js
try {
  let bank = await api.account().bank()
} catch (err) {
  console.log('Something went wrong. :(', err)
  // err.response is the last response object (e.g. err.response.status)
  // err.content is the parsed body of the response, if available
  // err.content.text MAY be set to the error text thrown of the API, if available
}
```

The API can throw server errors (status > `500`) that don't have a `text` property set, but if
it responds with a error, the following error texts can appear:

- endpoint requires authentication
- invalid key
- requires scope xyz
- membership required
- access restricted to guild leaders
- page out of range
- no such id
- all ids provided are invalid

## Mocking

If you want to mock this module in your tests, you can replace the underlying 
request library with the provided mock module, e.g. using [rewire](https://github.com/jhnns/rewire).

You can find all available mock methods here: https://github.com/gw2efficiency/requester#mocking

```js
const rewire = require('rewire')
const requesterMock = require('gw2e-requester/mock')
const file = rewire('../some/file/using/gw2api/client.js')

// Get the variable "api" (which is the initialized api client)
// and replace the requester method with the requesterMock
file.__get__('api').requester = requesterMock

// Use the requester mock methods as described in the link above
```

## Endpoint Overview

 API Endpoint                 | Method call                           | Flags
 ---|------|---
 /v2/account | `client.account()` | 🔒
/v2/account/achievements | `client.account().achievements()` | 🔒
/v2/account/bank | `client.account().bank()` | 🔒
/v2/account/dyes | `client.account().dyes()` | 🔒
/v2/account/finishers | `client.account().finishers()` | 🔒
/v2/account/inventory | `client.account().inventory()` | 🔒
/v2/account/masteries | `client.account().masteries()` | 🔒
/v2/account/materials | `client.account().materials()` | 🔒
/v2/account/minis | `client.account().minis()` | 🔒
/v2/account/outfits | `client.account().outfits()` | 🔒
/v2/account/recipes | `client.account().recipes()` | 🔒
/v2/account/skins | `client.account().skins()` | 🔒
/v2/account/titles | `client.account().titles()` | 🔒
/v2/account/wallet | `client.account().wallet()` | 🔒
/v2/achievements | `client.achievements()` | 📦📄🌏
/v2/achievements/categories | `client.achievements().categories()` | 📦📄🌏
/v2/achievements/daily | `client.achievements().daily()` |
/v2/achievements/daily/tomorrow | `client.achievements().dailyTomorrow()` |
/v2/achievements/groups | `client.achievements().groups()` | 📦📄🌏
/v2/backstory/answers | `client.backstory().answers()` | 📦📄🌏
/v2/backstory/questions | `client.backstory().questions()` | 📦📄🌏
/v2/build | `client.build()` |
/v2/characters | `client.characters()` | 🔒📦📄
/v2/characters/CHARACTER_NAME/backstory | `client.characters('CHARACTER_NAME').backstory()` | 🔒
/v2/characters/CHARACTER_NAME/core | `client.characters('CHARACTER_NAME').core()` | 🔒
/v2/characters/CHARACTER_NAME/crafting | `client.characters('CHARACTER_NAME').crafting()` | 🔒
/v2/characters/CHARACTER_NAME/equipment | `client.characters('CHARACTER_NAME').equipment()` | 🔒
/v2/characters/CHARACTER_NAME/heropoints | `client.characters('CHARACTER_NAME').heropoints()` | 🔒
/v2/characters/CHARACTER_NAME/inventory | `client.characters('CHARACTER_NAME').inventory()` | 🔒
/v2/characters/CHARACTER_NAME/recipes | `client.characters('CHARACTER_NAME').recipes()` | 🔒
/v2/characters/CHARACTER_NAME/specializations | `client.characters('CHARACTER_NAME').specializations()` | 🔒
/v2/characters/CHARACTER_NAME/training | `client.characters('CHARACTER_NAME').training()` | 🔒
/v2/colors | `client.colors()` | 📦📄🌏
/v2/commerce/exchange | `client.commerce().exchange()` |
/v2/commerce/listings | `client.commerce().listings()` | 📦📄
/v2/commerce/prices | `client.commerce().prices()` | 📦📄
/v2/commerce/prices/transactions/current/buys | `client.commerce().transactions().current().buys()` | 🔒📄
/v2/commerce/prices/transactions/current/sells | `client.commerce().transactions().current().sells()` | 🔒📄
/v2/commerce/prices/transactions/history/buys | `client.commerce().transactions().history().buys()` | 🔒📄
/v2/commerce/prices/transactions/history/sells | `client.commerce().transactions().history().sells()` | 🔒📄
/v2/continents | `client.continents()` | 📦📄🌏
/v2/currencies | `client.currencies()` | 📦📄🌏
/v2/emblem/foreground | `client.emblem().foreground()` | 📦📄
/v2/emblem/background | `client.emblem().background()` | 📦📄
/v2/files | `client.files()` | 📦📄
/v2/finishers | `client.finishers()` | 📦📄🌏
/v2/guild | `client.guild()` | 🔒
/v2/guild/permissions | `client.guild().permissions()` | 📦📄🌏
/v2/guild/search?name=GUILD_NAME | `client.guild().search('GUILD_NAME')` |
/v2/guild/upgrades | `client.guild().upgrades()` | 📦📄🌏
/v2/guild/GUILD_ID/log | `client.guild('GUILD_ID').log()` | 🔒
/v2/guild/GUILD_ID/members | `client.guild('GUILD_ID').members()` | 🔒
/v2/guild/GUILD_ID/ranks | `client.guild('GUILD_ID').ranks()` | 🔒
/v2/guild/GUILD_ID/stash | `client.guild('GUILD_ID').stash()` | 🔒
/v2/guild/GUILD_ID/teams | `client.guild('GUILD_ID').teams()` | 🔒
/v2/guild/GUILD_ID/treasury | `client.guild('GUILD_ID').treasury()` | 🔒
/v2/guild/GUILD_ID/upgrades | `client.guild('GUILD_ID').upgrades()` | 🔒
/v2/items | `client.items()` | 📦📄🌏
/v2/itemstats | `client.itemstats()` | 📦📄🌏
/v2/legends | `client.legends()` | 📦📄
/v2/maps | `client.maps()` | 📦📄🌏
/v2/masteries | `client.masteries()` | 📦📄🌏
/v2/materials | `client.materials()` | 📦📄🌏
/v2/minis | `client.minis()` | 📦📄🌏
/v2/pets | `client.pets()` | 📦📄🌏
/v2/professions | `client.professions()` | 📦📄🌏
/v2/pvp/amulets | `client.pvp().amulets()` | 📦📄🌏
/v2/pvp/games | `client.pvp().games()` | 🔒📦📄
/v2/pvp/seasons | `client.pvp().seasons()` | 📦📄🌏
/v2/pvp/standings | `client.pvp().standings()` | 🔒
/v2/pvp/stats | `client.pvp().stats()` | 🔒
/v2/quaggans | `client.quaggans()` | 📦📄
/v2/recipes | `client.recipes()` | 📦📄
/v2/recipes/search | `client.recipes().search().input('ITEM_ID')` |
/v2/recipes/search | `client.recipes().search().output('ITEM_ID')` |
/v2/skills | `client.skills()` | 📦📄🌏
/v2/skins | `client.skins()` | 📦📄🌏
/v2/specializations | `client.specializations()` | 📦📄🌏
/v2/stories | `client.stories()` | 📦📄🌏
/v2/stories/seasons | `client.stories().seasons()` | 📦📄🌏
/v2/titles | `client.titles()` | 📦📄🌏
/v2/tokeninfo | `client.tokeninfo()` | 🔒
/v2/traits | `client.traits()` | 📦📄🌏
/v2/worlds | `client.worlds()` | 📦📄🌏
/v2/wvw/abilities | `client.wvw().abilities()` | 📦📄🌏
/v2/wvw/matches | `client.wvw().matches()` | 📦📄
/v2/wvw/objectives | `client.wvw().objectives()` | 📦📄🌏

### Flags

> If an endpoint has no 📦 or 📄 flags, you can usually use it with the `get()` method

#### 🔒 Authenticated

This endpoint requires you to authenticate the client beforehand, using `client.authenticate(api-key)`.

#### 📦 Bulk

This endpoint supports bulk expansion. This enables the following methods:

- `all()` Get all entries.
- `ids()` Get all ids.
- `get(:id)` Get a single entry by id.
- `many([:id, :id, :id])` Get multiple entries by id.

#### 📄 Paginated

This endpoint support pagination. This enables the following methods:

- `all()` Get all entries. 
- `page(:page)` Get a page of entries (with a default maximum size).
- `page(:page, :size)` Get a page of entries with a specific size.

#### 🌏 Localized

This endpoint supports localisation. You may localize your client beforehand, using `client.language('de')`

## Tests

```
npm test
```

## Licence

MIT
