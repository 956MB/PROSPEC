import React, { useState } from 'react';
import { EButtonImages, EEMessages, ETooltip } from '../typings';
import './css/settings.css';

import closeIcon from '../assets/icons/close.svg';
import gearIcon from '../assets/icons/gear.svg';
import { ISettingsPageButton } from '../interfaces';

const Settings: React.FC<{
    appBackground: string,
    settingsOpen: boolean,
    handleSettingsOpen: (set: boolean) => void
}> = ({ appBackground, settingsOpen, handleSettingsOpen }) => {

    return (
        <div className={`settings-outer ${settingsOpen ? 'settings-open' : null}`}>
            <SettingsInner settingsOpen={settingsOpen} settingsBackground={appBackground} handleSettingsOpen={handleSettingsOpen}/>

            <SettingsVerticalContainer settingsOpen={settingsOpen} handleSettingsOpen={handleSettingsOpen}/>
        </div>
    )
}

const SettingsVerticalContainer: React.FC<{
    settingsOpen: boolean,
    handleSettingsOpen: (set: boolean) => void
}> = ({ settingsOpen, handleSettingsOpen }) => {
    return (
        <div data-tauri-drag-region className={`settings-vertical-container`} >
            <div className={`vertical-button`} onClick={() => handleSettingsOpen(true)}>
                <img src={gearIcon} alt="gear" />
            </div>
        </div>
    )
}

const SettingsInner: React.FC<{
    settingsOpen: boolean,
    settingsBackground: string,
    handleSettingsOpen: (set: boolean) => void
}> = ({ settingsOpen, settingsBackground, handleSettingsOpen }) => {
    const [pageActive, setPageActive] = useState(0);
    const isActive = (page: number): boolean => {
        return pageActive == page;
    }

    const handlePageSwitch = (active: number) => {
        setPageActive(active);
    }

    return (
        <div className={`${settingsOpen ? 'settings-inner' : 'settings-closed'}`} >
            <div className='settings-title-section'>
                <div className='settings-close-section'>
                    <div className={`titlebar-button titlebar-button-edge-both close-button ${ETooltip.TOOLTIP}`} onClick={() => handleSettingsOpen(false)}>
                        <img src={closeIcon} alt="close" />
                        <span className={`${ETooltip.LEFT}`}>{EEMessages.ESC}</span>
                    </div>
                </div>
                <div className='settings-title-container'>
                    <span className='settings-title-text'>Settings</span>
                    <div className='settings-page-button-container'>
                        <SettingsPageButton pageActive={isActive(0)} buttonProps={{index: 0, text: "Content"}} handlePageSwitch={handlePageSwitch}/>
                        <SettingsPageButton pageActive={isActive(1)} buttonProps={{index: 1, text: "Application"}} handlePageSwitch={handlePageSwitch}/>
                        <SettingsPageButton pageActive={isActive(2)} buttonProps={{index: 2, text: "Language"}} handlePageSwitch={handlePageSwitch}/>
                        <SettingsPageButton pageActive={isActive(3)} buttonProps={{index: 3, text: "About"}} handlePageSwitch={handlePageSwitch}/>
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
    handlePageSwitch: (active: number) => void
}> = ({ pageActive, buttonProps, handlePageSwitch }) => {
    return (
        <div className={`settings-page-button ${pageActive ? 'page-button-active' : null}`} onClick={() => handlePageSwitch(buttonProps.index)}>
            <span className='page-button-text'>{buttonProps.text}</span>
        </div>
    )
}

export default Settings