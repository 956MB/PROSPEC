import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { appWindow } from '@tauri-apps/api/window';
import { useTranslation } from "react-i18next";
import '../css/titlebar.css';

import { Options } from '../options';
import { EAboutSections, EButtonImages, EChampions, EModes, ERegions, ERoles } from '../../imports/typings';
import { IOptionsButton, IOptionsButtonChamp, IOptionsSections, IOptionsSectionsChamp, IPageState, ISelectedChamps } from '../../imports/interfaces';
import { getChampionFromId, included, mapEnum, modeImage, modeType, regionFile, regionFolder, regionType, roleFile, roleType, sliceMap, oMode, oRole, oRegion, checkNavForward, checkNavBackward } from '../../imports/utils';

import backwardIcon from '../../assets/icons/UIcons/fi-br-angle-left.svg';
import forwardIcon from '../../assets/icons/UIcons/fi-br-angle-right.svg';
import refreshIcon from '../../assets/icons/UIcons/fi-rr-refresh.svg';
import minIcon from '../../assets/icons/default/minimize-active-light.ico';
import maxIcon from '../../assets/icons/default/maximize-active-light.ico';
import closeIcon from '../../assets/icons/UIcons/fi-rs-cross.svg';

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
    const { regionFilter, modeFilter, roleFilter } = useContext(SpectatorContext);
    const { t } = useTranslation('common');
    // const [sections, setSections] = useState<IOptionsSections>({
    //     active: !settingsOpen,
    //     sections: [
    //         {
    //             id: 0, name: EAboutSections.REGION, active: true, expanded: false,
    //             buttons:
    //                 mapEnum(ERegions, "string", (region: ERegions, i: number) => {
    //                     return { id: i, active: true, selected: included(regionFilter, region), type: regionType(region), images: [`${regionFolder(region)}/${region}${regionFile(region)}`], right: "", content: oRegion(region as string) }
    //                 }) as IOptionsButton[]
    //         },
    //         {
    //             id: 1, name: EAboutSections.MODE, active: true, expanded: false,
    //             buttons:
    //                 mapEnum(EModes, "string", (mode: EModes, i: number) => {
    //                     return { id: i, active: true, selected: included(modeFilter, mode), type: modeType(mode), images: [modeImage(mode)], right: "", content: oMode(mode as string) }
    //                 }) as IOptionsButton[]
    //         },
    //         {
    //             id: 2, name: EAboutSections.ROLE, active: true, expanded: false,
    //             buttons:
    //                 mapEnum(ERoles, "string", (role: ERoles, i: number) => {
    //                     return { id: i, active: true, selected: included(roleFilter, role), type: roleType(role), images: [`icons/${role.toLowerCase()}${roleFile(role)}`], right: "", content: oRole(role as string) }
    //                 }) as IOptionsButton[]
    //         },
    //     ]
    // });

    const [selectedChamps, setSelectedChamps] = useState<ISelectedChamps>({ champs: [EChampions.ZAC] });
    // const [sectionsChamp, setSectionsChamp] = useState<IOptionsSectionsChamp>({
    //     sections: [
    //         {
    //             id: 3, name: EAboutSections.CHAMPIONS, active: true, expanded: false,
    //             buttons:
    //                 sliceMap(mapEnum(EChampions, "number", (champ: number, i: number) => {
    //                     return {
    //                         id: i, active: true, type: EButtonImages.CHAMP, champ: champ, images: [
    //                             `dragontail/tiles/${getChampionFromId(champ)?.name}_0.jpg`,
    //                         ], right: ""
    //                     }
    //                 }) as IOptionsButtonChamp[], 0, 10)
    //         },
    //     ]
    // });

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
        <div data-tauri-drag-region className="titlebar">
            <div className='titlebar-inner'>
                <div className='refresh-group'>
                    <TitlebarNavigationButton buttonIcon={backwardIcon}
                        buttonClasses={`navigation-button ${checkNavBackward(pageState) ? 'active-navigation-button' : null} nav-back`}
                        onClick={() => fNavigateDirection(-1)}/>
                    <TitlebarNavigationButton buttonIcon={forwardIcon}
                        buttonClasses={`navigation-button ${checkNavForward(pageState) ? 'active-navigation-button' : null} nav-forward`}
                        onClick={() => fNavigateDirection(1)}/>

                    {location.pathname === "/" ?
                        <div className='titlebar-button-group'>
                            <TitlebarNavigationButton buttonIcon={refreshIcon}
                                buttonClasses={`nav-refresh refresh-button`}
                                onClick={() => fRefreshPlayers()}/>
                            <span className='refresh-text noselect'>{t('titlebar.lastRefresh', {insert: '8:34 PM'})}</span>
                        </div>
                    : null}

                    {/* <SearchBar value={inputValue} fOnChange={fInputChange} searchDisabled={settingsOpen} fClearSearch={() => setInputValue("")}/> */}
                </div>

                {/* <Options optionsDisabled={settingsOpen} optionsProps={sections} optionsChampProps={sectionsChamp} selectedChamps={selectedChamps} updateSelectedChampions={updateSelectedChampions} /> */}

                <div className='controls-group'>
                    <TitlebarControlsButton buttonIcon={minIcon} buttonId={"titlebar-minimize"} onClick={() => appWindow.minimize()}/>
                    <TitlebarControlsButton buttonIcon={maxIcon} buttonId={"titlebar-maximize"} onClick={() => appWindow.toggleMaximize()}/>
                    <TitlebarControlsButton buttonIcon={closeIcon} buttonId={"titlebar-close"} onClick={() => appWindow.close()}/>
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

    return (
        <div className={`search-bar ${(value === '') ? null : 'search-bar-active'} ${searchDisabled ? 'search-disabled' : null}`}>
            <div className={`icon-container ${(value === '') ? null : 'icon-clickable'}`} onClick={(value === '') ? () => null : fClearSearch}>
                <img
                src={`src/assets/icons/${(value === '') ? 'search' : 'close'}.svg`}
                className={`${(value === '') ? 'search-icon' : 'close-icon'}`}/>
            </div>
            <input type="text" id="fname" name="search" value={value} onChange={fOnChange} placeholder={t('titlebar.searchPlaceholder')} spellCheck="false"></input>
        </div>
    )
}

export default Titlebar