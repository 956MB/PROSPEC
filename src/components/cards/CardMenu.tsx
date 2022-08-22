
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import '../css/card.css';

import { IPlayer } from "../../interfaces";
import { SettingsContext } from '../../context/SettingsContext';
import { whichStream } from "../../utils";

const CardMenu: React.FC<{
    player: IPlayer,
    favorited: boolean,
    fToggleFavorited: () => void,
    menuX: number,
    menuY: number
}> = ({ player, favorited, fToggleFavorited, menuX, menuY }) => {
    const { t } = useTranslation('common');
    const { showSummonerIds } = useContext(SettingsContext);
    const [ toggleBounce, setToggleBounce ] = useState(false);

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, callback: () => void) => {
        e.preventDefault(); e.stopPropagation();
        callback();
    }
    const openInNewTab = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    const triggerBounce = () => {
        setToggleBounce(true);
        setInterval(() => {
            setToggleBounce(false);
        }, 200)
    }

    return (
        <div className={`card-menu`} style={{ top: menuY, left: menuX }}>
            <span className='card-menu-info noselect'>{`${showSummonerIds ? player.summoner.accountName : player.summoner.playerName}:`}</span>

            <div className='card-menu-button' onClick={(event) => stopPropagation(event, () => {})}>
                <div className='menu-icon-container'>
                    <div className={`tv-icon tvNormal`}></div>
                </div>
                <span className='noselect'>{t('menus.spectate')}</span>
            </div>
            <div className='card-menu-button' onClick={(event) => stopPropagation(event, () => {})}>
                <div className='menu-icon-container'>
                    <div className={`chart-icon chartNormal`}></div>
                </div>
                <span className='noselect'>{t('menus.livegame')}</span>
            </div>
            
            {player.summoner.stream === "" ? null
                :
                <div className='card-menu-button' onClick={(event) => stopPropagation(event, () => openInNewTab(player.summoner.stream))}>
                    <div className='menu-icon-container'>
                        <div className={`arrow-icon arrowNormal`}></div>
                    </div>
                    <span className='noselect'>{t(whichStream(player.summoner.stream))}</span>
                </div>}

            <div className={`card-menu-spacer`}>
                <div className='menu-divider'></div>
            </div>

            <div className='card-menu-button' onClick={(event) => stopPropagation(event, () => {
                fToggleFavorited(); triggerBounce()
                })}>
                <div className='menu-icon-container'>
                    <div className={`heart-icon ${favorited ? 'heartFavorited' : 'heartUnfavorited'} ${toggleBounce ? 'icon-bounce' : 'icon-normal'}`}></div>
                </div>
                <span className='noselect'>{t(favorited ? 'menus.unfavorite' : 'menus.favorite')}</span>
            </div>
        </div>
    )
}

export {
    CardMenu
}