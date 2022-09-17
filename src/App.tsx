import React, { Suspense, useContext, useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './App.css';

import Titlebar from './components/titlebar/Titlebar';
import Settings from "./components/settings/Settings";
import { IBackground, IPlayers } from "./imports/interfaces";

import { EChampions } from "./imports/typings";
import { getRegion, randomActive, getRandomBackground, randomEnum, randomNumber } from "./imports/utils";
import "./imports/prototypes"
import { Players, PlayersNotLoaded } from "./components/players/Players";

import { SpectatorContext } from "./context/SpectatorContext";
import { SettingsContext } from "./context/SettingsContext";
import { useTranslation } from "react-i18next";
import SettingsSidebar from "./components/settings/SettingsSidebar";
import { useInit } from "./imports/initializers";

function App() {
    const navigate = useNavigate();
    const { i18n } = useTranslation('common');
    
    const { regionFilter, modeFilter, roleFilter, accountsLoaded, allAccounts } = useContext(SpectatorContext);
    const { useBackground, liveBackground, autoRefresh, randomBackground } = useContext(SettingsContext);
    const [appBG, setAppBG] = useState<IBackground>({
        type: "live", name: "Sona_6"
    });
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const [playersLoaded, setPlayersLoaded] = useState<boolean>(false);
    const [players, setPlayers] = useState<IPlayers>([]);
    const [playersKey, setPlayersKey] = useState<number>(0);

    const fSettingsOpen = (set?: boolean) => {
        setSettingsOpen(set ? set : !settingsOpen);
        navigate(settingsOpen ? '/' : '/settings', {replace: true});
    }

    const refreshPlayers = () => {
        setPlayersLoaded(false);
        setPlayersKey(playersKey + 1);
        setPlayers([]);

        if (accountsLoaded) {
            setPlayers(
                allAccounts
                    .filterRegions(regionFilter)
                    .filterRoles(roleFilter)
                    .filterRandomize()
                    .filterUniquePlayers(0, 35)
                    .map((player, i) => {
                        return {
                            id: i, active: randomActive(), champion: randomEnum(EChampions, []), summoner: { accountName: player.accountName, playerName: player.playerName, team: player.team, summonerId: "", summonerPuuid: "", region: player.region, role: player.role, stream: player.stream }, gameInfo: { region: getRegion(player.region).use, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) }
                        }
                    })
            );
            setPlayersLoaded(true);
        }
    }

    useInit(() => {
        const getAppBackground = async () => {
            const randomBG = await getRandomBackground();
            setAppBG(randomBG);
        };
        if (randomBackground) { getAppBackground(); }
        if (autoRefresh) { refreshPlayers(); }
    });

    return (
        <div
            className={`app ${settingsOpen ? 'settings-open' : null} ${i18n.language}`}
            onContextMenu={(e) => {
                e.preventDefault();
            }}>

            <SettingsSidebar fSettingsOpen={fSettingsOpen} />
            <Titlebar fSettingsOpen={fSettingsOpen} fRefreshPlayers={refreshPlayers} />

            <Routes>
                <Route path='/' element={
                    playersLoaded ?
                        <Players key={playersKey} players={players} /> : null
                } />

                <Route path='/settings' element={
                    <Settings fSettingsOpen={fSettingsOpen} />
                } />
            </Routes>

            <div className="dark-overlay"></div>

            {!useBackground ? null :
                liveBackground && appBG.type === "live"
                    ?
                    <video autoPlay muted loop className="app-background-video">
                        <source src={`src/assets/dragontail/live/${appBG.name}.webm`} type="video/mp4" />
                    </video>
                    :
                    <div className="app-background" style={{ backgroundImage: `url(src/assets/dragontail/splash/${appBG.name}.jpg)` }}></div>
            }
        </div>
    );
}


export default App