import React, { Suspense, useEffect, useMemo, useState } from "react";
import './App.css';

import Titlebar from './components/titlebar';
import Settings from "./components/settings/Settings";
import ProSpec from "./prospec";
import { IAppBackground, IPlayers } from "./interfaces";
// const Players = React.lazy(() => import("./components/players/Players"));

import { EChampions, ERegions } from "./typings";
import { getRegion, randomActive, randomBackground, randomEnum, randomNumber } from "./utils";
import Players from "./components/players/Players";

function App() {
    const proSpec = useMemo(() => new ProSpec(false), []);
    // const [appBG, setAppBG] = useState({type: 'splash', primary: `assets/dragontail-12.13.1/splash/Kayle_8.webp`, secondary: `assets/dragontail-12.13.1/centered/Kayle_8.webp`} as IAppBackground);
    const [appBG, setAppBG] = useState({ type: 'random', primary: `assets/dragontail-12.13.1/random/Miyazaki.png`, secondary: `assets/dragontail-12.13.1/random/Miyazaki.png` } as IAppBackground);
    const [settingsOpen, setSettingsOpen] = useState(false);

    useEffect(() => {
        const getAppBackground = async () => {
            const randomBG = await randomBackground();
            setAppBG(randomBG);
            console.log(randomBG.primary, randomBG.secondary);
        };
        // getAppBackground();
    }, [proSpec]);

    const [playersLoaded, setPlayersLoaded] = useState(false);
    const [players, setPlayers] = useState<IPlayers>([]);

    const FSettingsOpen = (set: boolean = false) => {
        setSettingsOpen(set);
    }

    const refreshPlayers = () => {
        if (proSpec.accountsLoaded) {
            console.log("LOADED");
            setPlayers(
                proSpec.allAccounts
                    .filterRegions(ERegions.KR, ERegions.NA)
                    .sort(() => 0.5 - Math.random())
                    .filterUniquePlayers(0, 25)
                    .map((player, i) => {
                        return {
                            id: i, active: randomActive(), champion: randomEnum(EChampions), summoner: { accountName: player.accountName, playerName: player.playerName, team: player.team, summonerId: "", summonerPuuid: "", region: player.region, role: player.role, stream: player.stream }, gameInfo: { region: getRegion(player.region).use, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) }
                        }
                    })
            );
            setPlayersLoaded(true);
        } else {
            console.log("unLOADED");
        }
    }

    return (
        <div className={`app ${settingsOpen ? 'settings-open' : null}`} style={{ backgroundImage: `url(src/${appBG.primary})` }} onContextMenu={(e) => {
            e.preventDefault();
        }}>
            <Settings appBackground={appBG} settingsOpen={settingsOpen} FSettingsOpen={FSettingsOpen} />
            <Titlebar settingsOpen={settingsOpen} selectedRegions={proSpec.searchRegions} selectedModes={proSpec.searchModes} selectedRoles={proSpec.searchRoles} refreshPlayers={refreshPlayers} />
            <div className="app-inner">
                {playersLoaded ?
                    <Players players={players} />
                    : null
                }
            </div>
            <div className="dark-overlay"></div>
            {/* <div className="app-background" style={{ backgroundImage: `url(${defaultBackground})` }}></div> */}
        </div>
    );
}


export default App