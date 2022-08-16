
import React, { createContext, useEffect, useState } from "react";
import { useInit } from "../interfaces";
import { Store } from 'tauri-plugin-store-api';
// import SettingsStore, { ISettings } from "./SettingsStore";

export const SettingsContext = createContext({
    // Content:
    listLayout: 0,
    autoRefresh: false,
    refreshInterval: 5,
    showSummonerIds: true,
    showRandomSkins: false,
    useCutouts: false,
    showTeamLogos: false,
    // Application:
    appTheme: 0,
    appScale: 0,
    openOnStartup: false,
    minimizeToTray: true,
    hardwareAcceleration: false,
    randomAppBackground: true,
    keyboardMode: false,
    notifications: false,
    // Language:
    appLanguage: 0,
    updateSetting: (key: string, val: any) => {},
    getSetting: (key: string): any => {},
})

const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // console.log("settingsProvider INIT;;");
    const settingsStore = new Store('.settings.dat');

    // Content:
    const [listLayout, setListLayout] = useState(0);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [refreshInterval, setRefreshInterval] = useState(5);
    const [showSummonerIds, setShowSummonerIds] = useState(true);
    const [showRandomSkins, setShowRandomSkins] = useState(true);
    const [useCutouts, setUseCutouts] = useState(true);
    const [showTeamLogos, setShowTeamLogos] = useState(true);
    // Application:
    const [appTheme, setAppTheme] = useState(0);
    const [appScale, setAppScale] = useState(0);
    const [openOnStartup, setOpenOnStartup] = useState(false);
    const [minimizeToTray, setMinimizeToTray] = useState(true);
    const [hardwareAcceleration, setHardwareAcceleration] = useState(false);
    const [randomAppBackground, setRandomAppBackground] = useState(true);
    const [keyboardMode, setKeyboardMode] = useState(false);
    const [notifications, setNotifications] = useState(false);
    // Language:
    const [appLanguage, setAppLanguage] = useState(0);

    useInit(() => {
        const initSettings = async () => {
            settingsStore.load();
            // settingsStore.reset();

            const valListLayout = await settingsStore.get('keyListLayout') as number;
            setListLayout(checkSet('keyListLayout', valListLayout, 0) as number);
            const valAutoRefresh = await settingsStore.get('keyAutoRefresh') as boolean;
            setAutoRefresh(checkSet('keyAutoRefresh', valAutoRefresh, false) as boolean);
            const valRefreshInterval = await settingsStore.get('keyRefreshInterval') as number;
            setRefreshInterval(checkSet('keyRefreshInterval', valRefreshInterval, 5) as number);
            const valShowSummonerIds = await settingsStore.get('keyShowSummonerIds') as boolean;
            setShowSummonerIds(checkSet('keyShowSummonerIds', valShowSummonerIds, true) as boolean);
            const valShowRandomSkins = await settingsStore.get('keyShowRandomSkins') as boolean;
            setShowRandomSkins(checkSet('keyShowRandomSkins', valShowRandomSkins, true) as boolean);
            const valUseCutouts = await settingsStore.get('keyUseCutouts') as boolean;
            setUseCutouts(checkSet('keyUseCutouts', valUseCutouts, true) as boolean);
            const valShowTeamLogos = await settingsStore.get('keyShowTeamLogos') as boolean;
            setShowTeamLogos(checkSet('keyShowTeamLogos', valShowTeamLogos, true) as boolean);
            const valAppTheme = await settingsStore.get('keyAppTheme') as number;
            setAppTheme(checkSet('keyAppTheme', valAppTheme, 0) as number);
            const valAppScale = await settingsStore.get('keyAppScale') as number;
            setAppScale(checkSet('keyAppScale', valAppScale, 0) as number);
            const valOpenOnStartup = await settingsStore.get('keyOpenOnStartup') as boolean;
            setOpenOnStartup(checkSet('keyOpenOnStartup', valOpenOnStartup, false) as boolean);
            const valMinimizeToTray = await settingsStore.get('keyMinimizeToTray') as boolean;
            setMinimizeToTray(checkSet('keyMinimizeToTray', valMinimizeToTray, true) as boolean);
            const valHardwareAcceleration = await settingsStore.get('keyHardwareAcceleration') as boolean;
            setHardwareAcceleration(checkSet('keyHardwareAcceleration', valHardwareAcceleration, false) as boolean);
            const valRandomAppBackground = await settingsStore.get('keyRandomAppBackground') as boolean;
            setRandomAppBackground(checkSet('keyRandomAppBackground', valRandomAppBackground, true) as boolean);
            const valKeyboardMode = await settingsStore.get('keyKeyboardMode') as boolean;
            setKeyboardMode(checkSet('keyKeyboardMode', valKeyboardMode, false) as boolean);
            const valNotifications = await settingsStore.get('keyNotifications') as boolean;
            setNotifications(checkSet('keyNotifications', valNotifications, false) as boolean);

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
        switch(key) {
            case 'keyAutoRefresh':          setAutoRefresh(val as boolean); break;
            case 'keyListLayout':           setListLayout(val as number); break;
            case 'keyRefreshInterval':      setRefreshInterval(val as number); break;
            case 'keyShowSummonerIds':      setShowSummonerIds(val as boolean); break;
            case 'keyShowRandomSkins':      setShowRandomSkins(val as boolean); break;
            case 'keyUseCutouts':           setUseCutouts(val as boolean); break;
            case 'keyShowTeamLogos':        setShowTeamLogos(val as boolean); break;
            case 'keyAppTheme':             setAppTheme(val as number); break;
            case 'keyAppScale':             setAppScale(val as number); break;
            case 'keyOpenOnStartup':        setOpenOnStartup(val as boolean); break;
            case 'keyMinimizeToTray':       setMinimizeToTray(val as boolean); break;
            case 'keyHardwareAcceleration': setHardwareAcceleration(val as boolean); break;
            case 'keyRandomAppBackground':  setRandomAppBackground(val as boolean); break;
            case 'keyKeyboardMode':         setKeyboardMode(val as boolean); break;
            case 'keyNotifications':        setNotifications(val as boolean); break;
            case 'keyAppLanguage':          setAppLanguage(val as number); break;
            default:                        return;
        }

        settingsStore.set(key, val);
        settingsStore.save();
    }

    const getSetting = async (key: string): Promise<any> => {
        const setting = await settingsStore.get(key);
        return setting;
    }

    return (
        <SettingsContext.Provider value={{
            listLayout, autoRefresh, refreshInterval, showSummonerIds, showRandomSkins, useCutouts, showTeamLogos,
            appTheme, appScale, openOnStartup, minimizeToTray, hardwareAcceleration, randomAppBackground, keyboardMode, notifications,
            appLanguage,

            updateSetting, getSetting
        }}>
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsProvider;