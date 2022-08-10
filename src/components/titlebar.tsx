import React, { useState } from 'react';
import { appWindow } from '@tauri-apps/api/window';
import { useTranslation } from "react-i18next";
import './css/titlebar.css';

import { Options } from './options';
import { EAboutSections, EButtonImages, EChampions, EModes, ERegions, ERoles } from '../typings';
import { IOptionsButton, IOptionsButtonChamp, IOptionsSections, IOptionsSectionsChamp, ISelectedChamps } from '../interfaces';
import { getChampionFromId, included, mapEnum, modeImage, modeType, regionFile, regionFolder, regionType, roleFile, roleType, sliceMap, oMode, oRole, oRegion } from '../utils';

import refreshIcon from '../assets/icons/refresh.svg';
// import sidebarIcon from '../assets/icons/sidebar.svg';
import minIcon from '../assets/icons/min.svg';
import closeIcon from '../assets/icons/close.svg';

const Titlebar: React.FC<{
    settingsOpen: boolean,
    selectedRegions: ERegions[],
    selectedModes: EModes[],
    selectedRoles: ERoles[],
    refreshPlayers: () => void
}> = ({ settingsOpen, selectedRegions, selectedModes, selectedRoles, refreshPlayers }) => {
    const {t, i18n} = useTranslation('common');
    const [sections, setSections] = useState<IOptionsSections>({
        active: !settingsOpen,
        sections: [
            {
                id: 0, name: EAboutSections.REGION, active: true, expanded: false,
                buttons:
                    mapEnum(ERegions, "string", (region: ERegions, i: number) => {
                        return { id: i, active: true, selected: included(selectedRegions, region), type: regionType(region), images: [`${regionFolder(region)}/${region}${regionFile(region)}`], right: "", content: oRegion(region as string) }
                    }) as IOptionsButton[]
            },
            {
                id: 1, name: EAboutSections.MODE, active: true, expanded: false,
                buttons:
                    mapEnum(EModes, "string", (mode: EModes, i: number) => {
                        return { id: i, active: true, selected: included(selectedModes, mode), type: modeType(mode), images: [modeImage(mode)], right: "", content: oMode(mode as string) }
                    }) as IOptionsButton[]
            },
            {
                id: 2, name: EAboutSections.ROLE, active: true, expanded: false,
                buttons:
                    mapEnum(ERoles, "string", (role: ERoles, i: number) => {
                        return { id: i, active: true, selected: included(selectedRoles, role), type: roleType(role), images: [`icons/${role.toLowerCase()}${roleFile(role)}`], right: "", content: oRole(role as string) }
                    }) as IOptionsButton[]
            },
        ]
    });

    const [selectedChamps, setSelectedChamps] = useState<ISelectedChamps>({ champs: [EChampions.ZAC] });
    const [sectionsChamp, setSectionsChamp] = useState<IOptionsSectionsChamp>({
        sections: [
            {
                id: 3, name: EAboutSections.CHAMPIONS, active: true, expanded: false,
                buttons:
                    sliceMap(mapEnum(EChampions, "number", (champ: number, i: number) => {
                        return {
                            id: i, active: true, type: EButtonImages.CHAMP, champ: champ, images: [
                                `dragontail-12.13.1/tiles/${getChampionFromId(champ)?.name}_0.jpg`,
                            ], right: ""
                        }
                    }) as IOptionsButtonChamp[], 0, 10)
            },
        ]
    });

    const [inputValue, setInputValue] = useState("");
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
                        className="titlebar-button titlebar-button-edge-both"
                        id="titlebar-refresh"
                        onClick={() => refreshPlayers()}>
                        <img src={refreshIcon} alt="refresh" />
                    </button>
                    <span className='refresh-text noselect'>{t('titlebar.lastRefresh', {time: '8:34 PM'})}</span>
                </div>

                <Options optionsDisabled={settingsOpen} optionsProps={sections} optionsChampProps={sectionsChamp} selectedChamps={selectedChamps} updateSelectedChampions={updateSelectedChampions} />

                <div className='controls-group'>
                    <SearchBar value={inputValue} fOnChange={fInputChange} searchDisabled={settingsOpen} fClearSearch={() => setInputValue("")}/>
                    <button
                        className="titlebar-button titlebar-button-edge-left"
                        id="titlebar-minimize"
                        onClick={() => appWindow.minimize()}>
                        <img src={minIcon} alt="minimize" />
                    </button>
                    <button
                        className="titlebar-button titlebar-button-edge-right"
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
    const {t, i18n} = useTranslation('common');

    return (
        <div className={`search-bar ${(value === '') ? null : 'search-bar-active'} ${searchDisabled ? 'search-disabled' : null}`}>
            <div className={`icon-container ${(value === '') ? null : 'icon-clickable'}`} onClick={(value === '') ? () => null : fClearSearch}>
                <img
                src={`src/assets/icons/${(value === '') ? 'search' : 'close'}.svg`}
                className={`${(value === '') ? 'search-icon' : 'close-icon'}`}/>
            </div>
            <input type="text" id="fname" name="search" value={value} onChange={fOnChange} placeholder={t('titlebar.searchPlaceholder')}></input>
        </div>
    )
}

export default Titlebar