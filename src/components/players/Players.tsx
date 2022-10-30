import React, { useContext, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { IPlayerGroups, IPlayers } from '../../imports/interfaces';
import '../css/players.css';
import {filterBy, groupByKey, mapEnum, sortByKey, getGroupsLen} from "../../imports/utils";
import PlayersGroup from './PlayersGroup';
import PlayersSection from "./PlayersSection";
import { SpectatorContext } from "../../context/SpectatorContext";
import { EGroupBy, ERoles, ETeams, EEMessages } from '../../imports/typings';
import { useInit } from '../../imports/initializers';

const ROLES_SORT = mapEnum(ERoles, "string", () => { }) as string[];
const TEAMS_SORT = mapEnum(ETeams, "number", (team: number) => { return team.toString() }) as string[];

const Players: React.FC<{
    players: IPlayers,
}> = ({ players }) => {
    const [intervalActive, setIntervalActive] = useState<boolean>(false);
    const [gameInterval, setGameInterval] = useState<number>(0);
    const [menuOpen, setMenuOpen] = useState<number>(-1);

    const [totalPlayers, setTotalPlayers] = useState<number>(players.length);
    const [groupedPlayersFavorites, setGroupedPlayersFavorites] = useState<IPlayerGroups>([]);
    const [groupedPlayersRest, setGroupedPlayersRest] = useState<IPlayerGroups>([]);
    const { groupBy } = useContext(SpectatorContext);

    useInit(() => {
        let pFavorites = filterBy(players, p => p.favorite);
        let pRest = filterBy(players, p => !p.favorite);
        let grouped: IPlayerGroups = [];

        if (groupBy == EGroupBy.ROLE) {
            grouped = sortByKey(groupByKey(pRest, player => player.summoner.role), ROLES_SORT);
        } else if (groupBy == EGroupBy.TEAM) {
            grouped = sortByKey(groupByKey(pRest, player => player.summoner.team.short), TEAMS_SORT);
        } else if (groupBy == EGroupBy.NONE) {
            grouped = [{ key: EGroupBy.NONE, players: pRest }] as IPlayerGroups;
        }

        setGroupedPlayersFavorites(pFavorites.length >= 1 ? [{ key: EGroupBy.NONE, players: pFavorites }] : []);
        setGroupedPlayersRest(grouped);
    });

    useEffect(() => {
        if (intervalActive) {
            let interval = setInterval(() => {
                setGameInterval(gameInterval + 1);
            }, 1000)

            return () => {
                clearInterval(interval);
            };
        }
    });

    return (
        <div className='pros-container noselect'>
            <div className='pros-scroll'>
                <PlayersSection sectionTitle={`titles.favorites`} sectionPlayers={getGroupsLen(groupedPlayersFavorites)} sectionEmptyMessage={`tooltips.noFavorites`} />
                {groupedPlayersFavorites.length >= 1 ?
                    React.Children.toArray(
                        groupedPlayersFavorites.map((group, i) => (
                            <PlayersGroup
                                players={group.players}
                                groupPos={(i == 0 ? 'first-group' : (i == groupedPlayersRest.length - 1 ? 'last-group' : ''))}
                                groupKey={group.key}
                                globalInterval={gameInterval}
                                menuOpen={menuOpen}
                                fHandleMenuOpen={(set: number) => setMenuOpen(set)}></PlayersGroup>
                        ))
                ) : null}


                <PlayersSection sectionTitle={`titles.all`} sectionPlayers={getGroupsLen(groupedPlayersRest)} sectionEmptyMessage={`tooltips.noPlayersLoaded`} />
                {groupedPlayersRest.length >= 1 ?
                    React.Children.toArray(
                        groupedPlayersRest.map((group, i) => (
                            <PlayersGroup
                                players={group.players}
                                groupPos={(i == 0 ? 'first-group' : (i == groupedPlayersRest.length - 1 ? 'last-group' : ''))}
                                groupKey={group.key}
                                globalInterval={gameInterval}
                                menuOpen={menuOpen}
                                fHandleMenuOpen={(set: number) => setMenuOpen(set)}></PlayersGroup>
                        ))
                ) : null}
            </div>
        </div>
    );
};

const PlayersNotLoaded: React.FC<{
}> = ({ }) => {
    const { t } = useTranslation('common');

    return (
        <Route path='/empty'>
            <div className={`players-empty noselect`}>
                <span>{t(`${EEMessages.NONE_LOADED}`)}</span>
            </div>
        </Route>
    )
}

export {
    Players,
    PlayersNotLoaded
}