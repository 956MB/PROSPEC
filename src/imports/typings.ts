// NOTE: UI:

export enum EChangeType {
    FIXED = 'FIXED',
    IMPROVED = 'IMPROVED',
    ADDED = 'ADDED',
    REMOVED = 'REMOVED'
}

export enum EAboutSections {
    REGION = 'Region:',
    MODE = 'Mode:',
    ROLE = 'Role:',
    CHAMPIONS = 'Champions:'
}

export enum ERegions {
    WORLD = 'world',
    NA = 'na',
    EUW = 'euw',
    EUN = 'eun',
    OCE = 'oce',
    KR = 'kr',
    JP = 'jp',
    BR = 'br',
    RU = 'ru'
}

export enum EModes {
    ALL = 'all',
    RANKED_SOLODUO = 'rankedSoloDuo',
    RANKED_FLEX = 'rankedFlex',
    NORMAL_DRAFT = 'normalDraft',
    NORMAL_BLIND = 'normalBlind',
    URF = 'URF',
    ARAM = 'ARAM'
}

export enum ERoles {
    ANY = 'any',
    TOP = 'top',
    JUNGLE = 'jungle',
    MIDDLE = 'middle',
    BOTTOM = 'bottom',
    SUPPORT = 'support'
}

export enum ELanguages {
    en_US = 'en_US',
    en_UK = 'en_UK',
    sv_SV = 'sv_SV',
    fi_FI = 'fi_FI',
    kr_KR = 'kr_KR',
    ja_JP = 'ja_JP',
    br_BA = 'br_BA'
}

export enum EButtonImages {
    NULL = 'image-null',
    NONE = 'image-none',
    FLAG = 'image-flag',
    ICON = 'image-icon',
    WORLD = 'image-world',
    ROLE = 'image-role',
    CHAMP = 'image-champ',
    RIGHT = 'image-right'
}

export enum ETooltip {
    TOOLTIP = 'tooltip',
    LEFT = 'tooltip-text tooltip-left',
    RIGHT = 'tooltip-text tooltip-right',
    TOP = 'tooltip-text tooltip-top',
    BOTTOM = 'tooltip-text tooltip-bottom',
    LEFTDELAY = 'tooltip-text-delay tooltip-left',
    RIGHTDELAY = 'tooltip-text-delay tooltip-right',
    TOPDELAY = 'tooltip-text-delay tooltip-top',
    BOTTOMDELAY = 'tooltip-text-delay tooltip-bottom'
}

export enum EGroupBy {
    NONE = 'NONE',
    ROLE = 'ROLE',
    TEAM = 'TEAM',
    CHAMPION = 'CHAMPION'
}

// NOTE: States

export enum ECardReducerStates {
    LEVEL = 'cardLevel',
    GAME_TIME = 'cardGameTime',
    BACKGROUND_DIR = 'cardBackgroundDir',
    MENU_OPEN = 'cardMenuOpen',
    MENU_ORIGIN = 'cardMenuOrigin',
    CARD_PRESSED = 'cardPressed',
}

export enum ESettingsStates {
    LIST_LAYOUT = 'listLayout',
    AUTO_REFRESH = 'autoRefresh',
    REFRESH_INTERVAL = 'refreshInterval',
    SHOW_SUMMONER_IDS = 'showSummonerIds',
    SHOW_RANDOM_SKINS = 'showRandomSkins',
    SHOW_TEAM_LOGOS = 'showTeamLogos',
    SHOW_UNAVAILABLE = 'showUnavailable',
    APP_THEME = 'appTheme',
    APP_SCALE = 'appScale',
    OPEN_ON_STARTUP = 'openOnStartup',
    MINIMIZE_TO_TRAY = 'minimizeToTray',
    HARDWARE_ACCELERATION = 'hardwareAcceleration',
    ANIMATIONS = 'showAnimations',
    USE_BACKGROUND = 'useBackground',
    RANDOM_BACKGROUND = 'randomBackground',
    LIVE_BACKGROUND = 'liveBackground',
    KEYBOARD_MODE = 'keyboardMode',
    NOTIFICATIONS = 'notifications',
    APP_LANGUAGE = 'appLanguage',
}

// NOTE: MESSAGES:

export enum EEMessages {
    ESC = 'ESC',
    UNAVAILABLE = 'tooltips.playerUnavailable',
    NONE_LOADED = 'tooltips.noPlayersLoaded'
}


// NOTE: LOL:

export enum ECQData {
    URL = 'https://d1fodqbtqsx6d3.cloudfront.net/${DATA}.json',
    MATCHES = 'matches',
    LEADERBOARDS = 'leaderboards'
}

export enum ELeagues {
    LCK = 'LCK',
    LPL = 'LPL',
    LCS = 'LCS',
    LJL = 'LJL',
    LLA = 'LLA',
    LEC = 'LEC',
}

export enum ETeams {
    // TODO: go back and check abbreviations
    KOI = 206, // KOI
    TF = 361, // Team Flash
    // NOTE: LCS:
    _100T = 29, // 100 Thieves
    IMM = 212, // Immortals
    CLG = 459, // Counter Logic Gaming
    EG = 267, // Evil Geniuses
    FLY = 677, // FlyQuest
    TL = 237, // Team Liquid
    TSM = 117, // TSM
    C9 = 196, // Cloud9
    DIG = 230, // Dignitas
    GG = 453, // Golden Guardians
    // NOTE: LEC:
    RGE = 903, // Rogue
    MAD = 154, // MAD Lions
    G2 = 202, // G2 Esports
    FNC = 328, // Fnatic
    VIT = 431, // Team Vitality
    AST = 619, // Astralis
    BDS = 297, // Team BDS
    MSF = 562, // Misfits Gaming
    EXC = 407, // exceL Esports
    SK = 256, // SK Gaming
    // NOTE: LCK:
    T1 = 523, // T1
    DK = 636, // DWG Gaming
    KT = 679, // KT Rolster
    NS = 718, // Nongshim RedForce
    BRO = 730, // Fredit BRION
    GEN = 445, // Gen.G
    DRX = 918, // DRX
    LSB = 526, // Liiv SANDBOX
    HLE = 339, // Hanwha Life Esports
    KDF = 813, // Kwangdong Freecs
    // NOTE: LPL:
    LNG = 186, // LNG Esports
    TES = 394, // Top Esports
    JDG = 37, // JD Gaming
    EDG = 159, // EDward Gaming
    RA = 499, // Rare Atom
    LGD = 646, // LGD Gaming
    FPX = 105, // FunPlus Phoenix
    OMG = 107, // Oh My God
    IG = 584, // Invictus Gaming
    AL = 379, // Anyone's Legend
    BBG = 969, // Bilibili Gaming
    RNG = 635, // Royal Never Give Up
    WE = 759, // Team World Elite
    TT = 378, // ThunderTalk Gaming
    UP = 231, // Ultra Prime
    V5 = 817, // Victory Five
    WG = 103, // Weibo Gaming
    // NOTE: CBLOL:
    FLG = 857, // Flamengo Los Grandes
    FUR = 781, // FURIA Esports
    INTZ = 578, // INTZ e-Sports
    RED = 382, // RED Canids
    PNG = 586, // paiN Gaming
    LLL = 155, // LOUD
    KBM = 364, // KaBuM! e-Sports
    MIN = 374, // Netshoes Miners
    VL = 396, // Vorax Liberty
    RE = 820, // Rensga Esports
    // NOTE: LCL:
    DA = 106, // Dragon Army
    CC = 475, // CrowCrowd
    OBG = 565, // One Breath Gaming
    // NOTE: LJL:
    AXIZ = 838, // AXIZ
    BC = 218, // Burning Core
    CGA = 15, // Crest Gaming Act
    DFM = 696, // DetonatioN FocusMe
    SBH = 177, // Fukuoka SoftBank Hawks gaming
    RJ = 884, // Rascal Jester
    SG = 555, // Sengoku Gaming
    V3 = 816, // V3 Esports
    // NOTE: LLA:
    R7 = 95, // Rainbow7
    AK = 735, // All Knights
    ES = 347, // Estral Esports
    INF = 805, // Infinity eSports
    ISG = 743, // Isurus Gaming
    AZE = 915, // Team Aze
    XTEN = 904, // XTEN Esports
    // NOTE: LCO:
    CEC = 978, // Chiefs Esports Club
    MAM = 371, // MAMMOTH
    ORDER = 828, // ORDER
    PEACE = 930, // PEACE
    PGG = 24, // Pentanet.GG
    // NOTE: PCS:
    PSG = 7, // PSG Talon
    BG = 683, // Beyond Gaming
    CTBC = 484, // CTBC Flying Oyster
    JT = 182, // J Team
    // NOTE: TCL:
    _5R = 687, // 5 Ronin
    BEC = 11, // Besiktas e-Sports Club
    DP = 74, // Dark Passage
    FE = 335, // Fenerbahçe Esports
    GLA = 115, // Galakticos
    GLE = 607, // Galatasaray Esports
    IWC = 990, // Istanbul Wild Cats
    NASR = 553, // NASR eSports Turkey
    SMB = 923, // SuperMassive Blaze
    TA = 369, // Team AURORA
    // NOTE: VCS:
    CE = 179, // CERBERUS Esports
    GAM = 165, // GAM Esports
    SGB = 806, // Saigon Buffalo
    TS = 865, // Team Secret
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