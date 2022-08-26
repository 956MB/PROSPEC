import React, { Suspense, useContext, useEffect, useMemo, useState } from "react";
import './App.css';

import Titlebar from './components/titlebar';
import Settings from "./components/settings/Settings";
import ProSpec from "./prospec";
import { IAppBackground, IPlayers, useInit } from "./interfaces";
// const Players = React.lazy(() => import("./components/players/Players"));

import { EChampions, ERegions } from "./typings";
import { getRegion, ifLiveBackground, randomActive, randomBackground, randomEnum, randomNumber } from "./utils";
import Players from "./components/players/Players";

import { SpectatorContext } from "./context/SpectatorContext";
import { SettingsContext } from "./context/SettingsContext";

function App() {
    // const proSpec = useMemo(() => new ProSpec(false), []);
    const { regionFilter, modeFilter, roleFilter, accountsLoaded, allAccounts } = useContext(SpectatorContext);
    const { liveBackground } = useContext(SettingsContext);
    const [appBG, setAppBG] = useState<IAppBackground>({primary: { type: "live", name: "Sona_6" },
    secondary: { type: "centered", name: "Sona_6" }});
    const [settingsOpen, setSettingsOpen] = useState(false);

    useInit(() => {
        const getAppBackground = async () => {
            const randomBG = await randomBackground({primary: { type: "live", name: "Sona_6" },
            secondary: { type: "centered", name: "Sona_6" }});
            setAppBG(randomBG);
        };
        getAppBackground();
    });

    const [playersLoaded, setPlayersLoaded] = useState(false);
    const [players, setPlayers] = useState<IPlayers>([]);
    const [playersKey, setPlayersKey] = useState(0);

    const FSettingsOpen = (set: boolean = false) => {
        setSettingsOpen(set);
    }

    const refreshPlayers = () => {
        setPlayersLoaded(false);
        setPlayersKey(playersKey + 1);
        setPlayers([]);

        if (accountsLoaded) {
            console.log("LOADED");
            // console.log(allAccounts);
            setPlayers(
                allAccounts
                    .filterRegions(regionFilter)
                    // .filterRoles(roleFilter)
                    .filterRandomize()
                    .filterUniquePlayers(0, 35)
                    // .slice(0, 45)
                    .map((player, i) => {
                        return {
                            id: i, active: randomActive(), champion: randomEnum(EChampions, []), summoner: { accountName: player.accountName, playerName: player.playerName, team: player.team, summonerId: "", summonerPuuid: "", region: player.region, role: player.role, stream: player.stream }, gameInfo: { region: getRegion(player.region).use, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) }
                        }
                    })
            );
            setPlayersLoaded(true);
        }
    }

    return (
        <div className={`app ${settingsOpen ? 'settings-open' : null}`} onContextMenu={(e) => {
            e.preventDefault();
        }}>
            <Settings appBackground={appBG} settingsOpen={settingsOpen} FSettingsOpen={FSettingsOpen} />
            <Titlebar settingsOpen={settingsOpen} refreshPlayers={refreshPlayers} />
            <div className="app-inner">
                {playersLoaded ?
                    <Players key={playersKey} players={players} />
                    : null
                }
            </div>
            <div className="dark-overlay"></div>

            {/* {liveBackground && appBG.primary.type === "live"
                ?
                <video autoPlay muted loop className="app-background-video">
                    <source src={`src/assets/dragontail/${liveBackground ? appBG.primary.type : "splash"}/${appBG.primary.name}.webm`} type="video/mp4" />
                </video>
                :
                <div className="app-background" style={{ backgroundImage: `url(src/assets/dragontail/${liveBackground ? appBG.primary.type : "splash"}/${appBG.primary.name}.jpg)` }}></div>
            } */}
        </div>
    );
}


export default App