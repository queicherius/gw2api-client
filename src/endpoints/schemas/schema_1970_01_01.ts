import { Schema as BaseSchema } from './schema'

import { Schema_1970_01_01 as backstory } from './responses/backstory'
import { Schema_1970_01_01 as achievements } from './responses/achievements'
import { Schema_1970_01_01 as build } from './responses/build'
import { Schema_1970_01_01 as cats } from './responses/cats'
import { Schema_1970_01_01 as currencies } from './responses/currencies'
import { Schema_1970_01_01 as commerce } from './responses/commerce'
import { Schema_1970_01_01 as dungeons } from './responses/dungeons'
import { Schema_1970_01_01 as finishers } from './responses/finishers'
import { Schema_1970_01_01 as gliders } from './responses/gliders'
import { Schema_1970_01_01 as continents } from './responses/continents'
import { Schema_1970_01_01 as colors } from './responses/colors'
import { Schema_1970_01_01 as dailycrafting } from './responses/dailycrafting'
import { Schema_1970_01_01 as emblems } from './responses/emblems'
import { Schema_1970_01_01 as legends } from './responses/legends'
import { Schema_1970_01_01 as mailcarriers } from './responses/mailcarriers'
import { Schema_1970_01_01 as minis } from './responses/minis'
import { Schema_1970_01_01 as skins } from './responses/skins'
import { Schema_1970_01_01 as titles } from './responses/titles'
import { Schema_1970_01_01 as tokeninfo } from './responses/tokeninfo'
import { Schema_1970_01_01 as nodes } from './responses/nodes'
import { Schema_1970_01_01 as traits } from './responses/traits'
import { Schema_1970_01_01 as races } from './responses/races'
import { Schema_1970_01_01 as quaggans } from './responses/quaggans'
import { Schema_1970_01_01 as novelties } from './responses/novelties'
import { Schema_1970_01_01 as outfits } from './responses/outfits'
import { Schema_1970_01_01 as pets } from './responses/pets'
import { Schema_1970_01_01 as professions } from './responses/professions'
import { Schema_1970_01_01 as files } from './responses/files'
import { Schema_1970_01_01 as masteries } from './responses/masteries'
import { Schema_1970_01_01 as mounts } from './responses/mounts'
import { Schema_1970_01_01 as raids } from './responses/raids'
import { Schema_1970_01_01 as mapchests } from './responses/mapchests'
import { Schema_1970_01_01 as legendaryarmory } from './responses/legendaryarmory'
import { Schema_1970_01_01 as worldbosses } from './responses/worldbosses'
import { Schema_1970_01_01 as worlds } from './responses/worlds'
import { Schema_1970_01_01 as quests } from './responses/quests'
import { Schema_1970_01_01 as stories } from './responses/stories'
import { Schema_1970_01_01 as account } from './responses/account'
import { Schema_1970_01_01 as specializations } from './responses/specializations'
import { Schema_1970_01_01 as materials } from './responses/materials'
import { Schema_1970_01_01 as guilds } from './responses/guilds'
import { Schema_1970_01_01 as characters } from './responses/characters'
import { Schema_1970_01_01 as skills } from './responses/skills'
import { Schema_1970_01_01 as events } from './responses/events'
import { Schema_1970_01_01 as items } from './responses/items'
import { Schema_1970_01_01 as itemstats } from './responses/itemstats'
import { Schema_1970_01_01 as maps } from './responses/maps'
import { Schema_1970_01_01 as wvw } from './responses/wvw'

export interface Schema extends BaseSchema {
    // Account
    Account: account.Account
    // Achievements
    Daily: achievements.Daily
    Dailies: achievements.Dailies
    Category: achievements.Category
    Achievement: achievements.Achievement
    Group: achievements.Group
    // Build 
    Build: build.Build
    // Character
    Core: characters.Core
    Equipment: characters.Equipment
    Crafting: characters.Crafting
    BuildTabs: characters.BuildTabs
    EquipmentTabs: characters.EquipmentTabs
    Inventory: characters.Inventory
    Recipe: characters.Recipe
    // FIXME: really need to nest! Collision with Skills
    cSkills: characters.Skills
    // FIXME: duplicate?
    CharacterSpecializations: characters.Specializations
    Training: characters.Training
    // Home
    Cats: cats.Cat
    Nodes: nodes.Nodes
    // Backstory
    Answers: backstory.Answer
    Questions: backstory.Question
    // Currencies
    Currencies: currencies.Currency
    // Colors
    Colors: colors.Color
    // Commerce
    Delivery: commerce.Delivery
    Exchange: commerce.Exchange
    Listings: commerce.Listing
    Prices: commerce.Price
    Transactions: commerce.Transactions
    // Dailycrafting
    Dailycrafting: dailycrafting.DailyCrafting
    // Dungeon
    Dungeons: dungeons.Dungeon
    // Emblem
    Emblem: emblems.Emblem
    // Events
    Events: events.EventDetails
    // Files
    Files: files.File
    // Finisher
    Finishers: finishers.Finisher
    // Gliders
    Gliders: gliders.Glider
    // Guilds
    Guilds: guilds.Guild
    Logs: guilds.Log
    Members: guilds.Member
    Ranks: guilds.Rank
    Stash: guilds.Stash
    Storage: guilds.Storage
    Team: guilds.Team
    Treasury: guilds.Treasury
    Upgrades: guilds.Upgrade
    Permissions: guilds.Permission
    Search: guilds.Search
    // Items
    BackItems: items.BackItem
    Bags: items.Bag
    Consumables: items.Consumable
    Containers: items.Container
    Gathering: items.Gathering
    Gizmos: items.Gizmo
    Miniatures: items.Miniature
    SalvageKits: items.SalvageKit
    Trinket: items.Trinket
    UpgradeComponent: items.UpgradeComponent
    Weapons: items.Weapon
    Armor: items.Armor
    // Itemstats
    Itemstats: itemstats.Itemstats
    // Continents
    Continents: continents.Continent
    Floor: continents.Floor
    // Quests
    Quests: quests.Quest
    // Legendary Armory
    LegendaryArmory: legendaryarmory.Legendaryarmory
    // Legends
    Legends: legends.Legend
    // Mailcarriers
    Mailcarriers: mailcarriers.Mailcarrier
    Map: maps.Map
    // Mapchests
    Mapchests: mapchests.Mapchest
    // Masteries
    Masteries: masteries.Mastery
    // Materials
    Materials: materials.Material
    // Mounts
    MountType: mounts.Type
    MountSkin: mounts.Skin
    // Minis
    Minis: minis.Mini
    // Novelties
    Novelties: novelties.Novelty
    // Outfits
    Outfits: outfits.Outfit
    // Pets
    Pets: pets.Pet
    // Professions
    Professions: professions.Profession
    // Quaggans
    Quaggans: quaggans.Quaggan
    // Races
    Races: races.Race
    // Raid
    Raid: raids.Raid
    // Specializations
    Specializations: specializations.Specialization
    // Stories
    Stories: stories.Story
    // Titles
    Titles: titles.Title
    // Tokeninfo
    Tokeninfo: tokeninfo.TokenInfo
    // Trait
    Traits: traits.Trait
    Skills: skills.Skill
    // Skins
    Skins: skins.Skin
    // Worlds
    Worlds: worlds.World
    // Worldbosses
    Worldbosses: worldbosses.Worldboss
    // WvW
    Abilities: wvw.Ability
    Matches: wvw.Match
    Objective: wvw.Objective
    // FIXME: collision!
    wRanks: wvw.Rank
    Upgrade: wvw.Upgrade
}
