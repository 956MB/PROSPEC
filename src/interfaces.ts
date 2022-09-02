import { useState } from "react";
import { StringIfPlural } from "react-i18next";

export const useInit = (callBack = () => {}) => {
    const [hasBeenCalled, setHasBeenCalled] = useState<boolean>(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
}

// NOTE: Reducers

export interface IReducerAction {
    type: string;
    payload: any;
}

export interface ICardStates {
    level: number;
    gameTime: number;
    backgroundDir: string;
    menuOrigin: IMenuOrigin;
    cardPressed: boolean;
}

export interface ISettingsStates {
    listLayout: number;
    autoRefresh: boolean;
    refreshInterval: number;
    showSummonerIds: boolean;
    showRandomSkins: boolean;
    useCutouts: boolean;
    showTeamLogos: boolean;
    showUnavailable: boolean;
    appTheme: number;
    appScale: number;
    openOnStartup: boolean;
    minimizeToTray: boolean;
    hardwareAcceleration: boolean;
    useBackground: boolean;
    randomBackground: boolean;
    liveBackground: boolean;
    keyboardMode: boolean;
    notifications: boolean;
    appLanguage: number;
}

// NOTE: Objects

export interface IAppBackground {
    primary: IBackground;
    secondary: IBackground;
}

export interface IBackground {
    type: string;
    name: string;
}

export interface IPlayers extends Array<IPlayer>{}
export interface IPlayer { 
    id: number;
    active: boolean;
    champion: number;
    summoner: ISummonerAccount;
    gameInfo: IGameInfo;
}

export interface IPlayerGroups extends Array<IPlayerGroup>{}
export interface IPlayerGroup {
    key: any;
    players: IPlayers;
}

export interface IPlayerGroupInfo {
    type: string;
    image: string;
    text: string;
}
  
export interface ISelectedChamps {
    champs: number[];
}

export interface ISummonerAccounts extends Array<ISummonerAccount>{}
export interface ISummonerAccount {
    accountName: string;
    playerName: string;
    team: number;
    summonerId: string;
    summonerPuuid: string;
    region: string;
    role: string;
    stream: string;
}

export interface IGameInfo {
    region: string;
    encryptionKey: string;
    gameId: string
    gameTime: number;
}

export interface IChampion {
    name: string;
    color: string
}

export interface IRegion {
    use: string;
    display: string
}

// NOTE: Spectator

export interface ISpectatorResult {
    status: boolean;
    file: string
}

// NOTE: UI

export interface IMenuOrigin {
    x: number;
    y: number;
}

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

export interface ISettingsPages extends Array<ISettingsPage>{}
export interface ISettingsPage {
    index: number;
    type: string;
    title: string;
    items: ISettingsItems;
}

export interface ISettingsPageLanguage extends ISettingsPage {
    selected: number;
}

export interface ISettingsItems extends Array<ISettingsItem>{}
export interface ISettingsItem {
    title?: string;
    description?: string;
    itemValue: ISettingsItemValue;
    childValues?: ISettingsItems;
}

export interface ISettingsItemValue {
    type: string;
    value: any;
    // setValue(v: any): boolean
}

export interface ISettingsItemValueBool extends Omit<ISettingsItemValue, 'value'> {
    value: boolean;
    key: string;
}

export interface ISettingsItemValueSelections extends Array<ISettingsItemValueSelection>{}
export interface ISettingsItemValueSelection {
    index: number;
    text: string;
}

export interface ISettingsItemValueSelector extends Omit<ISettingsItemValue, 'value'> {
    key: string;
    value: number;
    options: ISettingsItemValueSelections;
    // setValue(v: string): boolean
}

export interface ISettingsItemValueLanguages extends Array<ISettingsItemValueLanguage>{}
export interface ISettingsItemValueLanguage extends Omit<ISettingsItemValue, 'value'> {
    value: number;
    text: string;
    lang: string;
}

export interface ISettingsPageButton {
    index: number;
    text: string;
}

export interface ISettingsAboutSectionEntries extends Array<ISettingsAboutSectionEntry>{}
export interface ISettingsAboutSectionEntry {
    name: string;
    link: string;
}

// NOTE: JSON

export  interface IJSONPlayers {
    players: IJSONPlayer[]
}
export  interface IJSONPlayer {
    player: string;
    team: number;
    league: string;
    role: string;
    stream: string;
    accounts: IJSONAccount[];
}
export  interface IJSONAccount {
    name: string;
    id: string;
    puuid: string;
    profileIcon: number;
    region: string;
}