import React, { useState, useReducer, useEffect, useContext } from 'react';
import './css/card.css';
import { useDetectClickOutside } from 'react-detect-click-outside';

import { formPlayerImage, getChampionFromId, getTeamFromNumber, secondsToTime, checkCutout, ending, randomNumber } from '../utils';
import { IMenuOrigin, IPlayer, ICardStates, IReducerAction } from '../interfaces';

import { EButtonImages, EEMessages, ECardReducerStates, ETooltip } from '../typings';
import { useTranslation } from 'react-i18next';
import { SettingsContext } from '../context/SettingsContext';

import tvIcon from '../assets/icons/tv.svg';
import chartIcon from '../assets/icons/chart.xyaxis.line.svg';
import arrowIcon from '../assets/icons/arrow.up.right.svg';
import dragIcon from '../assets/icons/dots.svg';

const cardReducer = (state: ICardStates, action: IReducerAction): ICardStates => {
    switch (action.type) {
        case ECardReducerStates.LEVEL: return { ...state, level: action.payload as number };
        case ECardReducerStates.GAME_TIME: return { ...state, gameTime: action.payload as number };
        case ECardReducerStates.BACKGROUND_DIR: return { ...state, backgroundDir: action.payload as string };
        case ECardReducerStates.MENU_OPEN: return { ...state, menuOpen: action.payload as boolean };
        case ECardReducerStates.MENU_ORIGIN: return { ...state, menuOrigin: action.payload as IMenuOrigin };
        case ECardReducerStates.CARD_PRESSED: return { ...state, cardPressed: action.payload as boolean };
        default: return state;
    }
}

const Card: React.FC<{
    playerProps: IPlayer,
    globalTime: number,
}> = ({ playerProps, globalTime }) => {
    const { t } = useTranslation('common');
    const { showSummonerIds } = useContext(SettingsContext);

    const team = getTeamFromNumber(playerProps.summoner.team, true);
    const player = formPlayerImage(team, playerProps.summoner.playerName);
    const champ = getChampionFromId(playerProps.champion)?.name;
    const glow = getChampionFromId(playerProps.champion)?.color;

    const [state, dispatch] = useReducer(cardReducer, { level: randomNumber(30, 500), gameTime: playerProps.gameInfo.gameTime, backgroundDir: "tiles", menuOpen: false, menuOrigin: { x: 0, y: 0 }, cardPressed: false })

    const toggleMenuClosed = (e: any) => { e.stopPropagation(); dispatch({ type: ECardReducerStates.MENU_OPEN, payload: false }); }
    const toggleContextMenu = (e: any) => {
        e.preventDefault(); e.stopPropagation();

        if (playerProps.active) {
            dispatch({ type: ECardReducerStates.MENU_ORIGIN, payload: { x: e.clientX, y: e.clientY + 5 } });
            dispatch({ type: ECardReducerStates.MENU_OPEN, payload: true });
        }
    }

    const cardRef = useDetectClickOutside({ onTriggered: toggleMenuClosed });
    const champStyles = {
        backgroundImage: `url(src/assets/dragontail-12.13.1/champion/${champ}.png)`,
        boxShadow: `0 0 100px 10px rgba(${!glow ? '255, 255, 255' : glow}, 0.20)`,
        // boxShadow: (gameTime + globalTime >= 1800) ? '' : `0 0 100px 10px rgba(${!glow ? '255, 255, 255' : glow}, 0.${(gameTime + globalTime >= 1800) ? '30' : '0'})`,
        opacity: `${(!playerProps.active && state.cardPressed) ? '0.5' : '1.0'}`,
        border: `1px solid rgb(${!glow ? '255, 255, 255' : glow}, 0.09)`,
    };

    return (
        <div className={`card-outer`}>
            {(state.menuOpen)
                ? <CardMenu menuX={state.menuOrigin.x} menuY={state.menuOrigin.y} /> : null}

            <div
                className={`player-card ${playerProps.active && state.menuOpen ? 'player-card-clicked' : undefined} ${!playerProps.active ? 'card-unavailable' : null}`}
                // style={(state.cardPressed || state.menuOpen) ? cardStyleClicked : undefined}
                onClick={toggleContextMenu}
                onMouseDown={() => dispatch({ type: ECardReducerStates.CARD_PRESSED, payload: true })}
                onMouseUp={() => dispatch({ type: ECardReducerStates.CARD_PRESSED, payload: false })}
                ref={cardRef}
            >

                {/* <div className={`game-timer ${ending(state.gameTime + globalTime, 'ending-bg')} ${playerProps.active ? null : ETooltip.TOOLTIP}`}>
                    <div className="loading-dots">
                        <h1 className="loading-dot dot-one">.</h1>
                        <h1 className="loading-dot dot-two">.</h1>
                        <h1 className="loading-dot dot-three">.</h1>
                    </div>
                    <span className={`game-timer-text ${ending(state.gameTime + globalTime, 'ending-text')}`}>
                        {`${secondsToTime(state.gameTime + globalTime)}`}
                    </span>
                    <span className={`${playerProps.active ? EButtonImages.NULL : ETooltip.BOTTOM}`}>{t(EEMessages.UNAVAILABLE, { player: playerProps.summoner.playerName })}</span>
                </div> */}
                <div className='card-photo' style={{ backgroundImage: `url(src/assets/photos/${player}.webp)` }}></div>
                <div className={`card-champ ${ETooltip.TOOLTIP}`} style={champStyles}>
                    <span className={`${ETooltip.RIGHT}`}>{`${champ}`}</span>
                </div>
                <img src={dragIcon} alt="drag" className='card-drag noselect' />
                {/* <div className='blur-small'></div> */}
                <div className={state.backgroundDir === "tiles" ? 'card-image' : 'card-image-cutout'} style={{ backgroundImage: `url(src/assets/dragontail-12.13.1/${state.backgroundDir}/${champ}${state.backgroundDir === "tiles" ? '_0.jpg' : '.png'})` }}></div>

                <div className='card-content'>
                    {/* <CardMenu /> */}
                    <div className='text-container'>
                        <span className='text-summoner'>
                            {showSummonerIds ? playerProps.summoner.accountName : playerProps.summoner.playerName}
                        </span>
                        <div className='text-sub-container'>
                            <span className='text-sub noselect'>{`${getTeamFromNumber(playerProps.summoner.team, false)}`}</span>
                            <span className='game-timer-text'>{`${secondsToTime(state.gameTime + globalTime)}`}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CardMenu: React.FC<{
    menuX: number,
    menuY: number
}> = ({ menuX, menuY }) => {

    return (
        <div className={`card-menu`} style={{ top: menuY, left: menuX }}>
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
