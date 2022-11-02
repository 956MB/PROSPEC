import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { appWindow } from '@tauri-apps/api/window';
import { useTranslation } from "react-i18next";
import '../css/titlebar.css';

import { EChampions } from '../../imports/typings';
import { IPageState, ISelectedChamps } from '../../imports/interfaces';
import { checkNavForward, checkNavBackward } from '../../imports/utils';

import { backwardIcon, forwardIcon, refreshIcon, minIcon, maxIcon, closeIcon } from '../../imports/icons';

import { SpectatorContext } from "../../context/SpectatorContext";
import TitlebarNavigationButton from './TitlebarNavigationButton';
import TitlebarControlsButton from './TitlebarControlsButton';

const Titlebar: React.FC<{
    pageState: IPageState,
    fNavigateDirection: (dir: number) => void,
    fRefreshPlayers: () => void
}> = ({ pageState, fNavigateDirection, fRefreshPlayers }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation('common');

    const { regionFilter, modeFilter, roleFilter } = useContext(SpectatorContext);
    const [selectedChamps, setSelectedChamps] = useState<ISelectedChamps>({ champs: [EChampions.ZAC] });

    const [inputValue, setInputValue] = useState<string>("");
    const fInputChange = (e: any) => {
        const { value } = e.target;
        setInputValue(value);
    };

    const updateSelectedChampions = (champId: number) => {
        if (selectedChamps.champs.includes(champId)) {
            setSelectedChamps({
                champs: selectedChamps.champs.filter(champ => champ !== champId)
            });
        } else {
            setSelectedChamps({ champs: [...selectedChamps.champs, champId] })
        }
    }

    return (
        <div data-tauri-drag-region={true} className="titlebar">
            <div className='titlebar-inner'>
                <div className='refresh-group'>
                    <TitlebarNavigationButton buttonIcon={backwardIcon}
                        buttonClasses={`navigation-button ${checkNavBackward(pageState) ? 'active-navigation-button' : ''} nav-back`}
                        onClick={() => fNavigateDirection(-1)} />
                    <TitlebarNavigationButton buttonIcon={forwardIcon}
                        buttonClasses={`navigation-button ${checkNavForward(pageState) ? 'active-navigation-button' : ''} nav-forward`}
                        onClick={() => fNavigateDirection(1)} />

                    {location.pathname === "/" ?
                        <div className='titlebar-button-group'>
                            <TitlebarNavigationButton buttonIcon={refreshIcon}
                                buttonClasses={`nav-refresh refresh-button`}
                                onClick={() => fRefreshPlayers()} />
                            <span className='refresh-text noselect'>{t('titlebar.lastRefresh', { insert: '8:34 PM' })}</span>
                        </div>
                        : null}

                    <SearchBar value={inputValue} fOnChange={fInputChange} searchDisabled={false} fClearSearch={() => setInputValue("")} />
                </div>

                {/* <Options optionsDisabled={settingsOpen} optionsProps={sections} optionsChampProps={sectionsChamp} selectedChamps={selectedChamps} updateSelectedChampions={updateSelectedChampions} /> */}

                <div className='controls-group'>
                    <TitlebarControlsButton buttonIcon={minIcon} buttonId={"titlebar-minimize"} onClick={() => appWindow.minimize()} />
                    <TitlebarControlsButton buttonIcon={maxIcon} buttonId={"titlebar-maximize"} onClick={() => appWindow.toggleMaximize()} />
                    <TitlebarControlsButton buttonIcon={closeIcon} buttonId={"titlebar-close"} onClick={() => appWindow.close()} />
                </div>
            </div>
        </div>
    )
}

const SearchBar: React.FC<{
    searchDisabled: boolean,
    value: string,
    fOnChange: (e: any) => void,
    fClearSearch: () => void
}> = ({ searchDisabled, value, fOnChange, fClearSearch }) => {
    const { t } = useTranslation('common');
    const location = useLocation();

    return (
        <div className={`search-bar ${(value === '') ? '' : 'search-bar-active'} ${searchDisabled ? 'search-disabled' : ''}`}>
            <div className={`icon-container ${(value === '') ? '' : 'icon-clickable'}`} onClick={(value === '') ? () => null : fClearSearch}>
                <img
                    src={`src/assets/icons/${(value === '') ? 'search' : 'close'}.svg`}
                    className={`${(value === '') ? 'search-icon' : 'close-icon'}`} />
            </div>
            <input
                type="text"
                id="fname"
                name="search"
                value={value}
                onChange={fOnChange}
                placeholder={t(`titlebar.${location.pathname === '/settings' ? 'searchSettingsPlaceholder' : 'searchPlayersPlaceholder'}`)}
                spellCheck="false"></input>
        </div>
    )
}

export default Titlebar