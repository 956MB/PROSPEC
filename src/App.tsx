import {useContext, useEffect, useState} from "react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

import Titlebar from './components/titlebar/Titlebar';
import Settings from "./components/settings/Settings";
import { IBackground, IPlayers, IPageState, IPlayer } from "./imports/interfaces";

import { EChampions } from "./imports/typings";
import { filterBy, getRegion, randomActive, getRandomBackground, randomEnum, randomNumber, randomSkin, getChampionFromId, arrayRandom } from "./imports/utils";
import "./imports/prototypes"
import { Players, PlayersNotLoaded } from "./components/players/Players";

import { SpectatorContext } from "./context/SpectatorContext";
import { SettingsContext } from "./context/SettingsContext";
import { useTranslation } from "react-i18next";
import Sidebar from "./components/sidebar/Sidebar";
import { useInit } from "./imports/initializers";
import { ChampionsQueue } from "./components/cq/ChampionsQueue";

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const { i18n } = useTranslation('common');

    const { regionFilter, modeFilter, roleFilter, accountsLoaded, allAccounts } = useContext(SpectatorContext);
    const { useBackground, liveBackground, autoRefresh, randomBackground } = useContext(SettingsContext);
    const [appBG, setAppBG] = useState<IBackground>({
        type: "random", name: "FrightNight_Renata_and_Nautilus_Final", ext: "jpg"
    });
    const [playersAll, setPlayersAll] = useState<IPlayers>([]);
    const [sidebarFavorites, setSidebarFavorites] = useState<IPlayers>([]);
    const [playersKey, setPlayersKey] = useState<number>(0);

    const [pageState, setPageState] = useState<IPageState>({ currentPage: 0, pages: ["/"] });
    const fNavigateDirection = (dir: number, replace: boolean = false) => {
        setPageState({ currentPage: pageState.currentPage + dir, pages: pageState.pages });
        navigate(dir);
    }
    const fNavigatePage = (page: string) => {
        setPageState({ currentPage: pageState.currentPage + 1, pages: [...pageState.pages, page] });
        navigate(page, { replace: false });
    }

    const getAppBackground = async () => {
        const randomBG = await getRandomBackground(appBG);
        setAppBG(randomBG);
    };

    const refreshPlayers = () => {
        setPlayersAll([]);
        loopPlayers();
    }

    const loopPlayers = async () => {
        console.log("loopPlayers CALLED::");
        await Promise.all(allAccounts.filterRoles(roleFilter).filterRandomize().filterUniquePlayers(0, 12).map(async (summoner, ip) => {
            let accounts = summoner.playerAccounts.filterRegions(regionFilter);
            let selectedAccount = arrayRandom(accounts);
            let randomC = getChampionFromId(randomEnum(EChampions, []))!;
            let playerI = {
                id: ip,
                active: randomActive(),
                favorite: ip <= 2, // TODO: testing, use real favorites later
                champion: randomC,
                skin: await randomSkin(randomC.name),
                playerInfo: summoner.playerInfo,
                playerAccount: selectedAccount,
                gameInfo: { region: getRegion(selectedAccount.region).use, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800) }
            }

            setPlayersAll(prevPlayers => [...prevPlayers, playerI]);
        })).then(() => {
            setPlayersKey(playersKey + 1);
        });
    }
    useInit(() => {
        if (randomBackground) { getAppBackground(); }
        if (autoRefresh) { refreshPlayers(); }
    });

    return (
        <div
            className={`app ${i18n.language}`}
            onContextMenu={(e) => {
                e.preventDefault();
            }}>

            <Sidebar favorites={sidebarFavorites} fNavigatePage={fNavigatePage} />
            <Titlebar pageState={pageState} fNavigateDirection={fNavigateDirection} fRefreshPlayers={refreshPlayers} />

            <Routes>
                <Route path='/' element={
                    <Players key={playersKey} players={playersAll} />
                } />
                <Route path='/champsqueue' element={
                    <ChampionsQueue/>
                } />
                <Route path='/settings' element={
                    <Settings fRefreshBackground={getAppBackground} fNavigatePage={fNavigatePage} />
                } />
            </Routes>

            <div className="dark-overlay"></div>

            {!useBackground ? null :
                liveBackground && appBG.type === "live"
                    ?
                    <video autoPlay muted loop className="app-background-video">
                        <source src={`src/assets/dragontail/${appBG.type}/${appBG.name}.${appBG.ext}`} type="video/mp4" />
                    </video>
                    :
                    <div className="app-background" style={{ backgroundImage: `url(src/assets/dragontail/${appBG.type}/${appBG.name}.${appBG.ext})` }}></div>
            }
        </div>
    );
}


export default App