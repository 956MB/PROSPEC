import React, { useState } from 'react';
import { appWindow } from '@tauri-apps/api/window';
import './css/titlebar.css';

import { Options } from './options';
import { EAboutSections, EButtonImages, EChampions, EModes, ERegions, ERoles } from '../typings';
import { IOptionsButton, IOptionsButtonChamp, IOptionsSections, IOptionsSectionsChamp, ISelectedChamps } from '../interfaces';
import { getChampionFromId, getRegion, included, mapEnum, modeImage, modeType, regionFile, regionFolder, regionType, roleFile, roleType } from '../utils';

import refreshIcon from '../assets/icons/refresh.svg';
// import sidebarIcon from '../assets/icons/sidebar.svg';
import minIcon from '../assets/icons/min.svg';
import closeIcon from '../assets/icons/close.svg';

const Titlebar: React.FC<{
    selectedRegions: ERegions[],
    selectedModes: EModes[],
    selectedRoles: ERoles[],
}> = ({ selectedRegions, selectedModes, selectedRoles }) => {
    const [sections, setSections] = useState<IOptionsSections>({
        active: true,
        sections: [
            {
                id: 0, name: EAboutSections.REGION, active: true, expanded: false,
                buttons:
                    mapEnum(ERegions, "string", (region: ERegions, i: number) => {
                        return { id: i, active: true, selected: included(selectedRegions, region), type: regionType(region), images: [`${regionFolder(region)}/${region}${regionFile(region)}`], right: "", content: getRegion(region).display }
                    }) as IOptionsButton[]
            },
            {
                id: 1, name: EAboutSections.MODE, active: true, expanded: false,
                buttons:
                    mapEnum(EModes, "string", (mode: EModes, i: number) => {
                        return { id: i, active: true, selected: included(selectedModes, mode), type: modeType(mode), images: [modeImage(mode)], right: "", content: mode }
                    }) as IOptionsButton[]
            },
            {
                id: 2, name: EAboutSections.ROLE, active: true, expanded: false,
                buttons:
                    mapEnum(ERoles, "string", (role: ERoles, i: number) => {
                        return { id: i, active: true, selected: included(selectedRoles, role), type: roleType(role), images: [`icons/${role.toLowerCase()}${roleFile(role)}`], right: "", content: role }
                    }) as IOptionsButton[]
            },
        ]
    });

    const [selectedChamps, setSelectedChamps] = useState<ISelectedChamps>({ champs: [EChampions.ZAC] });
    const [sectionsChamp, setSectionsChamp] = useState<IOptionsSectionsChamp>({
        sections: [
            {
                id: 3, name: EAboutSections.CHAMPIONS, active: true, expanded: false,
                buttons: mapEnum(EChampions, "number", (champ: number, i: number) => {
                    return {
                        id: i, active: true, type: EButtonImages.CHAMP, champ: champ, images: [
                            `dragontail-12.13.1/tiles/${getChampionFromId(champ)?.name}_0.jpg`,
                        ], right: ""
                    }
                }) as IOptionsButtonChamp[]
            },
        ]
    });

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
                    <button className="titlebar-button titlebar-button-edge-both" id="titlebar-refresh">
                        <img src={refreshIcon} alt="refresh" />
                    </button>
                    <span className='refresh-text noselect'>{`Last Refresh: 8:34 PM`}</span>
                </div>

                <Options optionsProps={sections} optionsChampProps={sectionsChamp} selectedChamps={selectedChamps} updateSelectedChampions={updateSelectedChampions} />

                <div className='controls-group'>
                    {/* <button className="titlebar-button titlebar-button-edge-left" id="titlebar-sidebar">
                        <img src={ sidebarIcon } alt="sidebar" />
                    </button> */}
                    <button className="titlebar-button titlebar-button-edge-left" id="titlebar-minimize" onClick={() => appWindow.minimize()}>
                        <img src={minIcon} alt="minimize" />
                    </button>
                    <button className="titlebar-button titlebar-button-edge-right" id="titlebar-close" onClick={() => appWindow.close()}>
                        <img src={closeIcon} alt="close" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Titlebar