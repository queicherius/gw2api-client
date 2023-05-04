import { Schema as BaseSchema } from './schema'

import * as backstory from './responses/backstory'
import * as achievements from './responses/achievements'
import * as build from './responses/build'
import * as cats from './responses/cats'
import * as currencies from './responses/currencies'
import * as dungeons from './responses/dungeons'
import * as gliders from './responses/gliders'
import * as continents from './responses/continents'
import * as colors from './responses/colors'
import * as dailycrafting from './responses/dailycrafting'
import * as emblems from './responses/emblems'
import * as minis from './responses/minis'
import * as skins from './responses/skins'
import * as titles from './responses/titles'
import * as tokeninfo from './responses/tokeninfo'
import * as nodes from './responses/nodes'

export interface Schema extends BaseSchema {
    // Achievements
    Daily: achievements.Schema_1970_01_01.Daily
    Dailies: achievements.Schema_1970_01_01.Dailies
    Category: achievements.Schema_1970_01_01.Category
    Achievement: achievements.Schema_1970_01_01.Achievement
    Group: achievements.Schema_1970_01_01.Group
    // Build 
    Build: build.Schema_1970_01_01.Build
    // Cats
    Cats: cats.Schema_1970_01_01.Cat
    // Backstory
    Answers: backstory.Schema_1970_01_01.Answer
    Questions: backstory.Schema_1970_01_01.Question
    // Currencies
    Currencies: currencies.Schema_1970_01_01.Currency
    // Colors
    Colors: colors.Schema_1970_01_01.Color
    // Dailycrafting
    Dailycrafting: dailycrafting.Schema_1970_01_01.DailyCrafting
    // Dungeon
    Dungeons: dungeons.Schema_1970_01_01.Dungeon
    // Emblem
    Emblem: emblems.Schema_1970_01_01.Emblem
    // Gliders
    Gliders: gliders.Schema_1970_01_01.Glider
    // Continents
    Continents: continents.Schema_1970_01_01.Continent
    // Minis
    Minis: minis.Schema_1970_01_01.Mini
    // Nodes
    Nodes: nodes.Schema_1970_01_01.Nodes
    // Titles
    Titles: titles.Schema_1970_01_01.Title
    // Tokeninfo
    Tokeninfo: tokeninfo.Schema_1970_01_01.TokenInfo
    // Skins
    Skins: skins.Schema_1970_01_01.Skin
}
