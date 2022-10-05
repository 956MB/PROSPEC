import React, { useState, useReducer, useContext } from 'react';
import '../css/card.css';
import { useDetectClickOutside } from 'react-detect-click-outside';

import { formPlayerImage, getChampionFromId, getTeamFromNumber, secondsToTime, randomNumber, randomSkin } from '../../imports/utils';
import { IMenuOrigin, IPlayer, ICardStates, IReducerAction } from '../../imports/interfaces';

import { EButtonImages, EEMessages, ECardReducerStates, ETooltip } from '../../imports/typings';
import { useTranslation } from 'react-i18next';
import { SettingsContext } from '../../context/SettingsContext';

import dragIcon from '../../assets/icons/dots.svg';
import { CardMenu } from './CardMenu';
import { useInit } from '../../imports/initializers';

const cardReducer = (state: ICardStates, action: IReducerAction): ICardStates => {
    switch (action.type) {
        case ECardReducerStates.LEVEL: return { ...state, level: action.payload as number };
        case ECardReducerStates.GAME_TIME: return { ...state, gameTime: action.payload as number };
        case ECardReducerStates.BACKGROUND_DIR: return { ...state, backgroundDir: action.payload as string };
        case ECardReducerStates.MENU_ORIGIN: return { ...state, menuOrigin: action.payload as IMenuOrigin };
        case ECardReducerStates.CARD_PRESSED: return { ...state, cardPressed: action.payload as boolean };
        default: return state;
    }
}

const Card: React.FC<{
    playerProps: IPlayer,
    globalTime: number,
    menuOpen: boolean,
    fHandleMenuOpen: (set: number) => void
}> = ({ playerProps, globalTime, menuOpen, fHandleMenuOpen }) => {
    const { t } = useTranslation('common');
    const { showSummonerIds, showRandomSkins } = useContext(SettingsContext);
    const [playerFavorited, setPlayerFavorited] = useState<boolean>(false);
    const [champ, setChamp] = useState<string>(playerProps.champion.name);
    const [glow, setGlow] = useState<string>(playerProps.champion.color);

    const [state, dispatch] = useReducer(cardReducer, { level: randomNumber(30, 500), gameTime: playerProps.gameInfo.gameTime, backgroundDir: "loading", menuOrigin: { x: 0, y: 0 }, cardPressed: false })

    const toggleMenuClosed = (e: any) => {
        e.stopPropagation();

        if (menuOpen) { fHandleMenuOpen(-1); }
    }
    const toggleMenuOpen = (e: any) => {
        e.preventDefault(); e.stopPropagation();

        const rect = e.currentTarget.getBoundingClientRect();
        const newX = e.clientX - rect.left;
        const newY = e.clientY - rect.top;

        if (playerProps.active) {
            dispatch({ type: ECardReducerStates.MENU_ORIGIN, payload: { x: newX, y: newY + 5 } });
            fHandleMenuOpen(playerProps.id);
        }
    }

    const cardRef = useDetectClickOutside({ onTriggered: toggleMenuClosed });
    const champStyles = {
        backgroundImage: `url(src/assets/dragontail/champion/${champ}.png)`,
        boxShadow: `0 0 100px 10px rgba(${!glow ? '255, 255, 255' : glow}, 0.20)`,
        opacity: `${(!playerProps.active && state.cardPressed) ? '0.5' : '1.0'}`,
    };

    return (
        <div className={`card-outer`}>
            {(menuOpen)
                ? <CardMenu player={playerProps} favorited={playerFavorited} fToggleFavorited={() => setPlayerFavorited(!playerFavorited)} menuX={state.menuOrigin.x} menuY={state.menuOrigin.y} /> : null}

            <div
                className={`player-card ${!playerProps.active ? 'card-unavailable' : null}`}
                onClick={toggleMenuOpen}
                onMouseDown={() => dispatch({ type: ECardReducerStates.CARD_PRESSED, payload: true })}
                onMouseUp={() => dispatch({ type: ECardReducerStates.CARD_PRESSED, payload: false })}
                ref={cardRef}
            >
                <div className={`loading-dots ${ETooltip.TOOLTIP}`}>
                    <h1 className="loading-dot dot-one">.</h1>
                    <h1 className="loading-dot dot-two">.</h1>
                    <h1 className="loading-dot dot-three">.</h1>
                    <span className={`${playerProps.active ? EButtonImages.NULL : ETooltip.BOTTOM}`}>{t(EEMessages.UNAVAILABLE, { insert: playerProps.summoner.playerName })}</span>
                </div>
                <div className='card-photo noselect' style={{ backgroundImage: `url(src/assets/photos/${playerProps.summoner.playerImage}.webp)` }}></div>
                <div className={`card-champ noselect`} style={champStyles}></div>
                <span className='game-timer-text'>{`${secondsToTime(state.gameTime + globalTime)}`}</span>
                {/* <img src={dragIcon} alt="drag" className='card-drag noselect' /> */}
                {/* <div className='blur-small'></div> */}
                <div className={state.backgroundDir === "loading" ? 'card-image' : 'card-image-cutout'} style={{ backgroundImage: `url(src/assets/dragontail/${state.backgroundDir}/${champ}${state.backgroundDir === "loading" ? `_${showRandomSkins ? playerProps.skin : 0}.jpg` : '.png'})` }}></div>

                <div className='card-content'>
                    <div className='text-container'>
                        <span className='text-summoner'>
                            {showSummonerIds ? playerProps.summoner.accountName : playerProps.summoner.playerName}
                        </span>
                        <div className='text-sub-container'>
                            <span className='text-sub noselect'>{`${playerProps.summoner.team.long}`}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;