// NOTE: Objects

export interface IPlayer { 
    id: number;
    active: boolean;
    menuOpen: boolean;
    champion: number;
    summoner: ISummonerAccount;
    gameInfo: IGameInfo,
}
  
export interface IPlayers {
    players: IPlayer[];
}

export interface ISelectedChamps {
    champs: number[];
}

export interface ISummonerAccounts extends Array<ISummonerAccount>{}
export interface ISummonerAccount {
    accountName: string,
    playerName: string,
    team: number,
    summonerId: string,
    summonerPuuid: string,
    region: string,
    role: string,
    stream: string,
}

export interface IGameInfo {
    region: string,
    encryptionKey: string,
    gameId: string
    gameTime: number;
}

export interface IChampion {
    name: string,
    color: string
}

export interface IRegion {
    use: string,
    display: string
}

// NOTE: Spectator

export interface ISpectatorResult {
    status: boolean,
    file: string
}

// NOTE: UI

export interface IOptionsButton {
    id: number;
    active: boolean;
    selected: boolean;
    type: string;
    images: string[];
    right: string;
    content: string;
}

export interface IOptionsButtonChamp {
    id: number;
    active: boolean;
    type: string;
    champ: number;
    images: string[];
    right: string;
}

export interface IOptionsSection {
    id: number;
    name: string;
    active: boolean;
    expanded: boolean;
    buttons: IOptionsButton[];
}

export interface IOptionsSectionChamp {
    id: number;
    name: string;
    active: boolean;
    expanded: boolean;
    buttons: IOptionsButtonChamp[];
}

export interface IOptionsSections {
    active: boolean;
    sections: IOptionsSection[];
}

export interface IOptionsSectionsChamp {
    sections: IOptionsSectionChamp[];
}

// NOTE: Settings

export interface ISettingsPage {
    index: number;
    title: string;
    items: ISettingsItems;
}

export interface ISettingsItems extends Array<ISettingsItem>{}
export interface ISettingsItem {
    title: string;
    description: string;
    value: ISettingsItemValue;
    childValues: ISettingsItemChildren;
}

export interface ISettingsItemChildren extends Array<ISettingsItemChild>{}
export interface ISettingsItemChild extends ISettingsItem {
    disabledByParent: boolean
}

export interface ISettingsItemValue {
    value: any
    setValue(v: any): boolean
}

export interface ISettingsItemValueBool extends Omit<ISettingsItemValue, 'value' | 'setValue'> {
    value: boolean
    setValue(v: boolean): boolean
}

export interface ISettingsItemValueSelector extends Omit<ISettingsItemValue, 'value' | 'setValue'> {
    value: string
    setValue(v: string): boolean
}

export interface ISettingsPageButton {
    index: number;
    text: string;
}

// NOTE: JSON

export  interface IJSONPlayers {
    players: IJSONPlayer[]
}
export  interface IJSONPlayer {
    player: string,
    team: number,
    league: string,
    role: string,
    stream: string,
    accounts: IJSONAccount[]
}
export  interface IJSONAccount {
    name: string,
    id: string,
    puuid: string,
    profileIcon: number,
    region: string
}