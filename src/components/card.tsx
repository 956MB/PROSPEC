import React, { useState, useEffect, useContext } from 'react';
import './css/card.css';
import { useDetectClickOutside } from 'react-detect-click-outside';

import { formPlayerImage, getChampionFromId, getTeamFromNumber, secondsToTime, checkCutout, ending, randomNumber } from '../utils';
import { IMenuOrigin, IPlayer } from '../interfaces';

import { EButtonImages, EEMessages, ETooltip } from '../typings';
import { useTranslation } from 'react-i18next';
import { SettingsContext } from '../context/SettingsContext';

import tvIcon from '../assets/icons/tv.svg';
import chartIcon from '../assets/icons/chart.xyaxis.line.svg';
import arrowIcon from '../assets/icons/arrow.up.right.svg';

const Card: React.FC<{
    playerProps: IPlayer,
    globalTime: number,
}> = ({ playerProps, globalTime }) => {
    const { t } = useTranslation('common');
    const { showSummonerIds } = useContext(SettingsContext);

    const team = getTeamFromNumber(playerProps.summoner.team, true);
    const player = formPlayerImage(team, playerProps.summoner.playerName);
    const champ = getChampionFromId(playerProps.champion)?.name;
    const [level, setLevel] = useState(randomNumber(30, 500));
    const glow = getChampionFromId(playerProps.champion)?.color;
    const [gameTime, setGameTime] = useState(playerProps.gameInfo.gameTime);
    const [cardUseDir, setCardUseDir] = useState("tiles");

    // Context menu:
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuOrigin, setMenuOrigin] = useState({x: 0, y: 0} as IMenuOrigin);
    const toggleMenuClosed = (e: any) => { e.stopPropagation(); setMenuOpen(false); }
    const toggleContextMenu = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        if (playerProps.active) {
            setMenuOrigin({x: e.clientX, y: e.clientY + 5});
            setMenuOpen(true);
        }
    }

    const [cardPressed, setCardPressed] = useState(false);
    const cardRef = useDetectClickOutside({ onTriggered: toggleMenuClosed });

    const cardStyleClicked = { border: `2px solid rgba(${!glow ? '255, 255, 255' : (gameTime + globalTime >= 1800 ? '255, 0, 0' : glow)}, 0.70)` };
    const imageSmallStyles = {
        backgroundImage: `url(src/assets/dragontail-12.13.1/champion/${champ}.png)`,
        opacity: `${(!playerProps.active && cardPressed) ? '0.5' : '1.0'}`,
        border: `1px solid rgb(${!glow ? '255, 255, 255' : glow}, 0.10)`,
    };

    useEffect(() => {
        // const champDir = async () => {
        //     const _dir = await checkCutout(champ!);
        //     setCardUseDir(_dir);
        // };
        // champDir();
    });

    return (
        <div className={`card-outer`}>
            {(menuOpen)
                ? <CardMenu menuX={menuOrigin.x} menuY={menuOrigin.y}/> : null}

            <div
                className={`player-card ${playerProps.active && menuOpen ? 'player-card-clicked' : undefined} ${!playerProps.active ? 'card-unavailable' : null}`}
                style={(cardPressed || menuOpen) ? cardStyleClicked : undefined}
                onClick={toggleContextMenu}
                onMouseDown={() => setCardPressed(true)}
                onMouseUp={() => setCardPressed(false)}
                ref={cardRef}
            >

                <div className={`game-timer ${ending(gameTime + globalTime, 'ending-bg')} ${playerProps.active ? null : ETooltip.TOOLTIP}`}>
                    <div className="loading-dots">
                        <h1 className="loading-dot dot-one">.</h1>
                        <h1 className="loading-dot dot-two">.</h1>
                        <h1 className="loading-dot dot-three">.</h1>
                    </div>
                    {/* <img src={timerIcon} alt="clock" className={`clock-svg ${ending(gameTime + globalTime, 'ending-svg')} noselect`} /> */}
                    <span className={`game-timer-text ${ending(gameTime + globalTime, 'ending-text')}`}>
                        {`${secondsToTime(gameTime + globalTime)}`}
                    </span>
                    <span className={`${playerProps.active ? EButtonImages.NULL : ETooltip.BOTTOM}`}>{t(EEMessages.UNAVAILABLE, {player: playerProps.summoner.playerName})}</span>
                </div>
                <span className='player-level'>{level}</span>
                <div className='image-small-champ' style={imageSmallStyles}></div>
                {/* <div className='blur-small'></div> */}
                <div className='card-photo' style={{ backgroundImage: `url(src/assets/photos/${player}.webp)` }}></div>
                <div className='card-content'>
                    {/* <CardMenu /> */}
                    <div className='text-container'>
                        <span className='text-summoner'>
                            {showSummonerIds ? playerProps.summoner.accountName : playerProps.summoner.playerName}
                        </span>
                        <span className='text-sub noselect'>{`${getTeamFromNumber(playerProps.summoner.team, false)}`}</span>
                    </div>
                </div>
                <div className={cardUseDir === "tiles" ? 'card-image' : 'card-image-cutout'} style={{ backgroundImage: `url(src/assets/dragontail-12.13.1/${cardUseDir}/${champ}${cardUseDir === "tiles" ? '_0.jpg' : '.png'})` }}></div>
            </div>
        </div>
    )
}

const CardMenu: React.FC<{
    menuX: number,
    menuY: number
}> = ({ menuX, menuY }) => {

    return (
        <div className={`card-menu`} style={ {top: menuY, left: menuX} }>
            <div className='card-menu-button'>
                <div className='menu-icon-container'>
                    <img src={tvIcon} alt="alt" className='tv-icon' />
                </div>
                <span className='noselect'>Spectate</span>
            </div>
            <div className='card-menu-button'>
                <div className='menu-icon-container'>
                    <img src={chartIcon} alt="alt" className='chart-icon' />
                </div>
                <span className='noselect'>Live Game</span>
            </div>
            <div className='card-menu-button menu-button-diabled'>
                <div className='menu-icon-container'>
                    <img src={arrowIcon} alt="alt" className='arrow-icon' />
                </div>
                <span className='noselect'>Twitch</span>
            </div>
        </div>
    )
}

export {
    Card,
}
