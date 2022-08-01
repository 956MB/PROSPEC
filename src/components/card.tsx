import React, { useState, useEffect } from 'react';
import './css/card.css';

import { formPlayerImage, getChampionFromId, getTeamString, secondsToTime, checkCutout, ending } from '../utils';
import { IPlayer } from '../interfaces';

import timerIcon from '../assets/icons/hourglass.svg';
import { EButtonImages, EEMessages, ETooltip } from '../typings';

const Card: React.FC<{
    playerProps: IPlayer,
    globalTime: number,
    handleCloseMenus: (playerId: number, set: boolean) => void
}> = ({ playerProps, globalTime, handleCloseMenus }) => {
    const team = getTeamString(playerProps.summoner.team, true);
    const player = formPlayerImage(team, playerProps.summoner.playerName);
    const champ = getChampionFromId(playerProps.champion)?.name;
    const glow = getChampionFromId(playerProps.champion)?.color;
    const [gameTime, setGameTime] = useState(playerProps.gameInfo.gameTime);
    const [cardUseDir, setCardUseDir] = useState("loading");

    const [cardPressed, setCardPressed] = useState(false);
    const toggleCardClicked = (e: any) => {
        e.stopPropagation();
        if (playerProps.active) {
            handleCloseMenus(playerProps.id, !playerProps.menuOpen);
        }
    }
    const cardStyleClicked = { border: `2px solid rgba(${!glow ? '255, 255, 255' : (gameTime + globalTime >= 1800 ? '255, 0, 0' : glow)}, 0.70)` };
    // const cardStyleClicked = { border: `2px solid rgba(255, 255, 255, 0.30)` };
    const imageSmallStyles = {
        // backgroundImage: `url(src/assets/logos/${team}.png)`,
        backgroundImage: `url(src/assets/dragontail-12.13.1/champion/${champ}.png)`,
        opacity: `${(!playerProps.active && cardPressed) ? '0.5' : '1.0'}`,
        // backgroundImage: `url(src/assets/dragontail-12.13.1/profileicon/${proProps.profileIcon}.webp)`,
        boxShadow: (gameTime + globalTime >= 1800) ? '' : `0 0 100px 10px rgba(${!glow ? '255, 255, 255' : glow}, 0.30)`,
        border: `1px solid rgb(${!glow ? '255, 255, 255' : glow}, 0.10)`,
        animation: (gameTime + globalTime >= 1800) ? `blinkEnding 5s linear infinite` : ''
    };

    useEffect(() => {
        const champDir = async () => {
            const _dir = await checkCutout(champ!);
            setCardUseDir(_dir);
        };
        champDir();
    });

    // onMouseDown={() => setCardPressed(true)} onMouseUp={() => setCardPressed(false)}
    // outline: `2px solid rgba(${!glow ? '255, 255, 255' : glow}, 0.70)`
    return (
        <div
            className={`player-card ${playerProps.menuOpen ? 'player-card-clicked' : undefined} ${!playerProps.active ? 'card-unavailable' : null}`}
            style={(cardPressed || playerProps.menuOpen) ? cardStyleClicked : undefined}
            onClick={toggleCardClicked}
            onMouseDown={() => setCardPressed(true)}
            onMouseUp={() => setCardPressed(false)}
        >
            <div className={`game-timer ${ending(gameTime + globalTime, 'ending-bg')} ${playerProps.active ? null : ETooltip.TOOLTIP}`}>
                <div className="loading-dots">
                    <h1 className="loading-dot dot-one">.</h1>
                    <h1 className="loading-dot dot-two">.</h1>
                    <h1 className="loading-dot dot-three">.</h1>
                </div>
                <img src={timerIcon} alt="clock" className={`clock-svg ${ending(gameTime + globalTime, 'ending-svg')} noselect`} />
                <span className={`text-sub ${ending(gameTime + globalTime, 'ending-text')}`}>
                    {`${secondsToTime(gameTime + globalTime)}`}
                </span>
                <span className={`${playerProps.active ? EButtonImages.NULL : ETooltip.BOTTOM}`}>{EEMessages.UNAVAILABLE}</span>
            </div>
            <div className='image-small-champ' style={imageSmallStyles}></div>
            <div className='blur-small'></div>
            <div className='card-content'>
                <CardMenu />
                <div className='card-photo' style={{ backgroundImage: `url(src/assets/photos/${player}.webp)` }}></div>
                <div className='text-container'>
                    <span className='text-summoner tooltip'>
                        {/* <span className="tooltiptext">{ playerProps.player }</span> */}
                        {playerProps.summoner.accountName}
                    </span>
                    <span className='text-sub noselect'>{`${getTeamString(playerProps.summoner.team, false)}`}</span>
                </div>
            </div>
            <div className={cardUseDir === "loading" ? 'card-image' : 'card-image-cutout'} style={{ backgroundImage: `url(src/assets/dragontail-12.13.1/${cardUseDir}/${champ}${cardUseDir === "loading" ? '_0.webp' : '.png'})` }}></div>
        </div>
    )
}

const CardMenu: React.FC<{
}> = () => {
    return (
        <div className='card-menu'>
            <div className='card-menu-button'>
                <span>Spectate</span>
            </div>
            <div className='card-menu-button'>
                <span>Live Game</span>
            </div>
            <div className='card-menu-button'>
                <span>Twitch</span>
            </div>
        </div>
    )
}

export {
    Card,
}
