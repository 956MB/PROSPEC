import React, { useContext, useEffect, useState } from 'react';
import { IPlayerGroups, IPlayers, useInit } from '../../interfaces';
import '../css/players.css';

import { groupByKey, mapEnum, sortByKey } from "../../utils";
import { PlayersGroup } from './PlayersGroup';
import { SpectatorContext } from "../../context/SpectatorContext";
import { EGroupBy, ERoles, ETeams, EEMessages } from '../../typings';
import { useTranslation } from 'react-i18next';

const ROLES_SORT = mapEnum(ERoles, "string", () => {}) as string[];
const TEAMS_SORT = mapEnum(ETeams, "number", (team: number) => { return team.toString() }) as string[];

const Players: React.FC<{
    players: IPlayers,
}> = ({ players }) => {
    const [intervalActive, setIntervalActive] = useState<boolean>(false);
    const [gameInterval, setGameInterval] = useState<number>(0);
    const [menuOpen, setMenuOpen] = useState<number>(-1);

    const [groupedPlayers, setGroupedPlayers] = useState<IPlayerGroups>([]);
    const { groupBy } = useContext(SpectatorContext);

    useInit(() => {
        let grouped: IPlayerGroups = [];

        if (groupBy == EGroupBy.ROLE) {
            grouped = sortByKey(groupByKey(players, player => player.summoner.role), ROLES_SORT);
        } else if (groupBy == EGroupBy.TEAM) {
            grouped = sortByKey(groupByKey(players, player => player.summoner.team), TEAMS_SORT);
        } else if (groupBy == EGroupBy.NONE) {
            grouped = [{ key: EGroupBy.NONE, players: players }] as IPlayerGroups;
        }

        setGroupedPlayers(grouped);
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
                {React.Children.toArray(
                    groupedPlayers.map((group, i) => (
                        <PlayersGroup
                            players={group.players}
                            groupPos={(i == 0 ? 'first-group' : (i == groupedPlayers.length-1 ? 'last-group' : ''))}
                            groupKey={group.key}
                            globalTime={gameInterval}
                            menuOpen={menuOpen}
                            fHandleMenuOpen={(set: number) => setMenuOpen(set)}></PlayersGroup>
                    ))
                )}
            </div>
        </div>
    );
};

const PlayersNotLoaded: React.FC<{
}> = ({}) => {
    const { t } = useTranslation('common');
    
    return (
        <div className={`players-empty noselect`}>
            <span>{t(`${EEMessages.NONE_LOADED}`)}</span>
        </div>
    )
}

export {
    Players,
    PlayersNotLoaded
}