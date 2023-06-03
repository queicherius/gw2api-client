import { Schema as BaseSchema } from './schema'

import * as backstory from './responses/backstory'
import * as achievements from './responses/achievements'
import * as build from './responses/build'
import * as cats from './responses/cats'
import * as currencies from './responses/currencies'
import * as commerce from './responses/commerce'
import * as dungeons from './responses/dungeons'
import * as finishers from './responses/finishers'
import * as gliders from './responses/gliders'
import * as continents from './responses/continents'
import * as colors from './responses/colors'
import * as dailycrafting from './responses/dailycrafting'
import * as emblems from './responses/emblems'
import * as legends from './responses/legends'
import * as mailcarriers from './responses/mailcarriers'
import * as minis from './responses/minis'
import * as skins from './responses/skins'
import * as titles from './responses/titles'
import * as tokeninfo from './responses/tokeninfo'
import * as nodes from './responses/nodes'
import * as traits from './responses/traits'
import * as races from './responses/races'
import * as quaggans from './responses/quaggans'
import * as novelties from './responses/novelties'
import * as outfits from './responses/outfits'
import * as pets from './responses/pets'
import * as professions from './responses/professions'
import * as files from './responses/files'
import * as masteries from './responses/masteries'
import * as mounts from './responses/mounts'
import * as raids from './responses/raids'
import * as mapchests from './responses/mapchests'
import * as legendaryarmory from './responses/legendaryarmory'
import * as worldbosses from './responses/worldbosses'
import * as worlds from './responses/worlds'
import * as quests from './responses/quests'
import * as stories from './responses/stories'
import * as account from './responses/account'
import * as specializations from './responses/specializations'
import * as materials from './responses/materials'

export interface Schema extends BaseSchema {
    // Account
    Account: account.Schema_1970_01_01.Account
    // Achievements
    Daily: achievements.Schema_1970_01_01.Daily
    Dailies: achievements.Schema_1970_01_01.Dailies
    Category: achievements.Schema_1970_01_01.Category
    Achievement: achievements.Schema_1970_01_01.Achievement
    Group: achievements.Schema_1970_01_01.Group
    // Build 
    Build: build.Schema_1970_01_01.Build
    // Home
    Cats: cats.Schema_1970_01_01.Cat
    Nodes: nodes.Schema_1970_01_01.Nodes
    // Backstory
    Answers: backstory.Schema_1970_01_01.Answer
    Questions: backstory.Schema_1970_01_01.Question
    // Currencies
    Currencies: currencies.Schema_1970_01_01.Currency
    // Colors
    Colors: colors.Schema_1970_01_01.Color
    // Commerce
    Delivery: commerce.Schema_1970_01_01.Delivery
    Exchange: commerce.Schema_1970_01_01.Exchange
    Listings: commerce.Schema_1970_01_01.Listing
    Prices: commerce.Schema_1970_01_01.Price
    Transactions: commerce.Schema_1970_01_01.Transactions
    // Dailycrafting
    Dailycrafting: dailycrafting.Schema_1970_01_01.DailyCrafting
    // Dungeon
    Dungeons: dungeons.Schema_1970_01_01.Dungeon
    // Emblem
    Emblem: emblems.Schema_1970_01_01.Emblem
    // Files
    Files: files.Schema_1970_01_01.File
    // Finisher
    Finishers: finishers.Schema_1970_01_01.Finisher
    // Gliders
    Gliders: gliders.Schema_1970_01_01.Glider
    // Continents
    Continents: continents.Schema_1970_01_01.Continent
    Floor: continents.Schema_1970_01_01.Floor
    // Quests
    Quests: quests.Schema_1970_01_01.Quest
    // Legendary Armory
    LegendaryArmory: legendaryarmory.Schema_1970_01_01.Legendaryarmory
    // Legends
    Legends: legends.Schema_1970_01_01.Legend
    // Mailcarriers
    Mailcarriers: mailcarriers.Schema_1970_01_01.Mailcarrier
    // Mapchests
    Mapchests: mapchests.Schema_1970_01_01.Mapchest
    // Masteries
    Masteries: masteries.Schema_1970_01_01.Mastery
    // Materials
    Materials: materials.Schema_1970_01_01.Material
    // Mounts
    MountType: mounts.Schema_1970_01_01.Type
    MountSkin: mounts.Schema_1970_01_01.Skin
    // Minis
    Minis: minis.Schema_1970_01_01.Mini
    // Novelties
    Novelties: novelties.Schema_1970_01_01.Novelty
    // Outfits
    Outfits: outfits.Schema_1970_01_01.Outfit
    // Pets
    Pets: pets.Schema_1970_01_01.Pet
    // Professions
    Professions: professions.Schema_1970_01_01.Profession
    // Quaggans
    Quaggans: quaggans.Schema_1970_01_01.Quaggan
    // Races
    Races: races.Schema_1970_01_01.Race
    // Raid
    Raid: raids.Schema_1970_01_01.Raid
    // Specializations
    Specializations: specializations.Schema_1970_01_01.Specialization
    // Stories
    Stories: stories.Schema_1970_01_01.Story
    // Titles
    Titles: titles.Schema_1970_01_01.Title
    // Tokeninfo
    Tokeninfo: tokeninfo.Schema_1970_01_01.TokenInfo
    // Trait
    Traits: traits.Schema_1970_01_01.Trait
    // Skins
    Skins: skins.Schema_1970_01_01.Skin
    // Worlds
    Worlds: worlds.Schema_1970_01_01.World
    // Worldbosses
    Worldbosses: worldbosses.Schema_1970_01_01.Worldboss
}
