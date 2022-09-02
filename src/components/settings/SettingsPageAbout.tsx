import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { pAbout } from "../../utils";
import { ISettingsAboutSectionEntries } from "../../interfaces";
import { ETooltip } from "../../typings";
import '../css/settings.css';

const SettingsPageAbout: React.FC<{
    pageActive: boolean,
}> = ({ pageActive }) => {
    const [t, i18n] = useTranslation('common');

    const [credits, setCredits] = useState<ISettingsAboutSectionEntries>([
        { name: "Jason Chan", link: "https://www.artstation.com/jasonchan" },
        { name: "Sephi Lash", link: "https://www.artstation.com/sephilash" },
        { name: "Adrien Gonzalez", link: "https://www.artstation.com/adrieng" },
        { name: "Riot Games", link: "https://www.riotgames.com" },
        { name: "Metafy.gg", link: "https://metafy.gg/" },
    ]);
    const [thirdParty, setThirdParty] = useState<ISettingsAboutSectionEntries>([
        { name: "@tauri-apps/api", link: "@^1.0.1" },
        { name: "@tauri-apps/cli", link: "@^1.0.1" },
        { name: "tauri-plugin-store-api", link: "@github:tauri-apps/tauri-plugin-store#dev" },
        { name: "@types/react", link: "@^18.0.0" },
        { name: "@types/react-dom", link: "@^18.0.0" },
        { name: "@types/node", link: "@^18.0.5" },
        { name: "typescript", link: "@^4.6.3" },
        { name: "react", link: "@^18.0.0" },
        { name: "react-detect-click-outside", link: "@^1.1.7" },
        { name: "react-dom", link: "@^18.0.0" },
        { name: "react-hotkeys-hook", link: "@^3.4.7" },
        { name: "react-i18next", link: "@^11.18.3" },
        { name: "@vitejs/plugin-react", link: "@^1.3.0" },
        { name: "vite", link: "@^2.9.9" },
        { name: "i18next", link: "@^21.8.16" },
        { name: "ini", link: "@^3.0.0" },
        { name: "random", link: "@^3.0.6" },
    ]);

    return (
        <div className={`settings-page-about ${pageActive ? 'page-active' : null}`}>
            <div className='settings-about-title-container'>
                <span className='settings-about-title-text noselect'>{`ProSpec`}</span>
                <div className="settings-about-button">
                    <span>{t(pAbout("github"))}</span>
                </div>
                <div className="settings-about-button-accent">
                    <span>{t(pAbout("checkForUpdates"))}</span>
                </div>
            </div>
            <div className={`settings-about-version-container ${ETooltip.TOOLTIP}`}>
                <span className={`settings-about-version-text noselect`}>{`v1.1.92.647.ga4397eb7 (Windows 64-bit)`}</span>
                <span className={`${ETooltip.RIGHT} right-close noselect`}>{`Copy`}</span>
            </div>

            <div className={`settings-about-description`}>
                <span className="noselect">{t(pAbout(`description`))}</span>
            </div>

            {/* <div className={`settings-about-buttons-container`}>
                <div className="settings-about-button">
                    <span>Github</span>
                </div>
                <div className="settings-about-button">
                    <span>Changelog</span>
                </div>
            </div> */}

            <div className={`settings-about-section`}>
                <div className="settings-about-section-title">
                    <span className="noselect">{`${t(pAbout(`thanks.title`))}:`}</span>
                </div>

                <div className="settings-about-section-credit-container">
                    {React.Children.toArray(
                        credits.map((credit, i) => (
                            <div className="settings-about-section-entry">
                                <span className="settings-about-section-entry-name select">{credit.name}</span>
                                <span className="settings-about-section-entry-reason noselect">{`${t(pAbout(`thanks.${credit.name}`))}`}</span>
                                {/* <span className="settings-about-section-entry-link select">{`${credit.link}`}</span> */}
                                <a href={credit.link} target = "_blank" rel = "noopener noreferrer" className={`settings-about-section-entry-link select`}>{credit.link}</a>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className={`settings-about-section`}>
                <div className="settings-about-section-title">
                    <span className="noselect">{`${t(pAbout(`third-party`))}:`}</span>
                </div>

                <div className={`settings-about-third-party-container`}>
                    {React.Children.toArray(
                        thirdParty.map((software, i) => (
                            <div className="settings-about-section-entry">
                                <span className="settings-about-section-entry-name-third-party select">{software.name}</span>
                                {/* <div className="dots-divider"></div> */}
                                <span className="settings-about-section-entry-link-third-party select">{`${software.link}`}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export {
    SettingsPageAbout
}