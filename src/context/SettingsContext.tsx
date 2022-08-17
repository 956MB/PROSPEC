
import React, { createContext, useEffect, useReducer, useState } from "react";
import { IReducerAction, ISettingsReducerState, useInit } from "../interfaces";
import { Store } from 'tauri-plugin-store-api';
import { ESettingsReducerStates } from "../typings";
import { mapEnum } from "../utils";

const DEFAULTS = [0, false, 5, true, false, false, false, 0, 0, false, true, false, true, false, false, 0];

export const SettingsContext = createContext({
    listLayout: 0, autoRefresh: false, refreshInterval: 5, showSummonerIds: true, showRandomSkins: false, useCutouts: false, showTeamLogos: false, appTheme: 0, appScale: 0, openOnStartup: false, minimizeToTray: true, hardwareAcceleration: false, randomAppBackground: true, keyboardMode: false, notifications: false, appLanguage: 0,
    updateSetting: (key: string, val: any) => { },
    getSetting: (key: string): any => { },
})

const settingsReducer = (state: ISettingsReducerState, action: IReducerAction): ISettingsReducerState => {
    switch (action.type) {
        case ESettingsReducerStates.LIST_LAYOUT: return { ...state, listLayout: action.payload as number };
        case ESettingsReducerStates.AUTO_REFRESH: return { ...state, autoRefresh: action.payload as boolean };
        case ESettingsReducerStates.REFRESH_INTERVAL: return { ...state, refreshInterval: action.payload as number };
        case ESettingsReducerStates.SHOW_SUMMONER_IDS: return { ...state, showSummonerIds: action.payload as boolean };
        case ESettingsReducerStates.SHOW_RANDOM_SKINS: return { ...state, showRandomSkins: action.payload as boolean };
        case ESettingsReducerStates.USE_CUTOUTS: return { ...state, useCutouts: action.payload as boolean };
        case ESettingsReducerStates.SHOW_TEAM_LOGOS: return { ...state, showTeamLogos: action.payload as boolean };
        case ESettingsReducerStates.APP_THEME: return { ...state, appTheme: action.payload as number };
        case ESettingsReducerStates.APP_SCALE: return { ...state, appScale: action.payload as number };
        case ESettingsReducerStates.OPEN_ON_STARTUP: return { ...state, openOnStartup: action.payload as boolean };
        case ESettingsReducerStates.MINIMIZE_TO_TRAY: return { ...state, minimizeToTray: action.payload as boolean };
        case ESettingsReducerStates.HARDWARE_ACCELERATION: return { ...state, hardwareAcceleration: action.payload as boolean };
        case ESettingsReducerStates.RANDOM_APP_BACKGROUND: return { ...state, randomAppBackground: action.payload as boolean };
        case ESettingsReducerStates.KEYBOARD_MODE: return { ...state, keyboardMode: action.payload as boolean };
        case ESettingsReducerStates.NOTIFICATIONS: return { ...state, notifications: action.payload as boolean };
        case ESettingsReducerStates.APP_LANGUAGE: return { ...state, appLanguage: action.payload as number };
        default: return state;
    }
}

const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const settingsStore = new Store('.settings.dat');

    const [state, dispatch] = useReducer(settingsReducer, {
        listLayout: 0, autoRefresh: false, refreshInterval: 5, showSummonerIds: true, showRandomSkins: false, useCutouts: false, showTeamLogos: false, appTheme: 0, appScale: 0, openOnStartup: false, minimizeToTray: true, hardwareAcceleration: false, randomAppBackground: true, keyboardMode: false, notifications: false, appLanguage: 0,
    })

    useInit(() => {
        const initSettings = async () => {
            settingsStore.load();
            // settingsStore.reset();

            mapEnum(ESettingsReducerStates, "string", async (redState: ESettingsReducerStates, i: number) => {
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
            listLayout: state.listLayout, autoRefresh: state.autoRefresh, refreshInterval: state.refreshInterval, showSummonerIds: state.showSummonerIds, showRandomSkins: state.showRandomSkins, useCutouts: state.useCutouts, showTeamLogos: state.showTeamLogos, appTheme: state.appTheme, appScale: state.appScale, openOnStartup: state.openOnStartup, minimizeToTray: state.minimizeToTray, hardwareAcceleration: state.hardwareAcceleration, randomAppBackground: state.randomAppBackground, keyboardMode: state.keyboardMode, notifications: state.notifications, appLanguage: state.appLanguage,

            updateSetting, getSetting
        }}>
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsProvider;