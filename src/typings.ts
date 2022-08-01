// UI:

export enum EAboutSections {
    REGION = 'Region:',
    MODE = 'Mode:',
    ROLE = 'Role:',
    CHAMPIONS = 'Champions:'
}

export enum ERegions {
    WORLD = 'globe',
    NA = 'NA',
    EUW = 'EUW',
    EUN = 'EUN',
    OCE = 'OCE',
    KR = 'KR',
    JP = 'JP',
    BR = 'BR',
    RU = 'RU'
}

export enum EModes {
    ALL = 'All',
    RANKED_SOLODUO = 'Ranked Solo/Duo',
    RANKED_FLEX = 'Ranked Flex',
    NORMAL_DRAFT = 'Normal Draft',
    NORMAL_BLIND = 'Normal Blind',
    URF = 'URF',
    ARAM = 'ARAM'
}

export enum ERoles {
    ANY = 'Any',
    TOP = 'Top',
    JUNGLE = 'Jungle',
    MID = 'Mid',
    BOTTOM = 'Bottom',
    SUPPORT = 'Support'
}

export enum EButtonImages {
    NULL = 'image-null',
    NONE = 'image-none',
    FLAG = 'image-flag',
    ICON = 'image-icon',
    ROLE = 'image-role',
    CHAMP = 'image-champ',
    RIGHT = 'image-right'
}

export enum ETooltip {
    TOOLTIP = 'tooltip',
    LEFT = 'tooltip-text tooltip-left',
    RIGHT = 'tooltip-text tooltip-right',
    TOP = 'tooltipt-ext tooltip-top',
    BOTTOM = 'tooltip-text tooltip-bottom',
}

// MESSAGES:

export enum EEMessages {
    ESC = 'ESC',
    UNAVAILABLE = 'is either not in a game, or spectate is unavailable.'
}


// LOL:

export enum ELeagues {
    LCK = 'LCK',
    LPL = 'LPL',
    LCS = 'LCS',
    LJL = 'LJL',
    LLA = 'LLA',
}

export enum ETeams {
    DRX = 80,
    DK = 254,
    BRO = 109,
    GEN = 151,
    HLE = 194,
    KT = 338,
    KDF = 235,
    LSB = 415,
    NS = 16,
    T1 = 266,
}

export enum ETeamNames {
    DRX_SHORT = 'DRX',
    DRX_LONG = 'DRX',
    DK_SHORT = 'DK',
    DK_LONG = 'DWG KIA',
    BRO_SHORT = 'BRO',
    BRO_LONG = 'Fredit BRION',
    GEN_SHORT = 'GEN',
    GEN_LONG = 'Gen.G',
    HLE_SHORT = 'HLE',
    HLE_LONG = 'Hanwha Life',
    KT_SHORT = 'KT',
    KT_LONG = 'KT Rolster',
    KDF_SHORT = 'KDF',
    KDF_LONG = 'Kwangdong Freecs',
    LSB_SHORT = 'LSB',
    LSB_LONG = 'Liiv SANDBOX',
    NS_SHORT = 'NS',
    NS_LONG = 'NS RedForce',
    T1_SHORT = 'T1',
    T1_LONG = 'T1'
}

export enum EChampions {
    AATROX = 266,
    AHRI = 103,
    AKALI = 84,
    AKSHAN = 166,
    ALISTAR = 12,
    AMUMU = 32,
    ANIVIA = 34,
    ANNIE = 1,
    APHELIOS = 523,
    ASHE = 22,
    AURELIONSOL = 136,
    AZIR = 268,
    BARD = 432,
    BELVETH = 200,
    BLITZCRANK = 53,
    BRAND = 63,
    BRAUM = 201,
    CAITLYN = 51,
    CAMILLE = 164,
    CASSIOPEIA = 69,
    CHOGATH = 31,
    CORKI = 42,
    DARIUS = 122,
    DIANA = 131,
    DRAVEN = 119,
    DRMUNDO = 36,
    EKKO = 245,
    ELISE = 60,
    EVELYNN = 28,
    EZREAL = 81,
    FIDDLESTICKS = 9,
    FIORA = 114,
    FIZZ = 105,
    GALIO = 3,
    GANGPLANK = 41,
    GAREN = 86,
    GNAR = 150,
    GRAGAS = 79,
    GRAVES = 104,
    GWEN = 887,
    HECARIM = 120,
    HEIMERDINGER = 74,
    ILLAOI = 420,
    IRELIA = 39,
    IVERN = 427,
    JANNA = 40,
    JARVANIV = 59,
    JAX = 24,
    JAYCE = 126,
    JHIN = 202,
    JINX = 222,
    KAISA = 145,
    KALISTA = 429,
    KARMA = 43,
    KARTHUS = 30,
    KASSADIN = 38,
    KATARINA = 55,
    KAYLE = 10,
    KAYN = 141,
    KENNEN = 85,
    KHAZIX = 121,
    KINDRED = 203,
    KLED = 240,
    KOGMAW = 96,
    LEBLANC = 7,
    LEESIN = 64,
    LEONA = 89,
    LILLIA = 876,
    LISSANDRA = 127,
    LUCIAN = 236,
    LULU = 117,
    LUX = 99,
    MALPHITE = 54,
    MALZAHAR = 90,
    MAOKAI = 57,
    MASTERYI = 11,
    MISSFORTUNE = 21,
    WUKONG = 62,
    MORDEKAISER = 82,
    MORGANA = 25,
    NAMI = 267,
    NASUS = 75,
    NAUTILUS = 111,
    NEEKO = 518,
    NIDALEE = 76,
    NILAH = 895,
    NOCTURNE = 56,
    NUNU = 20,
    OLAF = 2,
    ORIANNA = 61,
    ORNN = 516,
    PANTHEON = 80,
    POPPY = 78,
    PYKE = 555,
    QIYANA = 246,
    QUINN = 133,
    RAKAN = 497,
    RAMMUS = 33,
    REKSAI = 421,
    RELL = 526,
    RENATAGLASC = 888,
    RENEKTON = 58,
    RENGAR = 107,
    RIVEN = 92,
    RUMBLE = 68,
    RYZE = 13,
    SAMIRA = 360,
    SEJUANI = 113,
    SENNA = 235,
    SERAPHINE = 147,
    SETT = 875,
    SHACO = 35,
    SHEN = 98,
    SHYVANA = 102,
    SINGED = 27,
    SION = 14,
    SIVIR = 15,
    SKARNER = 72,
    SONA = 37,
    SORAKA = 16,
    SWAIN = 50,
    SYLAS = 517,
    SYNDRA = 134,
    TAHMKENCH = 223,
    TALIYAH = 163,
    TALON = 91,
    TARIC = 44,
    TEEMO = 17,
    THRESH = 412,
    TRISTANA = 18,
    TRUNDLE = 48,
    TRYNDAMERE = 23,
    TWISTEDFATE = 4,
    TWITCH = 29,
    UDYR = 77,
    URGOT = 6,
    VARUS = 110,
    VAYNE = 67,
    VEIGAR = 45,
    VELKOZ = 161,
    VEX = 711,
    VI = 254,
    VIEGO = 234,
    VIKTOR = 112,
    VLADIMIR = 8,
    VOLIBEAR = 106,
    WARWICK = 19,
    XAYAH = 498,
    XERATH = 101,
    XINZHAO = 5,
    YASUO = 157,
    YONE = 777,
    YORICK = 83,
    YUUMI = 350,
    ZAC = 154,
    ZED = 238,
    ZERI = 221,
    ZIGGS = 115,
    ZILEAN = 26,
    ZOE = 142,
    ZYRA = 143
}