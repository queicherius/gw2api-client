# gw2api-client

[![Build Status](https://img.shields.io/travis/queicherius/gw2api-client.svg?style=flat-square)](https://travis-ci.org/queicherius/gw2api-client)
[![Coverage Status](https://img.shields.io/codecov/c/github/queicherius/gw2api-client/master.svg?style=flat-square)](https://codecov.io/github/queicherius/gw2api-client)

> Javascript wrapper for the official Guild Wars 2 API.

## Install

```bash
npm install gw2api-client
```

This module can be used for Node.js as well as browsers using [Browserify](https://github.com/substack/browserify-handbook#how-node_modules-works). 

## Usage

### Basic usage

```js
import client from 'gw2api-client'
import flow from 'promise-control-flow'

async function example () {
  // Get an instance of an API client
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
  flow.parallel([
    () => client().language('en').items().all(),
    () => client().language('de').items().all()
  ])
}
```

### Error handling

You can wrap every call in a `try...catch` statement (or using Promise `catch`), catching all possible errors.

```js
try {
  let bank = await api.account().bank()
} catch (err) {
  // err.response is the last response object (e.g. err.response.status)
  // err.content is the parsed body of the response, if available
  // err.content.text MAY be set to the error text thrown of the API, if available
  console.log('Something went wrong', err)
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

### Extending

You can extend or overwrite the API client with your own endpoints if you wish so. The only thing that is required, is an extension of `AbstractEndpoint` to provide all the logic for pagination, bulk, localization etc.

If you need more specific ways to handle data then the previously defined ones, take a look at how the existing endpoints handle these cases (e.g. in `/src/endpoints/recipes.js`)

```js
import client from 'gw2api-client'
import AbstractEndpoint from 'gw2api-client/build/endpoint'

// Get an instance of an API client
const api = client()

// Define our custom "items" endpoint
class ItemsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.baseUrl = 'https://gw2-api.com'
    this.url = '/items'
    this.isPaginated = false
    this.isBulk = true
    this.supportsBulkAll = false
    this.isLocalized = true
  }
}

// Attach it to the client, either as a new endpoint
// or overwriting an already existing one
api.items = () => new ItemsEndpoint(client)

// Use the new, overwritten endpoint
api.items().many([123, 456])
  .then(items => console.log('Got the items', items))
  .catch(err => console.error('Things went south', err))
```

### Mocking

If you want to mock this module in your tests, you can replace the underlying 
request library with the provided mock module, e.g. using [rewire](https://github.com/speedskater/babel-plugin-rewire).

You can find all available mock methods here: https://github.com/queicherius/lets-fetch#mocking

```js
import fetchMock from 'lets-fetch/mock'
import file from '../some/file/using/gw2api/client.js'

// Get the variable "api" (which is the initialized api client)
// and replace the fetch method with the fetchMock
file.__get__('api').fetch = fetchMock

// Use the fetch mock methods as described in the link above
```

## Endpoint Overview

```js
// Url: /v2/account
// Flags: 🔒
client.account()

// Url: /v2/account/achievements
// Flags: 🔒
client.account().achievements()

// Url: /v2/account/bank
// Flags: 🔒
client.account().bank()

// Url: /v2/account/dyes
// Flags: 🔒
client.account().dyes()

// Url: /v2/account/finishers
// Flags: 🔒
client.account().finishers()

// Url: /v2/account/inventory
// Flags: 🔒
client.account().inventory()

// Url: /v2/account/masteries
// Flags: 🔒
client.account().masteries()

// Url: /v2/account/materials
// Flags: 🔒
client.account().materials()

// Url: /v2/account/minis
// Flags: 🔒
client.account().minis()

// Url: /v2/account/outfits
// Flags: 🔒
client.account().outfits()

// Url: /v2/account/recipes
// Flags: 🔒
client.account().recipes()

// Url: /v2/account/skins
// Flags: 🔒
client.account().skins()

// Url: /v2/account/titles
// Flags: 🔒
client.account().titles()

// Url: /v2/account/wallet
// Flags: 🔒
client.account().wallet()

// Url: /v2/achievements
// Flags: 📦📄🌏
client.achievements()

// Url: /v2/achievements/categories
// Flags: 📦📄🌏
client.achievements().categories()

// Url: /v2/achievements/daily
client.achievements().daily()

// Url: /v2/achievements/dailyTomorrow
client.achievements().dailyTomorrow()

// Url: /v2/achievements/groups
// Flags: 📦📄🌏
client.achievements().groups()

// Url: /v2/backstory/answers
// Flags: 📦📄🌏
client.backstory().answers()

// Url: /v2/backstory/questions
// Flags: 📦📄🌏
client.backstory().questions()

// Url: /v2/build
client.build()

// Url: /v2/characters
// Flags: 🔒📦📄
client.characters()

// Url: /v2/characters/CHARACTER_NAME/backstory
// Flags: 🔒
client.characters('CHARACTER_NAME').backstory()

// Url: /v2/characters/CHARACTER_NAME/core
// Flags: 🔒
client.characters('CHARACTER_NAME').core()

// Url: /v2/characters/CHARACTER_NAME/crafting
// Flags: 🔒
client.characters('CHARACTER_NAME').crafting()

// Url: /v2/characters/CHARACTER_NAME/equipment
// Flags: 🔒
client.characters('CHARACTER_NAME').equipment()

// Url: /v2/characters/CHARACTER_NAME/heropoints
// Flags: 🔒
client.characters('CHARACTER_NAME').heropoints()

// Url: /v2/characters/CHARACTER_NAME/inventory
// Flags: 🔒
client.characters('CHARACTER_NAME').inventory()

// Url: /v2/characters/CHARACTER_NAME/recipes
// Flags: 🔒
client.characters('CHARACTER_NAME').recipes()

// Url: /v2/characters/CHARACTER_NAME/specializations
// Flags: 🔒
client.characters('CHARACTER_NAME').specializations()

// Url: /v2/characters/CHARACTER_NAME/training
// Flags: 🔒
client.characters('CHARACTER_NAME').training()

// Url: /v2/colors
// Flags: 📦📄🌏
client.colors()

// Url: /v2/commerce/exchange
client.commerce().exchange().gems('AMOUNT')
client.commerce().exchange().gold('AMOUNT')

// Url: /v2/commerce/listings
// Flags: 📦📄
client.commerce().listings()

// Url: /v2/commerce/prices
// Flags: 📦📄
client.commerce().prices()

// Url: /v2/commerce/prices/transactions/current/buys
// Flags: 🔒📄
client.commerce().transactions().current().buys()

// Url: /v2/commerce/prices/transactions/current/sells
// Flags: 🔒📄
client.commerce().transactions().current().sells()

// Url: /v2/commerce/prices/transactions/history/buys
// Flags: 🔒📄
client.commerce().transactions().history().buys()

// Url: /v2/commerce/prices/transactions/history/sells
// Flags: 🔒📄
client.commerce().transactions().history().sells()

// Url: /v2/continents
// Flags: 📦📄🌏
client.continents()

// Url: /v2/currencies
// Flags: 📦📄🌏
client.currencies()

// Url: /v2/emblem/foreground
// Flags: 📦📄
client.emblem().foreground()

// Url: /v2/emblem/background
// Flags: 📦📄
client.emblem().background()

// Url: /v2/files
// Flags: 📦📄
client.files()

// Url: /v2/finishers
// Flags: 📦📄🌏
client.finishers()

// Url: /v2/guild
// Flags: 🔒
client.guild()

// Url: /v2/guild/permissions
// Flags: 📦📄🌏
client.guild().permissions()

// Url: /v2/guild/search?name=GUILD_NAME
client.guild().search('GUILD_NAME')

// Url: /v2/guild/upgrades
// Flags: 📦📄🌏
client.guild().upgrades()

// Url: /v2/guild/GUILD_ID/log
// Flags: 🔒
client.guild('GUILD_ID').log()

// Url: /v2/guild/GUILD_ID/members
// Flags: 🔒
client.guild('GUILD_ID').members()

// Url: /v2/guild/GUILD_ID/ranks
// Flags: 🔒
client.guild('GUILD_ID').ranks()

// Url: /v2/guild/GUILD_ID/stash
// Flags: 🔒
client.guild('GUILD_ID').stash()

// Url: /v2/guild/GUILD_ID/teams
// Flags: 🔒
client.guild('GUILD_ID').teams()

// Url: /v2/guild/GUILD_ID/treasury
// Flags: 🔒
client.guild('GUILD_ID').treasury()

// Url: /v2/guild/GUILD_ID/upgrades
// Flags: 🔒
client.guild('GUILD_ID').upgrades()

// Url: /v2/items
// Flags: 📦📄🌏
client.items()

// Url: /v2/itemstats
// Flags: 📦📄🌏
client.itemstats()

// Url: /v2/legends
// Flags: 📦📄
client.legends()

// Url: /v2/maps
// Flags: 📦📄🌏
client.maps()

// Url: /v2/masteries
// Flags: 📦📄🌏
client.masteries()

// Url: /v2/materials
// Flags: 📦📄🌏
client.materials()

// Url: /v2/minis
// Flags: 📦📄🌏
client.minis()

// Url: /v2/pets
// Flags: 📦📄🌏
client.pets()

// Url: /v2/professions
// Flags: 📦📄🌏
client.professions()

// Url: /v2/pvp/amulets
// Flags: 📦📄🌏
client.pvp().amulets()

// Url: /v2/pvp/games
// Flags: 🔒📦📄
client.pvp().games()

// Url: /v2/pvp/seasons
// Flags: 📦📄🌏
client.pvp().seasons()

// Url: /v2/pvp/standings
// Flags: 🔒
client.pvp().standings()

// Url: /v2/pvp/stats
// Flags: 🔒
client.pvp().stats()

// Url: /v2/quaggans
// Flags: 📦📄
client.quaggans()

// Url: /v2/recipes
// Flags: 📦📄
client.recipes()

// Url: /v2/recipes/search
client.recipes().search().input('ITEM_ID')
client.recipes().search().output('ITEM_ID')

// Url: /v2/skills
// Flags: 📦📄🌏
client.skills()

// Url: /v2/skins
// Flags: 📦📄🌏
client.skins()

// Url: /v2/specializations
// Flags: 📦📄🌏
client.specializations()

// Url: /v2/stories
// Flags: 📦📄🌏
client.stories()

// Url: /v2/stories/seasons
// Flags: 📦📄🌏
client.stories().seasons()

// Url: /v2/titles
// Flags: 📦📄🌏
client.titles()

// Url: /v2/tokeninfo
// Flags: 🔒
client.tokeninfo()

// Url: /v2/traits
// Flags: 📦📄🌏
client.traits()

// Url: /v2/worlds
// Flags: 📦📄🌏
client.worlds()

// Url: /v2/wvw/abilities
// Flags: 📦📄🌏
client.wvw().abilities()

// Url: /v2/wvw/matches
// Flags: 📦📄
client.wvw().matches()

// Url: /v2/wvw/objectives
// Flags: 📦📄🌏
client.wvw().objectives()
```

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
