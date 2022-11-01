import React, { useState, useReducer, useContext } from 'react';
import '../css/card.css';
import { useDetectClickOutside } from 'react-detect-click-outside';

import { secondsToTime, randomNumber } from '../../imports/utils';
import { IMenuOrigin, IPlayer, ICardStates, IReducerAction } from '../../imports/interfaces';

import { EButtonImages, EEMessages, ECardReducerStates, ETooltip } from '../../imports/typings';
import { useTranslation } from 'react-i18next';
import { SettingsContext } from '../../context/SettingsContext';

import { CardMenu } from './CardMenu';

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
    globalInterval: number,
    menuOpen: boolean,
    fHandleMenuOpen: (set: number) => void,
    fHandlePlayerFavorited: (name: string) => void
}> = ({ playerProps, globalInterval, menuOpen, fHandleMenuOpen, fHandlePlayerFavorited }) => {
    const { t } = useTranslation('common');
    const { showSummonerIds, showRandomSkins } = useContext(SettingsContext);
    const [playerFavorited, setPlayerFavorited] = useState<boolean>(playerProps.favorite);
    const [champ, setChamp] = useState<string>(playerProps.champion.name);

    const [state, dispatch] = useReducer(cardReducer, {
        level: randomNumber(30, 500),
        gameTime: playerProps.gameInfo.gameTime,
        backgroundDir: "centered",
        menuOrigin: { x: 0, y: 0 },
        cardPressed: false
    })

    const toggleMenuClosed = (e: any) => {
        e.stopPropagation();
        if (menuOpen) { fHandleMenuOpen(-1); }
    }
    const toggleMenuOpen = (e: any) => {
        // TODO: detect if menu being opened will be outside viewport, change menu x/y to show inside
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
        opacity: `${(!playerProps.active && state.cardPressed) ? '0.5' : '0.80'}`,
    };

    return (
        <div className={`card-outer`}>
            {(menuOpen)
                ? <CardMenu
                    player={playerProps}
                    favorited={playerFavorited}
                    fToggleFavorited={() => fHandlePlayerFavorited(playerProps.playerAccount.summonerName)}
                    menuX={state.menuOrigin.x}
                    menuY={state.menuOrigin.y} /> : null}

            <div
                className={`player-card ${!playerProps.active ? 'card-unavailable' : null}`}
                onClick={toggleMenuOpen}
                onMouseDown={() => dispatch({ type: ECardReducerStates.CARD_PRESSED, payload: true })}
                onMouseUp={() => dispatch({ type: ECardReducerStates.CARD_PRESSED, payload: false })}
                ref={cardRef}
            >
                <span className='game-timer-text'>{`${secondsToTime(state.gameTime + globalInterval)}`}</span>
                <div className={`loading-dots ${ETooltip.TOOLTIP}`}>
                    <h1 className="loading-dot dot-one">.</h1>
                    <h1 className="loading-dot dot-two">.</h1>
                    <h1 className="loading-dot dot-three">.</h1>
                    <span className={`${playerProps.active ? EButtonImages.NULL : ETooltip.BOTTOM}`}>{t(EEMessages.UNAVAILABLE, { insert: playerProps.playerInfo.playerName })}</span>
                </div>
                <div className={`card-champ noselect`} style={champStyles}></div>
                <div className='card-photo noselect' style={{ backgroundImage: `url(src/assets/photos/${playerProps.playerInfo.playerImage})` }}></div>
                <div
                    className={state.backgroundDir === "centered" ? 'card-image' : 'card-image-cutout'}
                    style={{
                        backgroundImage: `url(src/assets/dragontail/${state.backgroundDir}/${champ}${
                            state.backgroundDir === "centered" ? `_0.jpg` : '.png'})`
                    }}></div>

                <div className='card-content'>
                    <div className='text-container'>
                        <div className={`summoner-container`}>
                            <img src={`src/assets/icons/lanes/${playerProps.playerInfo.role}.png`} alt="role" className='card-role noselect' />
                            <span className='text-summoner'>
                                {showSummonerIds ? playerProps.playerAccount.summonerName : playerProps.playerInfo.playerName}
                            </span>
                        </div>
                        <div className='text-sub-container'>
                            <span className='text-sub noselect'>{`${playerProps.playerInfo.team.long}`}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;