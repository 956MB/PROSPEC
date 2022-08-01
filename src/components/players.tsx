import React, { useEffect, useState } from 'react';
import { IPlayers } from '../interfaces';
import './css/players.css';

import { Card } from './card';

const Players: React.FC<{
    players: IPlayers,
    handleCloseMenus: (playerId: number, set: boolean) => void
}> = ({ players, handleCloseMenus }) => {
    const [gameInterval, setGameInterval] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            setGameInterval(gameInterval + 1);
        }, 1000)

        return () => {
            clearInterval(interval);
        };
    });

    return (
        <div className='pros-container' onClick={() => handleCloseMenus(-1, false)}>
            <div className='pros-scroll'>
                <div className="pros-grid">
                    {players.players.map(player => (
                        <Card key={player.id} playerProps={player} globalTime={gameInterval} handleCloseMenus={handleCloseMenus}></Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Players