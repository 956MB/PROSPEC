interface IPlayer { 
    id: number;
    active: boolean;
    menuOpen: boolean;
    champion: number;
    summoner: ISummonerAccount;
    gameInfo: IGameInfo,
}
  
interface IPlayers {
    players: IPlayer[];
}

interface IOptionsButton {
    id: number;
    active: boolean;
    selected: boolean;
    type: string;
    images: string[];
    right: string;
    content: string;
}

interface IOptionsButtonChamp {
    id: number;
    active: boolean;
    type: string;
    champ: number;
    images: string[];
    right: string;
}

interface IOptionsSection {
    id: number;
    name: string;
    active: boolean;
    expanded: boolean;
    buttons: IOptionsButton[];
}

interface IOptionsSectionChamp {
    id: number;
    name: string;
    active: boolean;
    expanded: boolean;
    buttons: IOptionsButtonChamp[];
}

interface IOptionsSections {
    active: boolean;
    sections: IOptionsSection[];
}

interface IOptionsSectionsChamp {
    sections: IOptionsSectionChamp[];
}

interface ISelectedChamps {
    champs: number[];
}

interface ISummonerAccounts extends Array<ISummonerAccount>{}
interface ISummonerAccount {
    accountName: string,
    playerName: string,
    team: number,
    summonerId: string,
    summonerPuuid: string,
    region: string,
    role: string,
    stream: string,
}

interface ISummonerEntry {
    accounts: ISummonerAccount[]
}

interface ISummonerDataResponse {
    status: number,
    data: any
}

interface IGameInfo {
    region: string,
    encryptionKey: string,
    gameId: string
    gameTime: number;
}

interface ISpectatorResult {
    status: boolean,
    file: string
}

interface IChampion {
    name: string,
    color: string
}

interface IRegion {
    use: string,
    display: string
}


// JSON INTERFACES:
interface IJSONPlayers {
    players: IJSONPlayer[]
}
interface IJSONPlayer {
    player: string,
    team: number,
    league: string,
    role: string,
    stream: string,
    accounts: IJSONAccount[]
}
interface IJSONAccount {
    name: string,
    id: string,
    puuid: string,
    profileIcon: number,
    region: string
}


export type {
    IPlayer,
    IPlayers,
    ISpectatorResult,
    IChampion,
    IRegion,
    IOptionsSection,
    IOptionsSections,
    IOptionsButton,
    IOptionsButtonChamp,
    IOptionsSectionChamp,
    IOptionsSectionsChamp,
    ISelectedChamps,
    ISummonerAccount,
    ISummonerAccounts,
    IJSONPlayers,
    IJSONPlayer,
    IJSONAccount
}