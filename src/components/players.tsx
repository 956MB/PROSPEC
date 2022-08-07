import React, { useEffect, useState } from 'react';
import { IPlayers } from '../interfaces';
import './css/players.css';

import { Card } from './card';

const Players: React.FC<{
    players: IPlayers,
}> = ({ players }) => {
    const [intervalActive, setIntervalActive] = useState(false);
    const [gameInterval, setGameInterval] = useState(0);

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
        <div className='pros-container'>
            <div className='pros-scroll'>
                <div className="pros-grid">
                    {players.players.map(player => (
                        <Card key={player.id} playerProps={player} globalTime={gameInterval}></Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Players