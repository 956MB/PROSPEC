import React, { useEffect, useState } from 'react';
import { IPlayerGroups, IPlayers, useInit } from '../../interfaces';
import '../css/players.css';

import { groupBy, sortRoles } from "../../utils";
import { PlayersGroup } from './PlayersGroup';

const Players: React.FC<{
    players: IPlayers,
}> = ({ players }) => {
    const [intervalActive, setIntervalActive] = useState(false);
    const [gameInterval, setGameInterval] = useState(0);
    const [menuOpen, setMenuOpen] = useState(-1);

    const [groupedPlayers, setGroupedPlayers] = useState<IPlayerGroups>([]);

    useInit(() => {
        const by = groupBy(players, player => player.summoner.role);
        const sortedGroups = sortRoles(by);
        setGroupedPlayers(sortedGroups);
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

        // const by = groupBy(players, player => player.summoner.role);
        // const grouped = Object.values(by) as IPlayers[];
        // console.log(by);
        // sortRoles(by);
        // setGroupedPlayers(grouped);
    });

    return (
        <div className='pros-container noselect'>
            <div className='pros-scroll'>
                {React.Children.toArray(
                    groupedPlayers.map((group, i) => (
                        <PlayersGroup
                            players={group.players}
                            groupPos={(i == 0 ? 'first-group' : (i == groupedPlayers.length-1 ? 'last-group' : ''))}
                            useText={group.key}
                            useImage={`./src/assets/icons/${group.key}.png`}
                            // useImage={`./src/assets/logos/${getTeamFromNumber(group.at(0)!.summoner.team, true).toLowerCase()}.png`}
                            globalTime={gameInterval}
                            menuOpen={menuOpen}
                            fHandleMenuOpen={(set: number) => setMenuOpen(set)}></PlayersGroup>
                    ))
                )}
            </div>
        </div>
    );
};

export default Players