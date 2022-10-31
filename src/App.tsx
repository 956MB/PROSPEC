import {useContext, useEffect, useState} from "react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

import Titlebar from './components/titlebar/Titlebar';
import Settings from "./components/settings/Settings";
import { IBackground, IPlayers, IPageState, IPlayer } from "./imports/interfaces";

import { EChampions } from "./imports/typings";
import { filterBy, getRegion, randomActive, getRandomBackground, randomEnum, randomNumber, randomSkin, getChampionFromId } from "./imports/utils";
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
    const [playersLoaded, setPlayersLoaded] = useState<boolean>(false);
    const [playersAll, setPlayersAll] = useState<IPlayers>([]);
    const [sidebarFavorites, setSidebarFavorites] = useState<IPlayers>([]);
    const [playersKey, setPlayersKey] = useState<number>(0);

    const [pageState, setPageState] = useState<IPageState>({ currentPage: 0, pages: ["/"] });
    const fNavigateDirection = (dir: number, replace: boolean = false) => {
        setPageState({ currentPage: pageState.currentPage + dir, pages: pageState.pages });
        navigate(dir);
    }
    const fNavigatePage = (page: string) => {
//        if (checkPreviousBack(pageState, page)) { navigate(-1); return; }
//        if (checkPreviousForward(pageState, page)) { navigate(1); return; }
        setPageState({ currentPage: pageState.currentPage + 1, pages: [...pageState.pages, page] });
        navigate(page, { replace: false });
    }

    const refreshPlayers = () => {
//        setPlayersAll([]);
        setPlayersLoaded(true);

//        if (accountsLoaded) {
//            loopPlayers();
//        }
    }


    const getAppBackground = async () => {
        const randomBG = await getRandomBackground(appBG);
        setAppBG(randomBG);
    };

    useEffect(() => {
        const loopPlayers = async () => {
            let filteredPlayers = await Promise.all(
                allAccounts
                    .filterRegions(regionFilter).filterRoles(roleFilter).filterRandomize().filterUniquePlayers(0, 12)
                    .map(async (player, i): Promise<IPlayer> => {
                        let randomC = getChampionFromId(randomEnum(EChampions, []))!;
                        return {
                            id: i,
                            active: randomActive(),
                            favorite: i <= 2,
                            champion: randomC,
                            skin: await randomSkin(randomC.name),
                            summoner: { accountName: player.accountName, playerName: player.playerName, playerImage: player.playerImage, team: player.team, summonerId: "", summonerPuuid: "", region: player.region, role: player.role, stream: player.stream
                            },
                            gameInfo: { region: getRegion(player.region).use, encryptionKey: "", gameId: "", gameTime: randomNumber(60, 1800)
                            }
                        }
                    })
            ).then((data) => {
                setPlayersAll(data);
                setSidebarFavorites(filterBy(data, p => p.favorite));
                setPlayersKey(playersKey + 1);
                setPlayersLoaded(false);
                console.log("players LOOPEDEND::");
            })
        }

        if (accountsLoaded && playersLoaded) {
            loopPlayers();
        }
    })
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