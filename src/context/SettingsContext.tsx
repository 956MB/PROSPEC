
import React, { createContext, startTransition, useEffect, useReducer, useState } from "react";
import { Store } from 'tauri-plugin-store-api';

import { IReducerAction, ISettingsStates, useInit } from "../interfaces";
import { ESettingsStates } from "../typings";
import { mapEnum } from "../utils";

const DEFAULTS = [0, false, 5, true, false, false, false, true, 0, 0, false, true, false, true, false, false, 0];
const BOOLS: string[] = [ ESettingsStates.AUTO_REFRESH, ESettingsStates.SHOW_SUMMONER_IDS, ESettingsStates.SHOW_RANDOM_SKINS, ESettingsStates.USE_CUTOUTS, ESettingsStates.SHOW_TEAM_LOGOS, ESettingsStates.SHOW_UNAVAILABLE, ESettingsStates.OPEN_ON_STARTUP, ESettingsStates.MINIMIZE_TO_TRAY, ESettingsStates.HARDWARE_ACCELERATION, ESettingsStates.RANDOM_APP_BACKGROUND, ESettingsStates.LIVE_BACKGROUND, ESettingsStates.KEYBOARD_MODE, ESettingsStates.NOTIFICATIONS ];
const NUMS: string[] = [ ESettingsStates.LIST_LAYOUT, ESettingsStates.REFRESH_INTERVAL, ESettingsStates.APP_THEME, ESettingsStates.APP_SCALE, ESettingsStates.APP_LANGUAGE ];

export const SettingsContext = createContext({
    listLayout: 0, autoRefresh: false, refreshInterval: 5, showSummonerIds: true, showRandomSkins: false, useCutouts: false, showTeamLogos: false, showUnavailable: true, appTheme: 0, appScale: 0, openOnStartup: false, minimizeToTray: true, hardwareAcceleration: false, randomAppBackground: true, liveBackground: true, keyboardMode: false, notifications: false, appLanguage: 0,
    updateSetting: (key: string, val: any) => { },
    getSetting: (key: string): any => { },
})

const settingsReducer = (state: ISettingsStates, action: IReducerAction): ISettingsStates => {
    if (BOOLS.includes(action.type)) { return { ...state, [action.type]: action.payload as boolean } };
    if (NUMS.includes(action.type)) { return { ...state, [action.type]: action.payload as number } };

    return state;
}

const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const settingsStore = new Store('.settings.dat');

    const [state, dispatch] = useReducer(settingsReducer, {
        listLayout: 0, autoRefresh: false, refreshInterval: 5, showSummonerIds: true, showRandomSkins: false, useCutouts: false, showTeamLogos: false, showUnavailable: true, appTheme: 0, appScale: 0, openOnStartup: false, minimizeToTray: true, hardwareAcceleration: false, randomAppBackground: true, liveBackground: true, keyboardMode: false, notifications: false, appLanguage: 0,
    })

    useInit(() => {
        const initSettings = async () => {
            settingsStore.load();
            // settingsStore.reset();

            mapEnum(ESettingsStates, "string", async (redState: ESettingsStates, i: number) => {
                const value = await settingsStore.get(redState);
                dispatch({ type: redState, payload: checkSet(redState, value, DEFAULTS[i]) });
            })

            settingsStore.save();
        };

        const checkSet = (key: string, val: any, def: any): any => {
            if (val == null) {
                settingsStore.set(key, def);
                return def;
            }
            return val;
        }

        initSettings();
    });

    const updateSetting = (key: string, val: any): void => {
        dispatch({ type: key, payload: val });

        settingsStore.set(key, val);
        settingsStore.save();
    }

    const getSetting = async (key: string): Promise<any> => {
        const setting = await settingsStore.get(key);
        return setting;
    }

    return (
        <SettingsContext.Provider value={{
            listLayout: state.listLayout, autoRefresh: state.autoRefresh, refreshInterval: state.refreshInterval, showSummonerIds: state.showSummonerIds, showRandomSkins: state.showRandomSkins, useCutouts: state.useCutouts, showTeamLogos: state.showTeamLogos, showUnavailable: state.showUnavailable, appTheme: state.appTheme, appScale: state.appScale, openOnStartup: state.openOnStartup, minimizeToTray: state.minimizeToTray, hardwareAcceleration: state.hardwareAcceleration, randomAppBackground: state.randomAppBackground, liveBackground: state.liveBackground, keyboardMode: state.keyboardMode, notifications: state.notifications, appLanguage: state.appLanguage,

            updateSetting, getSetting
        }}>
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsProvider;