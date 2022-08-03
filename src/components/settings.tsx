import React, { useState } from 'react';
import { EButtonImages, EEMessages, ETooltip } from '../typings';
import './css/settings.css';

import closeIcon from '../assets/icons/close.svg';
import gearIcon from '../assets/icons/gear.svg';
import { ISettingsPageButton } from '../interfaces';

const Settings: React.FC<{
    appBackground: string,
    settingsOpen: boolean,
    FSettingsOpen: (set: boolean) => void
}> = ({ appBackground, settingsOpen, FSettingsOpen }) => {

    return (
        <div className={`settings-outer ${settingsOpen ? 'settings-open' : null}`} /*style={{width: settingsOpen ? '597px' : '55px'}}*/>
            <SettingsInner settingsOpen={settingsOpen} settingsBackground={appBackground} FSettingsOpen={FSettingsOpen}/>

            <SettingsVerticalContainer settingsOpen={settingsOpen} FSettingsOpen={FSettingsOpen}/>
        </div>
    )
}

const SettingsVerticalContainer: React.FC<{
    settingsOpen: boolean,
    FSettingsOpen: (set: boolean) => void
}> = ({ settingsOpen, FSettingsOpen }) => {
    return (
        <div data-tauri-drag-region className={`settings-vertical-container`} >
            <div className={`vertical-button`} onClick={() => FSettingsOpen(true)}>
                <img src={gearIcon} alt="gear" />
            </div>
        </div>
    )
}

// TODO: need to make SettingsInner `display: none` or remove element AFTER settings slides all the way back to 55px.
const SettingsInner: React.FC<{
    settingsOpen: boolean,
    settingsBackground: string,
    FSettingsOpen: (set: boolean) => void
}> = ({ settingsOpen, settingsBackground, FSettingsOpen }) => {
    const [pageActive, setPageActive] = useState(0);
    
    const isActive = (page: number): boolean => {
        return pageActive == page;
    }
    const FPageSwitch = (active: number) => {
        setPageActive(active);
    }

    return (
        <div className={`settings-inner`} >
            <div className='settings-title-section'>
                <div className='settings-close-section'>
                    <div className={`titlebar-button titlebar-button-edge-both close-button ${ETooltip.TOOLTIP}`} onClick={() => FSettingsOpen(false)}>
                        <img src={closeIcon} alt="close" />
                        <span className={`${ETooltip.LEFT}`}>{EEMessages.ESC}</span>
                    </div>
                </div>
                <div className='settings-title-container'>
                    <span className='settings-title-text'>Settings</span>
                    <div className='settings-page-button-container'>
                        <SettingsPageButton pageActive={isActive(0)} buttonProps={{index: 0, text: "Content"}} FPageSwitch={FPageSwitch}/>
                        <SettingsPageButton pageActive={isActive(1)} buttonProps={{index: 1, text: "Application"}} FPageSwitch={FPageSwitch}/>
                        <SettingsPageButton pageActive={isActive(2)} buttonProps={{index: 2, text: "Language"}} FPageSwitch={FPageSwitch}/>
                        <SettingsPageButton pageActive={isActive(3)} buttonProps={{index: 3, text: "About"}} FPageSwitch={FPageSwitch}/>
                    </div>
                </div>

                <SettingsPage pageActive={isActive(0)} pageStyle="red"/>
                <SettingsPage pageActive={isActive(1)} pageStyle="green"/>
                <SettingsPage pageActive={isActive(2)} pageStyle="blue"/>
                <SettingsPage pageActive={isActive(3)} pageStyle="pink"/>
            </div>
            <div className="settings-dark-overlay"></div>
            <div className="settings-background" style={{ backgroundImage: `url(src/assets/dragontail-12.13.1/centered/${settingsBackground}.webp)` }}></div>
        </div>
    )
}

const SettingsPage: React.FC<{
    pageActive: boolean,
    pageStyle: string
}> = ({ pageActive, pageStyle }) => {
    return (
        <div className={`settings-page ${pageActive ? 'page-active' : null}`} /*style={{backgroundColor: pageStyle}}*/>
        </div>
    )
}

const SettingsPageButton: React.FC<{
    pageActive: boolean,
    buttonProps: ISettingsPageButton,
    FPageSwitch: (active: number) => void
}> = ({ pageActive, buttonProps, FPageSwitch }) => {
    return (
        <div className={`settings-page-button ${pageActive ? 'page-button-active' : null}`} onClick={() => FPageSwitch(buttonProps.index)}>
            <span className='page-button-text'>{buttonProps.text}</span>
        </div>
    )
}

export default Settings