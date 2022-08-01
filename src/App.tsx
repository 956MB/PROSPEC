import React, { Suspense, useEffect, useMemo, useState } from "react";
import './App.css';

import Titlebar from './components/titlebar';
import Settings from './components/settings';
import ProSpec from "./prospec";
import { IPlayers } from "./interfaces";
const ProsContainer = React.lazy(() => import("./components/players"));

// import defaultBackground from "./assets/dragontail-12.13.1/random/Katarina_Sephi2.jpg";
import { EChampions, EModes, ERegions, ETeams } from "./typings";
import { getRegion, randomActive, randomEnum, randomNumber, sliceMap } from "./utils";

function App() {
    const proSpec = useMemo(() => new ProSpec(false), []);
    const [appBG, setAppBG] = useState("Kayle_8");
    const [settingsOpen, setSettingsOpen] = useState(true);

    useEffect(() => {
        // proSpec.doSomething();

        // spectate.execSpectateWin("euw1", "J2iWm0UJqiR80PBGAeEj5PJFBo9h1KkP", "5963775436");
        // const handleButtonClick = () => {
        //     const fetchUserEmail = async () => {
        //         const response = await execSpectateWin("euw1", "J2iWm0UJqiR80PBGAeEj5PJFBo9h1KkP", "5963775436");
        //         console.log(`here click ${response.status}`);
        //     };
        //     fetchUserEmail();
        // };
    }, [proSpec]);

    const [players, setPlayers] = useState<IPlayers>({
        players: []

        // { id: 0, active: false, menuOpen: false, champion: EChampions.GRAVES, summoner: { accountName: "DRX 홍창현", playerName: "Pyosik", team: ETeams.DRX, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 1, active: true, menuOpen: false, champion: EChampions.PYKE, summoner: { accountName: "Landsol", playerName: "BeryL", team: ETeams.DRX, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 2, active: true, menuOpen: false, champion: EChampions.DRMUNDO, summoner: { accountName: "Wang Ho", playerName: "Peanut", team: ETeams.GEN, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 3, active: true, menuOpen: false, champion: EChampions.AHRI, summoner: { accountName: "Hide on bush", playerName: "Faker", team: ETeams.T1, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 4, active: true, menuOpen: false, champion: EChampions.BARD, summoner: { accountName: "역천괴", playerName: "Keria", team: ETeams.T1, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 5, active: true, menuOpen: false, champion: EChampions.CHOGATH, summoner: { accountName: "5358", playerName: "Morgan", team: ETeams.BRO, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 6, active: true, menuOpen: false, champion: EChampions.MASTERYI, summoner: { accountName: "문신처럼 박힌", playerName: "Oner", team: ETeams.T1, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 7, active: true, menuOpen: false, champion: EChampions.VAYNE, summoner: { accountName: "가고싶다 룰드컵", playerName: "Prince", team: ETeams.LSB, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 8, active: false, menuOpen: false, champion: EChampions.ZIGGS, summoner: { accountName: "가나라마아바", playerName: "Deft", team: ETeams.DRX, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 9, active: true, menuOpen: false, champion: EChampions.SWAIN, summoner: { accountName: "늘 완벽하고싶다", playerName: "Nuguri", team: ETeams.DK, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 10, active: false, menuOpen: false, champion: EChampions.GRAVES, summoner: { accountName: "DRX 홍창현", playerName: "Pyosik", team: ETeams.DRX, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 11, active: true, menuOpen: false, champion: EChampions.PYKE, summoner: { accountName: "Landsol", playerName: "BeryL", team: ETeams.DRX, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 12, active: true, menuOpen: false, champion: EChampions.DRMUNDO, summoner: { accountName: "Wang Ho", playerName: "Peanut", team: ETeams.GEN, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 13, active: true, menuOpen: false, champion: EChampions.AHRI, summoner: { accountName: "Hide on bush", playerName: "Faker", team: ETeams.T1, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 14, active: true, menuOpen: false, champion: EChampions.BARD, summoner: { accountName: "역천괴", playerName: "Keria", team: ETeams.T1, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 15, active: true, menuOpen: false, champion: EChampions.CHOGATH, summoner: { accountName: "5358", playerName: "Morgan", team: ETeams.BRO, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 16, active: true, menuOpen: false, champion: EChampions.MASTERYI, summoner: { accountName: "문신처럼 박힌", playerName: "Oner", team: ETeams.T1, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 17, active: true, menuOpen: false, champion: EChampions.VAYNE, summoner: { accountName: "가고싶다 룰드컵", playerName: "Prince", team: ETeams.LSB, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 18, active: false, menuOpen: false, champion: EChampions.ZIGGS, summoner: { accountName: "가나라마아바", playerName: "Deft", team: ETeams.DRX, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
        // { id: 19, active: true, menuOpen: false, champion: EChampions.SWAIN, summoner: { accountName: "늘 완벽하고싶다", playerName: "Nuguri", team: ETeams.DK, summonerId: "", summonerPuuid: "", region: "", role: "", stream: "" }, gameInfo: { region: ERegions.KR, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) } },
    });

    const handleCloseMenus = (playerId: number, set: boolean) => {
        setPlayers({
            players: players.players.map((player) => ({ ...player, menuOpen: ((player.id === playerId) ? set : false) }))
        });
    }

    const handleCloseSettings = () => {
        setSettingsOpen(false);
    }

    const refreshPlayers = () => {
        if (proSpec.accountsLoaded) {
            console.log("LOADED");
            setPlayers({
                players: proSpec.allAccounts
                    .filter((player) => player.region === "kr")
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 14)
                    .map((player, i) => {
                        return {
                            id: i, active: randomActive(), menuOpen: false, champion: randomEnum(EChampions), summoner: { accountName: player.accountName, playerName: player.playerName, team: player.team, summonerId: "", summonerPuuid: "", region: player.region, role: player.role, stream: player.stream }, gameInfo: { region: getRegion(player.region).use, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) }
                        }
                    })
            });
        } else {
            console.log("unLOADED");
        }
    }

    return (
        <div className="app" style={{ backgroundImage: `url(src/assets/dragontail-12.13.1/splash/${appBG}.webp)` }}>
            <Settings appBackground={appBG} settingsOpen={settingsOpen} handleCloseSettings={handleCloseSettings}/>
            <Titlebar settingsOpen={settingsOpen} selectedRegions={proSpec.searchRegions} selectedModes={proSpec.searchModes} selectedRoles={proSpec.searchRoles} refreshPlayers={refreshPlayers} />
            <div className="app-inner">
                <Suspense fallback={<div>Loading Component....</div>}>
                    <ProsContainer players={players} handleCloseMenus={handleCloseMenus} />
                </Suspense>
            </div>
            <div className="dark-overlay"></div>
            {/* <div className="app-background" style={{ backgroundImage: `url(${defaultBackground})` }}></div> */}
        </div>
    );
}


export default App