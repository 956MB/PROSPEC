import React, { useState } from 'react';
import { EButtonImages, EEMessages, ETooltip } from '../typings';
import './css/settings.css';

import closeIcon from '../assets/icons/close.svg';

const Settings: React.FC<{
    appBackground: string,
    settingsOpen: boolean,
    handleCloseSettings: () => void
}> = ({ appBackground, settingsOpen, handleCloseSettings }) => {
    const [settingsBG, setSettingsBG] = useState(appBackground);

    return (
        <div className={`settings-outer ${settingsOpen ? 'settings-open' : null}`}>
            <SettingsInner settingsOpen={settingsOpen} handleCloseSettings={handleCloseSettings} settingsBackground={appBackground}/>
            <SettingsButtonContainer settingsOpen={settingsOpen} handleCloseSettings={handleCloseSettings}/>
        </div>
    )
}

const SettingsButtonContainer: React.FC<{
    settingsOpen: boolean,
    handleCloseSettings: () => void
}> = ({ settingsOpen, handleCloseSettings }) => {
    return (
        <div className={`settings-button-container`} >
            
        </div>
    )
}

const SettingsInner: React.FC<{
    settingsOpen: boolean,
    settingsBackground: string,
    handleCloseSettings: () => void
}> = ({ settingsOpen, settingsBackground, handleCloseSettings }) => {
    return (
        <div className={`${settingsOpen ? 'settings-inner' : 'settings-closed'}`} >
            <div className='settings-title-section'>
                <div className='settings-close-section'>
                    <div className={`titlebar-button titlebar-button-edge-both close-button ${ETooltip.TOOLTIP}`} onClick={() => handleCloseSettings()}>
                        <img src={closeIcon} alt="close" />
                        <span className={`${ETooltip.LEFT}`}>{EEMessages.ESC}</span>
                    </div>
                </div>
                <span className='settings-title'>Settings</span>
            </div>
            <div className="settings-dark-overlay"></div>
            <div className="settings-background" style={{ backgroundImage: `url(src/assets/dragontail-12.13.1/centered/${settingsBackground}.webp)` }}></div>
        </div>
    )
}

export default Settings