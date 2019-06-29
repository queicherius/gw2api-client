# API Endpoints

## Endpoint Behaviour

### Bulk Expanding

These endpoints support requesting resources by using their identifiers. You can use the following methods with bulk expanding endpoints:

- `all()` - Get all entries
- `ids()` - Get all ids
- `get(:id)` - Get a single entry by id
- `many([:id, :id])` - Get multiple entries by ids

### Paginated

These endpoints support requesting pages, which contain multiple resources. You can use the following methods with paginated endpoints:

- `all()` - Get all entries
- `page(:page)` - Get a page of entries (with the current maximum page size of 200)
- `page(:page, :size)` - Get a page of entries with a specific page size

### Basic

If endpoints are neither bulk expanding nor paginated, you can usually access the resource using the `get()` method. There are some exceptions to this, which are documented in the "Available Endpoints" section below.

### Authenticated

All of the endpoints which fetch account data require the use of an API key. This key can be generated on the [official website](https://account.arena.net/applications). The data is always only for the account of the generated API key. You can authenticate the client using the following method:

```js
client.authenticate('XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXXXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX')
client.authenticate('...').account().get()
```

### Localized

Localized endpoints can return resources in multiple languages. You can set the desired response language via the following method:

```js
client.language('de')
client.language('de').items().all()
```

## Available Endpoints

- [`api().account()`](#apiaccount) - Information about the player's account.
- [`api().account().achievements()`](#apiaccountachievements) - The account's progress towards their achievements.
- [`api().account().bank()`](#apiaccountbank) - The items stored in the player's bank.
- [`api().account().characters()`](#apiaccountcharacters) - Alternative method of calling [`api().characters()`](#apicharacters).
- [`api().account().dailycrafting()`](#apiaccountdailycrafting) - The completed daily crafting for the account.
- [`api().account().dungeons()`](#apiaccountdungeons) - The completed dungeons of the current daily.
- [`api().account().dyes()`](#apiaccountdyes) - The unlocked dyes of the account.
- [`api().account().finishers()`](#apiaccountfinishers) - The unlocked finishers of the account.
- [`api().account().gliders()`](#apiaccountgliders) - The unlocked gliders of the account.
- [`api().account().home().cats()`](#apiaccounthomecats) - The unlocked cats in the home instance of the account.
- [`api().account().home().nodes()`](#apiaccounthomenodes) - The unlocked nodes in the home instance of the account.
- [`api().account().inventory()`](#apiaccountinventory) - The shared inventory slots of the account.
- [`api().account().luck()`](#apiaccountluck) - The total luck of the account.
- [`api().account().mailcarriers()`](#apiaccountmailcarriers) - The unlocked mailcarriers of the account.
- [`api().account().mapchests()`](#apiaccountmapchests) - The completed daily mapchests of the account.
- [`api().account().masteries()`](#apiaccountmasteries) - The unlocked masteries of the account.
- [`api().account().mastery().points()`](#apiaccountmasterypoints) - The unlocked mastery points of the account.
- [`api().account().materials()`](#apiaccountmaterials) - The materials stored in the account's material storage.
- [`api().account().minis()`](#apiaccountminis) - The unlocked miniatures of the account.
- [`api().account().mounts().skins()`](#apiaccountmountsskins) - The unlocked mount skins of the account.
- [`api().account().mounts().types()`](#apiaccountmountstypes) - The unlocked mount types of the account.
- [`api().account().outfits()`](#apiaccountoutfits) - The unlocked outfits of the account.
- [`api().account().novelties()`](#apiaccountnovelties) - The unlocked novelties of the account.
- [`api().account().pvp()`](#apiaccountpvp) - Alternative method of calling [`api().pvp()`](#apipvpamulets).
- [`api().account().pvp().heroes()`](#apiaccountpvpheroes) - The unlocked pvp heroes of the account.
- [`api().account().raids()`](#apiaccountraids) - The completed raids of the current weekly.
- [`api().account().recipes()`](#apiaccountrecipes) - The unlocked recipes of the account. 
- [`api().account().skins()`](#apiaccountskins) - The unlocked skins of the account. 
- [`api().account().titles()`](#apiaccounttitles) - The unlocked titles of the account. 
- [`api().account().transactions()`](#apiaccounttransactions) - Alternative method of calling [`api().commerce().transactions()`](#apicommercetransactionscurrentbuys).
- [`api().account().delivery()`](#apiaccountdelivery) - Alternative method of calling [`api().commerce().delivery()`](#apicommercedelivery).
- [`api().account().wallet()`](#apiaccountwallet) - The currencies owned by the account. 
- [`api().account().worldbosses()`](#apiaccountworldbosses) - The daily worldbosses completed by the account. 
- [`api().achievements()`](#apiachievements) - Information about achievements.
- [`api().achievements().categories()`](#apiachievementscategories) - The categories for achievements.
- [`api().achievements().groups()`](#apiachievementsgroups) - The top-level groups for achievements.
- [`api().achievements().daily()`](#apiachievementsdaily) - The current set of daily achievements.
- [`api().achievements().dailyTomorrow()`](#apiachievementsdailyTomorrow) - The next set of daily achievements.
- [`api().backstory().answers()`](#apibackstoryanswers) - Information about biography answers.
- [`api().backstory().questions()`](#apibackstoryquestions) - Information about biography questions.
- [`api().build()`](#apibuild) - The current game build id.
- [`api().cats()`](#apicats) - (Deprecated) Information about home instance cats.
- [`api().characters()`](#apicharacters) - Information about characters of the account.
- [`api().characters(:name).backstory()`](#apicharactersnamebackstory) - Backstory information of a single character.
- [`api().characters(:name).core()`](#apicharactersnamecore) - Core information (name, race, ...) of a single character.
- [`api().characters(:name).crafting()`](#apicharactersnamecrafting) - Crafting disciplines of a single character.
- [`api().characters(:name).equipment()`](#apicharactersnameequipment) - Equipment of a single character.
- [`api().characters(:name).heropoints()`](#apicharactersnameheropoints) - Heropoint information of a single character.
- [`api().characters(:name).inventory()`](#apicharactersnameinventory) - Inventory of a single character.
- [`api().characters(:name).quests()`](#apicharactersnamequests) - Completed quests of a single character.
- [`api().characters(:name).recipes()`](#apicharactersnamerecipes) - Unlocked recipes of a single character.
- [`api().characters(:name).sab()`](#apicharactersnamesab) - Zone progress and unlocks in the SAB for this character.
- [`api().characters(:name).skills()`](#apicharactersnameskills) - Skills in use by a single character.
- [`api().characters(:name).specializations()`](#apicharactersnamespecializations) - Specialization information of a single character.
- [`api().characters(:name).training()`](#apicharactersnametraining) - Mastery training information of a single character.
- [`api().colors()`](#apicolors) - Information about dye colors, including their color component information.
- [`api().commerce().delivery()`](#apicommercedelivery) - Current coins and items in the delivery box of the trading post.
- [`api().commerce().exchange()`](#apicommerceexchange) - Current exchange rates for coins to gems and gems to coins.
- [`api().commerce().listings()`](#apicommercelistings) - Current buy and sell listings from the trading post.
- [`api().commerce().prices()`](#apicommerceprices) - Current aggregated buy and sell listing information from the trading post.
- [`api().commerce().transactions().current().buys()`](#apicommercetransactionscurrentbuys) - Current buy transactions of the player.
- [`api().commerce().transactions().current().sells()`](#apicommercetransactionscurrentsells) - Current sell transactions of the player.
- [`api().commerce().transactions().history().buys()`](#apicommercetransactionshistorybuys) - Historical buy transactions of the player.
- [`api().commerce().transactions().history().sells()`](#apicommercetransactionshistorysells) - Historical sell transactions of the player.
- [`api().continents()`](#apicontinents) - Information about continents.
- [`api().continents().floors(:id)`](#apicontinentsfloorsid) - Information about a continents' floors.
- [`api().currencies()`](#apicurrencies) - Information about currencies.
- [`api().dailycrafting()`](#apidailycrafting) - Information about daily craftable items.
- [`api().dungeons()`](#apidungeons) - Information about dungeons, including their paths.
- [`api().emblem().backgrounds()`](#apiemblembackgrounds) - The guild emblem's background images.
- [`api().emblem().foregrounds()`](#apiemblemforegrounds) - The guild emblem's foreground images.
- [`api().events()`](#apievents) - Information about events.
- [`api().files()`](#apifiles) - Commonly requested assets that may be used to enhance API-derived applications.
- [`api().finishers()`](#apifinishers) - Information about finishers.
- [`api().gliders()`](#apigliders) - Information about gliders.
- [`api().guild()`](#apiguild) - Core details about a given guild.
- [`api().guild().permissions()`](#apiguildpermissions) - Information about all guild permissions.
- [`api().guild().search().name(:name)`](#apiguildsearchnamename) - Search for guild ids using a guild name.
- [`api().guild().upgrades()`](#apiguildupgrades) - Information about all guild hall upgrades, including scribe decorations.
- [`api().guild(:id).upgrades()`](#apiguildidupgrades) - Information about the guild's upgrades.
- [`api().guild(:id).log()`](#apiguildidlog) - Information about certain events in the guild's log.
- [`api().guild(:id).members()`](#apiguildidmembers) - Information about the members of the guild.
- [`api().guild(:id).ranks()`](#apiguildidranks) - Information about the ranks of the guild.
- [`api().guild(:id).stash()`](#apiguildidstash) - Information about the items in the guild's vault.
- [`api().guild(:id).storage()`](#apiguildidstorage) - Information about the stored guild upgrades.
- [`api().guild(:id).teams()`](#apiguildidteams) - Information about the teams in the guild.
- [`api().guild().treasury()`](#apiguildtreasury) - Information about the items in the guild's treasury.
- [`api().home().cats()`](#apihomecats) - Information about home instance cats.
- [`api().home().nodes()`](#apihomenodes) - Information about home instance nodes.
- [`api().items()`](#apiitems) - Information about items that were discovered by players.
- [`api().itemstats()`](#apiitemstats) - Information about stats for items.
- [`api().mailcarriers()`](#apimailcarriers) - Information about mailcarriers.
- [`api().legends()`](#apilegends) - Information about the revenant's legends.
- [`api().mapchests()`](#apimapchests) - Information about daily claimable map chests.
- [`api().maps()`](#apimaps) - Details about maps, including details about floor and translation data on how to translate between world coordinates and map 
- [`api().masteries()`](#apimasteries) - Information about the masteries.
- [`api().materials()`](#apimaterials) - Information about the categories and items in the material storage.
- [`api().minis()`](#apiminis) - Information about miniatures.
- [`api().mounts().skins()`](#apimountsskins) - Information about mount skins.
- [`api().mounts().types()`](#apimountstypes) - Information about mount types.
- [`api().nodes()`](#apinodes) - (Deprecated) Information about home instance nodes.
- [`api().novelties()`](#apinovelties) - Information about novelties.
- [`api().outfits()`](#apioutfits) - Information about outfits.
- [`api().pets()`](#apipets) - Information about the ranger's pets.
- [`api().professions()`](#apiprofessions) - Information about professions.
- [`api().pvp().amulets()`](#apipvpamulets) - Information about PvP amulets.
- [`api().pvp().games()`](#apipvpgames) - Information about past PvP matches the player has participated in.
- [`api().pvp().heroes()`](#apipvpheroes) - Information about PvP heroes.
- [`api().pvp().ranks()`](#apipvpranks) - Information about PvP ranks.
- [`api().pvp().seasons()`](#apipvpseasons) - Information about league seasons.
- [`api().pvp().seasons(:id).leaderboards()`](#apipvpseasonsidleaderboards) - Information about available leaderboards for a league season.
- [`api().pvp().seasons(:id).leaderboards().board(:board, :region)`](#apipvpseasonsidleaderboardsboardboardregion) - Leaderboards for a PvP league season in a specific region.
- [`api().pvp().standings()`](#apipvpstandings) - Information about the player standings in the league seasons.
- [`api().pvp().stats()`](#apipvpstats) - Information about wins and losses of the account's PvP matches.
- [`api().quaggans()`](#apiquaggans) - Quaggan images.
- [`api().quests()`](#apiquests) - Information about quests.
- [`api().races()`](#apiraces) - Information about races and their available skills.
- [`api().raids()`](#apiraids) - Information about raids, including their bosses.
- [`api().recipes()`](#apirecipes) - Information about discovered recipes.
- [`api().recipes().search()`](#apirecipessearch) - Search for a recipe based on input or output items.
- [`api().skills()`](#apiskills) - Information about skills usable by players.
- [`api().skins()`](#apiskins) - Information about available skins.
- [`api().specializations()`](#apispecializations) - Information about currently released specializations.
- [`api().stories()`](#apistories) - Information about the "Story Journal" stories, including the personal story and living world.
- [`api().stories().seasons()`](#apistoriesseasons) - Information about the "Story Journal" seasons
- [`api().titles()`](#apititles) - Information about titles.
- [`api().tokeninfo()`](#apitokeninfo) - Information about the supplied API key.
- [`api().traits()`](#apitraits) - Information about specific traits, which are contained within specializations.
- [`api().worlds()`](#apiworlds) - Information about the available worlds / servers.
- [`api().worldbosses()`](#apiworldbosses) - Information about the available worldbosses.
- [`api().wvw().abilities()`](#apiwvwabilities) - Information about the abilities available in WvW.
- [`api().wvw().matches()`](#apiwvwmatches) - Details about WvW matches, including the total score, kills and deaths and further details for each map.
- [`api().wvw().matches().overview()`](#apiwvwmatchesoverview) - Overview about WvW matches, shows the participating worlds.
- [`api().wvw().matches().scores()`](#apiwvwmatchesscores) - Scores of the WvW matches.
- [`api().wvw().matches().stats()`](#apiwvwmatchesstats) - Stats of the WvW matches, includes kills, deaths, etc.
- [`api().wvw().matches().stats(:id).teams(:team).top(:which)`](#apiwvwmatchesstatsidteamsteamtopwhich) - Top 10 Guilds per team by KDR/Kills
- [`api().wvw().objectives()`](#apiwvwobjectives) - Details about WvW objectives such as camps, towers, and keeps.
- [`api().wvw().upgrades()`](#apiwvwupgrades) - Information about WvW upgrades.
- [`api().wvw().ranks()`](#apiwvwranks) - Information about WvW ranks.

## Detailed Endpoints

### `api().account()`

> Information about the player's account.

- **API-URL:** [/v2/account](https://api.guildwars2.com/v2/account)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes
- **This endpoint additionally exposes the following methods:**
  - `blob()` - All data available for the account in a single object

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().achievements()`

> The account's progress towards their achievements.

- **API-URL:** [/v2/account/achievements](https://api.guildwars2.com/v2/account/achievements)
- **Paginated:** Yes
- **Bulk expanding:** Partially
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes
- **This endpoint behaves differently than usual bulk expanded endpoints:**
  - `ids()` - Not supported
  - `get()` - All achievements of the account (same as `all()` and analogue to the other ["basic"](#basic) account endpoints)
  - All other paginated and bulk expanding methods (`get(:id)`, `page(:page)`, etc.) are behaving as described [here](#endpoint-behaviour)

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().bank()`

> The items stored in the player's bank.

- **API-URL:** [/v2/account/bank](https://api.guildwars2.com/v2/account/bank)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().characters()`

Alternative method of calling [`api().characters()`](#apicharacters).

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().delivery()`

Alternative method of calling [`api().commerce().delivery()`](#apicommercedelivery).

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().dailycrafting()`

> The completed daily crafting of the account.

- **API-URL:** [/v2/account/dailycrafting](https://api.guildwars2.com/v2/account/dailycrafting)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().dungeons()`

> The completed dungeons of the current daily.

- **API-URL:** [/v2/account/dungeons](https://api.guildwars2.com/v2/account/dungeons)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().dyes()`

> The unlocked dyes of the account.

- **API-URL:** [/v2/account/dyes](https://api.guildwars2.com/v2/account/dyes)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().finishers()`

> The unlocked finishers of the account.

- **API-URL:** [/v2/account/finishers](https://api.guildwars2.com/v2/account/finishers)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().gliders()`

> The unlocked gliders of the account.

- **API-URL:** [/v2/account/gliders](https://api.guildwars2.com/v2/account/gliders)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().home().cats()`

> The unlocked cats in the home instance of the account.

- **API-URL:** [/v2/account/home/cats](https://api.guildwars2.com/v2/account/home/cats)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().home().nodes()`

> The unlocked nodes in the home instance of the account.

- **API-URL:** [/v2/account/home/nodes](https://api.guildwars2.com/v2/account/home/nodes)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().inventory()`

> The shared inventory slots of the account.

- **API-URL:** [/v2/account/inventory](https://api.guildwars2.com/v2/account/inventory)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().luck()`

> The total luck of the account.

- **API-URL:** [/v2/account/luck](https://api.guildwars2.com/v2/account/luck)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes
- **This endpoint behaves differently than the API:**
  - This endpoint returns the luck value directly.

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().mailcarriers()`

> The unlocked mailcarriers of the account.

- **API-URL:** [/v2/account/mailcarriers](https://api.guildwars2.com/v2/account/mailcarriers)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().mapchests()`

> The completed daily mapchests of the account.

- **API-URL:** [/v2/account/mapchests](https://api.guildwars2.com/v2/account/mapchests)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().masteries()`

> The unlocked masteries of the account.

- **API-URL:** [/v2/account/masteries](https://api.guildwars2.com/v2/account/masteries)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().mastery().points()`

> The unlocked mastery points of the account.

- **API-URL:** [/v2/account/mastery/points](https://api.guildwars2.com/v2/account/mastery/points)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().materials()`

> The materials stored in the account's material storage.

- **API-URL:** [/v2/account/materials](https://api.guildwars2.com/v2/account/materials)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().minis()`

> The unlocked miniatures of the account.

- **API-URL:** [/v2/account/minis](https://api.guildwars2.com/v2/account/minis)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().mounts().skins()`

> The unlocked mount skins of the account.

- **API-URL:** [/v2/account/mounts/skins](https://api.guildwars2.com/v2/account/mounts/skins)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().mounts().types()`

> The unlocked mount types of the account.

- **API-URL:** [/v2/account/mounts/types](https://api.guildwars2.com/v2/account/mounts/types)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().outfits()`

> The unlocked outfits of the account.

- **API-URL:** [/v2/account/outfits](https://api.guildwars2.com/v2/account/outfits)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().novelties()`

> The unlocked novelties of the account.

- **API-URL:** [/v2/account/novelties](https://api.guildwars2.com/v2/account/novelties)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().pvp()`

Alternative method of calling [`api().pvp()`](#apipvpamulets).

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().pvp().heroes()`

> The unlocked pvp heroes of this account.

- **API-URL:** [/v2/account/pvp/heroes](https://api.guildwars2.com/v2/account/pvp/heroes)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().raids()`

> The completed raids of the current weekly.

- **API-URL:** [/v2/account/raids](https://api.guildwars2.com/v2/account/raids)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().recipes()`

> The unlocked recipes of the account. 

- **API-URL:** [/v2/account/recipes](https://api.guildwars2.com/v2/account/recipes)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().skins()`

> The unlocked skins of the account. 

- **API-URL:** [/v2/account/skins](https://api.guildwars2.com/v2/account/skins)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().titles()`

> The unlocked titles of the account. 

- **API-URL:** [/v2/account/titles](https://api.guildwars2.com/v2/account/titles)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().transactions()`

Alternative method of calling [`api().commerce().transactions()`](#apicommercetransactionscurrentbuys).

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().wallet()`

> The currencies owned by the account. 

- **API-URL:** [/v2/account/wallet](https://api.guildwars2.com/v2/account/wallet)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().account().worldbosses()`

> The daily worldbosses completed by the account.

- **API-URL:** [/v2/account/worldbosses](https://api.guildwars2.com/v2/account/worldbosses)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().achievements()`

> Information about achievements.

- **API-URL:** [/v2/achievements](https://api.guildwars2.com/v2/achievements)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().achievements().categories()`

> The categories for achievements.

- **API-URL:** [/v2/achievements/categories](https://api.guildwars2.com/v2/achievements/categories)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().achievements().groups()`

> The top-level groups for achievements.

- **API-URL:** [/v2/achievements/groups](https://api.guildwars2.com/v2/achievements/groups)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().achievements().daily()`

> The current set of daily achievements.

- **API-URL:** [/v2/achievements/daily](https://api.guildwars2.com/v2/achievements/daily)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 60 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().achievements().dailyTomorrow()`

> The next set of daily achievements.

- **API-URL:** [/v2/achievements/daily/tomorrow](https://api.guildwars2.com/v2/achievements/daily/tomorrow)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 60 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().backstory().answers()`

> Information about biography answers.

- **API-URL:** [/v2/backstory/answers](https://api.guildwars2.com/v2/backstory/answers)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().backstory().questions()`

> Information about biography questions.

- **API-URL:** [/v2/backstory/questions](https://api.guildwars2.com/v2/backstory/questions)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().build()`

> The current game build id.

- **API-URL:** [/v2/build](https://api.guildwars2.com/v2/build)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 1 minute

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().cats()`

> Information about home instance cats.

- **DEPRECATED**
- **API-URL:** [/v2/cats](https://api.guildwars2.com/v2/cats)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().characters()`

> Information about characters of the account.

- **API-URL:** [/v2/characters](https://api.guildwars2.com/v2/characters)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().characters(:name).backstory()`

> Backstory information of a single character.

- **API-URL:** [/v2/characters/:name/backstory](https://api.guildwars2.com/v2/characters/:name/backstory)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().characters(:name).core()`

> Core information (name, race, ...) of a single character.

- **API-URL:** [/v2/characters/:name/core](https://api.guildwars2.com/v2/characters/:name/core)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().characters(:name).crafting()`

> Crafting disciplines of a single character.

- **API-URL:** [/v2/characters/:name/crafting](https://api.guildwars2.com/v2/characters/:name/crafting)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().characters(:name).equipment()`

> Equipment of a single character.

- **API-URL:** [/v2/characters/:name/equipment](https://api.guildwars2.com/v2/characters/:name/equipment)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().characters(:name).heropoints()`

> Heropoint information of a single character.

- **API-URL:** [/v2/characters/:name/heropoints](https://api.guildwars2.com/v2/characters/:name/heropoints)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().characters(:name).inventory()`

> Inventory of a single character.

- **API-URL:** [/v2/characters/:name/inventory](https://api.guildwars2.com/v2/characters/:name/inventory)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().characters(:name).quests()`

> Completed quests of a single character.

- **API-URL:** [/v2/characters/:name/quests](https://api.guildwars2.com/v2/characters/:name/quests)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().characters(:name).recipes()`

> Unlocked recipes of a single character.

- **API-URL:** [/v2/characters/:name/recipes](https://api.guildwars2.com/v2/characters/:name/recipes)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().characters(:name).sab()`

> Zone progress and unlocks in the SAB for this character.

- **API-URL:** [/v2/characters/:name/sab](https://api.guildwars2.com/v2/characters/:name/sab)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().characters(:name).skills()`

> Skills in use by a single character.

- **API-URL:** [/v2/characters/:name/skills](https://api.guildwars2.com/v2/characters/:name/skills)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().characters(:name).specializations()`

> Specialization information of a single character.

- **API-URL:** [/v2/characters/:name/specializations](https://api.guildwars2.com/v2/characters/:name/specializations)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().characters(:name).training()`

> Mastery training information of a single character.

- **API-URL:** [/v2/characters/:name/training](https://api.guildwars2.com/v2/characters/:name/training)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().colors()`

> Information about dye colors, including their color component information.

- **API-URL:** [/v2/colors](https://api.guildwars2.com/v2/colors)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().commerce().delivery()`

> Current coins and items in the delivery box of the trading post.

- **API-URL:** [/v2/commerce/delivery](https://api.guildwars2.com/v2/commerce/delivery)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().commerce().exchange()`

> Current exchange rates for coins to gems and gems to coins.

- **API-URL:** [/v2/commerce/exchange](https://api.guildwars2.com/v2/commerce/exchange)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 10 minutes
- **This endpoint exposes the following methods:**
  - `gems(:quantity)` - The current exchange rate of gems to coins
  - `coins(:quantity)` - The current exchange rate of coins to gems

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().commerce().listings()`

> Current buy and sell listings from the trading post.

- **API-URL:** [/v2/commerce/listings](https://api.guildwars2.com/v2/commerce/listings)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 2 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().commerce().prices()`

> Current aggregated buy and sell listing information from the trading post.

- **API-URL:** [/v2/commerce/prices](https://api.guildwars2.com/v2/commerce/prices)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 1 minute

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().commerce().transactions().current().buys()`

> Current buy transactions of the player.

- **API-URL:** [/v2/commerce/transactions/current/buys](https://api.guildwars2.com/v2/commerce/transactions/current/buys)
- **Paginated:** Yes
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 10 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().commerce().transactions().current().sells()`

> Current sell transactions of the player.

- **API-URL:** [/v2/commerce/transactions/current/sells](https://api.guildwars2.com/v2/commerce/transactions/current/sells)
- **Paginated:** Yes
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 10 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().commerce().transactions().history().buys()`

> Historical buy transactions of the player.

- **API-URL:** [/v2/commerce/transactions/history/buys](https://api.guildwars2.com/v2/commerce/transactions/history/buys)
- **Paginated:** Yes
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 10 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().commerce().transactions().history().sells()`

> Historical sell transactions of the player.

- **API-URL:** [/v2/commerce/transactions/history/sells](https://api.guildwars2.com/v2/commerce/transactions/history/sells)
- **Paginated:** Yes
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 10 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().continents()`

> Information about continents.

- **API-URL:** [/v2/continents](https://api.guildwars2.com/v2/continents)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().continents().floors(:id)`

> Information about a continents' floors.

- **API-URL:** [/v2/continents/:id/floors](https://api.guildwars2.com/v2/continents/:id/floors)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().currencies()`

> Information about currencies.

- **API-URL:** [/v2/currencies](https://api.guildwars2.com/v2/currencies)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().dailycrafting()`

> Information about daily craftable items.

- **API-URL:** [/v2/dailycrafting](https://api.guildwars2.com/v2/dailycrafting)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().dungeons()`

> Information about dungeons, including their paths.

- **API-URL:** [/v2/dungeons](https://api.guildwars2.com/v2/dungeons)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().emblem().backgrounds()`

> The guild emblem's background images.

- **API-URL:** [/v2/emblem/backgrounds](https://api.guildwars2.com/v2/emblem/backgrounds)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().emblem().foregrounds()`

> The guild emblem's foreground images.

- **API-URL:** [/v2/emblem/foregrounds](https://api.guildwars2.com/v2/emblem/foregrounds)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().events()`

> Information about events.

- **API-URL:** [/v1/event_details.json](https://api.guildwars2.com/v1/event_details.json)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().files()`

> Commonly requested assets that may be used to enhance API-derived applications.

- **API-URL:** [/v2/files](https://api.guildwars2.com/v2/files)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().finishers()`

> Information about finishers.

- **API-URL:** [/v2/finishers](https://api.guildwars2.com/v2/finishers)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().gliders()`

> Information about gliders.

- **API-URL:** [/v2/gliders](https://api.guildwars2.com/v2/gliders)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().guild()`

> Core details about a given guild.

- **API-URL:** [/v2/guild](https://api.guildwars2.com/v2/guild)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Optional
- **Localized:** No
- **Cache time:** 60 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().guild().permissions()`

> Information about all guild permissions.

- **API-URL:** [/v2/guild/permissions](https://api.guildwars2.com/v2/guild/permissions)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().guild().search().name(:name)`

> Search for guild ids using a guild name.

- **API-URL:** [/v2/guild/search?name=:name](https://api.guildwars2.com/v2/guild/search?name=:name)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 60 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().guild().upgrades()`

> Information about all guild hall upgrades, including scribe decorations.

- **API-URL:** [/v2/guild/upgrades](https://api.guildwars2.com/v2/guild/upgrades)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().guild(:id).upgrades()`

> Information about the guild's upgrades.

- **API-URL:** [/v2/guild/:id/upgrades](https://api.guildwars2.com/v2/guild:id/upgrades)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().guild(:id).log()`

> Information about certain events in the guild's log.

- **API-URL:** [/v2/guild/:id/log](https://api.guildwars2.com/v2/guild/:id/log)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes
- **This endpoint additionally exposes the following methods:**
  - `since(:logId)` - Only get entries that are newer than the given log id

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().guild(:id).members()`

> Information about the members of the guild.

- **API-URL:** [/v2/guild/:id/members](https://api.guildwars2.com/v2/guild/:id/members)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().guild(:id).ranks()`

> Information about the ranks of the guild.

- **API-URL:** [/v2/guild/:id/ranks](https://api.guildwars2.com/v2/guild/:id/ranks)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().guild(:id).stash()`

> Information about the items in the guild's vault.

- **API-URL:** [/v2/guild/:id/stash](https://api.guildwars2.com/v2/guild/:id/stash)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().guild(:id).storage()`

> Information about the stored guild upgrades.

- **API-URL:** [/v2/guild/:id/storage](https://api.guildwars2.com/v2/guild/:id/storage)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().guild(:id).teams()`

> Information about the teams in the guild.

- **API-URL:** [/v2/guild/:id/teams](https://api.guildwars2.com/v2/guild/:id/teams)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().guild().treasury()`

> Information about the items in the guild's treasury.

- **API-URL:** [/v2/guild/:id/treasury](https://api.guildwars2.com/v2/guild/:id/treasury)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().home().cats()`

> Information about home instance cats.

- **API-URL:** [/v2/home/cats](https://api.guildwars2.com/v2/home/cats)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().home().nodes()`

> Information about home instance nodes.

- **API-URL:** [/v2/home/nodes](https://api.guildwars2.com/v2/home/nodes)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().items()`

> Information about items that were discovered by players.

- **API-URL:** [/v2/items](https://api.guildwars2.com/v2/items)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().itemstats()`

> Information about stats for items.

- **API-URL:** [/v2/itemstats](https://api.guildwars2.com/v2/itemstats)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().legends()`

> Information about the revenant's legends.

- **API-URL:** [/v2/legends](https://api.guildwars2.com/v2/legends)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().mailcarriers()`

> Information about mailcarriers.

- **API-URL:** [/v2/mailcarriers](https://api.guildwars2.com/v2/mailcarriers)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().mapchests()`

> Information about daily claimable map chests.

- **API-URL:** [/v2/mapchests](https://api.guildwars2.com/v2/mapchests)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().maps()`

> Details about maps, including details about floor and translation data on how to translate between world coordinates and map coordinates.

- **API-URL:** [/v2/maps](https://api.guildwars2.com/v2/maps)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().masteries()`

> Information about the masteries.

- **API-URL:** [/v2/masteries](https://api.guildwars2.com/v2/masteries)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().materials()`

> Information about the categories and items in the material storage.

- **API-URL:** [/v2/materials](https://api.guildwars2.com/v2/materials)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().minis()`

> Information about miniatures.

- **API-URL:** [/v2/minis](https://api.guildwars2.com/v2/minis)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().mounts().skins()`

> Information about mount skins.

- **API-URL:** [/v2/mounts/skins](https://api.guildwars2.com/v2/mounts/skins)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().mounts().types()`

> Information about mount types.

- **API-URL:** [/v2/mounts/types](https://api.guildwars2.com/v2/mounts/types)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().nodes()`

> Information about home instance nodes.

- **DEPRECATED**
- **API-URL:** [/v2/nodes](https://api.guildwars2.com/v2/nodes)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().novelties()`

> Information about novelties.

- **API-URL:** [/v2/novelties](https://api.guildwars2.com/v2/novelties)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().outfits()`

> Information about outfits.

- **API-URL:** [/v2/outfits](https://api.guildwars2.com/v2/outfits)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().pets()`

> Information about the ranger's pets.

- **API-URL:** [/v2/pets](https://api.guildwars2.com/v2/pets)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().professions()`

> Information about professions.

- **API-URL:** [/v2/professions](https://api.guildwars2.com/v2/professions)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().pvp().amulets()`

> Information about PvP amulets.

- **API-URL:** [/v2/pvp/amulets](https://api.guildwars2.com/v2/pvp/amulets)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().pvp().games()`

> Information about past PvP matches the player has participated in.

- **API-URL:** [/v2/pvp/games](https://api.guildwars2.com/v2/pvp/games)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().pvp().heroes()`

> Information about PvP heroes.

- **API-URL:** [/v2/pvp/heroes](https://api.guildwars2.com/v2/pvp/heroes)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().pvp().ranks()`

> Information about PvP ranks.

- **API-URL:** [/v2/pvp/ranks](https://api.guildwars2.com/v2/pvp/ranks)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().pvp().seasons()`

> Information about league seasons.

- **API-URL:** [/v2/pvp/seasons](https://api.guildwars2.com/v2/pvp/seasons)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().pvp().seasons(:id).leaderboards()`

> Information about available leaderboards for a league season.

- **API-URL:** [/v2/pvp/seasons/:id/leaderboards](https://api.guildwars2.com/v2/pvp/seasons/:id/leaderboards)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours
- **This endpoint exposes the following methods:**
  - `ids()` - Available leaderboards for a league season.

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().pvp().seasons(:id).leaderboards().board(:board, :region)`

> Leaderboards for a PvP league season in a specific region.

- **API-URL:** [/v2/pvp/seasons/:id/leaderboards/:board/:region](https://api.guildwars2.com/v2/pvp/seasons/:id/leaderboards/:board/:region)
- **Paginated:** Yes
- **Bulk expanding:** No
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().pvp().standings()`

> Information about the player standings in the league seasons.

- **API-URL:** [/v2/pvp/standings](https://api.guildwars2.com/v2/pvp/standings)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().pvp().stats()`

> Information about wins and losses of the account's PvP matches.

- **API-URL:** [/v2/pvp/stats](https://api.guildwars2.com/v2/pvp/stats)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 5 minutes

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().quaggans()`

> Quaggan images.

- **API-URL:** [/v2/quaggans](https://api.guildwars2.com/v2/quaggans)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().quests()`

> Information about quests.

- **API-URL:** [/v2/quests](https://api.guildwars2.com/v2/quests)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().races()`

> Information about races and their available skills.

- **API-URL:** [/v2/races](https://api.guildwars2.com/v2/races)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().raids()`

> Information about raids, including their bosses.

- **API-URL:** [/v2/raids](https://api.guildwars2.com/v2/raids)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().recipes()`

> Information about discovered recipes.

- **API-URL:** [/v2/recipes](https://api.guildwars2.com/v2/recipes)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().recipes().search()`

> Search for a recipe based on input or output items.

- **API-URL:** [/v2/recipes/search](https://api.guildwars2.com/v2/recipes/search)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 24 hours
- **This endpoint exposes the following methods:**
  - `input(:id)` - Search for recipes with this item as an ingredient
  - `output(:id)` - Search for recipes that craft this item

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().skills()`

> Information about skills usable by players.

- **API-URL:** [/v2/skills](https://api.guildwars2.com/v2/skills)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().skins()`

> Information about available skins.

- **API-URL:** [/v2/skins](https://api.guildwars2.com/v2/skins)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().specializations()`

> Information about currently released specializations.

- **API-URL:** [/v2/specializations](https://api.guildwars2.com/v2/specializations)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().stories()`

> Information about the "Story Journal" stories, including the personal story and living world.

- **API-URL:** [/v2/stories](https://api.guildwars2.com/v2/stories)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().stories().seasons()`

> Information about the "Story Journal" seasons

- **API-URL:** [/v2/stories/seasons](https://api.guildwars2.com/v2/stories/seasons)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().titles()`

> Information about titles.

- **API-URL:** [/v2/titles](https://api.guildwars2.com/v2/titles)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().tokeninfo()`

> Information about the supplied API key.

- **API-URL:** [/v2/tokeninfo](https://api.guildwars2.com/v2/tokeninfo)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** Yes
- **Localized:** No
- **Cache time:** 1 minute

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().traits()`

> Information about specific traits, which are contained within specializations.

- **API-URL:** [/v2/traits](https://api.guildwars2.com/v2/traits)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().worlds()`

> Information about the available worlds / servers.

- **API-URL:** [/v2/worlds](https://api.guildwars2.com/v2/worlds)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().worldbosses()`

> Information about the available worldbosses

- **API-URL:** [/v2/worldbosses](https://api.guildwars2.com/v2/worldbosses)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().wvw().abilities()`

> Information about the abilities available in WvW.

- **API-URL:** [/v2/wvw/abilities](https://api.guildwars2.com/v2/wvw/abilities)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().wvw().matches()`

> Details about WvW matches, including the total score, kills and deaths and further details for each map.

- **API-URL:** [/v2/wvw/matches](https://api.guildwars2.com/v2/wvw/matches)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 30 seconds
- **This endpoint additionally exposes the following methods:**
  - `world(:worldId)` - Only get details to WvW matches where the given world is participating in

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().wvw().matches().overview()`

> Overview about WvW matches, shows the participating worlds.

- **API-URL:** [/v2/wvw/matches/overview](https://api.guildwars2.com/v2/wvw/matches/overview)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 30 seconds
- **This endpoint additionally exposes the following methods:**
  - `world(:worldId)` - Only get details to WvW matches where the given world is participating in

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().wvw().matches().scores()`

> Scores of the WvW matches.

- **API-URL:** [/v2/wvw/matches/scores](https://api.guildwars2.com/v2/wvw/matches/scores)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 30 seconds
- **This endpoint additionally exposes the following methods:**
  - `world(:worldId)` - Only get details to WvW matches where the given world is participating in

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().wvw().matches().stats()`

> Stats of the WvW matches, includes kills, deaths, etc.

- **API-URL:** [/v2/wvw/matches/stats](https://api.guildwars2.com/v2/wvw/matches/stats)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 30 seconds
- **This endpoint additionally exposes the following methods:**
  - `world(:worldId)` - Only get details to WvW matches where the given world is participating in

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().wvw().matches().stats(:id).teams(:team).top(:which)`

> Top 10 Guilds for a given team in a given match ID by KDR/Kills

- **API-URL:** [/v2/wvw/matches/stats/:id/teams/:team/top/:which](https://api.guildwars2.com/v2/wvw/matches/stats/:id/teams/:team/top/:which)
- **Paginated:** No
- **Bulk expanding:** No
- **Authenticated:** No
- **Localized:** No
- **Cache time:** 30 seconds

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().wvw().objectives()`

> Details about WvW objectives such as camps, towers, and keeps.

- **API-URL:** [/v2/wvw/objectives](https://api.guildwars2.com/v2/wvw/objectives)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().wvw().upgrades()`

> Information about WvW upgrades.

- **API-URL:** [/v2/wvw/upgrades](https://api.guildwars2.com/v2/wvw/upgrades)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>

---

### `api().wvw().ranks()`

> Information about WvW ranks.

- **API-URL:** [/v2/wvw/ranks](https://api.guildwars2.com/v2/wvw/ranks)
- **Paginated:** Yes
- **Bulk expanding:** Yes
- **Authenticated:** No
- **Localized:** Yes
- **Cache time:** 24 hours

<sup>[↑ Back to the overview](#available-endpoints)</sup>
