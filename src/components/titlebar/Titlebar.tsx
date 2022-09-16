import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appWindow } from '@tauri-apps/api/window';
import { useTranslation } from "react-i18next";
import '../css/titlebar.css';

import { Options } from '../options';
import { EAboutSections, EButtonImages, EChampions, EModes, ERegions, ERoles } from '../../imports/typings';
import { IOptionsButton, IOptionsButtonChamp, IOptionsSections, IOptionsSectionsChamp, ISelectedChamps } from '../../imports/interfaces';
import { getChampionFromId, included, mapEnum, modeImage, modeType, regionFile, regionFolder, regionType, roleFile, roleType, sliceMap, oMode, oRole, oRegion } from '../../imports/utils';

import backwardIcon from '../../assets/icons/chevron.backward.svg';
import forwardIcon from '../../assets/icons/chevron.forward.svg';
import refreshIcon from '../../assets/icons/arrow.clockwise.svg';

import minIcon from '../../assets/icons/min.svg';
import maxIcon from '../../assets/icons/max.svg';
import closeIcon from '../../assets/icons/close.svg';

import { SpectatorContext } from "../../context/SpectatorContext";

const Titlebar: React.FC<{
    fSettingsOpen: (set?: boolean) => void,
    fRefreshPlayers: () => void
}> = ({ fSettingsOpen, fRefreshPlayers }) => {
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
                    <button
                        className="titlebar-button refresh-group-button noselect"
                        id='backward-button'
                        onClick={() => fSettingsOpen(false)}
                        >
                        <img src={backwardIcon} alt="backward" id="titlebar-back" />
                    </button>
                    <button
                        className="titlebar-button refresh-group-button noselect"
                        id='forward-button'
                        onClick={() => fSettingsOpen(true)}
                        >
                        <img src={forwardIcon} alt="forward" id="titlebar-forward" />
                    </button>

                    <div className='titlebar-button-group'>
                        <button
                            className="titlebar-button refresh-group-button noselect"
                            id='refresh-button'
                            onClick={() => fRefreshPlayers()}>
                            <img src={refreshIcon} alt="refresh" id="titlebar-refresh" />
                        </button>
                        <span className='refresh-text noselect'>{t('titlebar.lastRefresh', {time: '8:34 PM'})}</span>
                    </div>

                    {/* <SearchBar value={inputValue} fOnChange={fInputChange} searchDisabled={settingsOpen} fClearSearch={() => setInputValue("")}/> */}
                </div>

                {/* <Options optionsDisabled={settingsOpen} optionsProps={sections} optionsChampProps={sectionsChamp} selectedChamps={selectedChamps} updateSelectedChampions={updateSelectedChampions} /> */}

                <div className='controls-group'>
                    <button
                        className="titlebar-controls-button"
                        id="titlebar-minimize"
                        onClick={() => appWindow.minimize()}>
                        <img src={minIcon} alt="minimize" />
                    </button>
                    <button
                        className="titlebar-controls-button"
                        id="titlebar-maximize"
                        onClick={() => appWindow.toggleMaximize()}>
                        <img src={maxIcon} alt="maximize" />
                    </button>
                    <button
                        className="titlebar-controls-button"
                        id="titlebar-close"
                        onClick={() => appWindow.close()}>
                        <img src={closeIcon} alt="close" />
                    </button>
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