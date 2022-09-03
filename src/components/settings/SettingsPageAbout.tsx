import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { pAbout } from "../../utils";
import { ISettingsAboutSectionEntries, ISettingsAboutSectionEntry, ISettingsAboutSectionEntryPackages } from "../../interfaces";
import { ETooltip } from "../../typings";
import '../css/settings.css';

import { SettingsSection } from "./SettingsSection";
import appPackages from "../../imports/licenses";

const SettingsPageAbout: React.FC<{
    pageActive: boolean,
}> = ({ pageActive }) => {
    const [t] = useTranslation('common');

    const [credits] = useState<ISettingsAboutSectionEntries>([
        { name: "Jason Chan", link: "https://www.artstation.com/jasonchan" },
        { name: "Sephi Lash", link: "https://www.artstation.com/sephilash" },
        { name: "Adrien Gonzalez", link: "https://www.artstation.com/adrieng" },
        { name: "Riot Games", link: "https://www.riotgames.com" },
        { name: "Metafy.gg", link: "https://metafy.gg/" },
    ]);
    const [packages] = useState<ISettingsAboutSectionEntryPackages>(
        appPackages.map((_package) => {
            return _package;
        })
    );

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
                <span className={`${ETooltip.RIGHT} right-close noselect`}>{t(`tooltips.copy`)}</span>
            </div>

            <div className={`settings-about-description`}>
                <span className="noselect">{t(pAbout(`description`))}</span>
            </div>

            <SettingsSection
                sectionType="credit"
                sectionTitle={t(pAbout(`thanks.title`))}
                sectionEntries={credits}
                sectionOpenInit={true}/>

            <SettingsSection
                sectionType="dep"
                sectionTitle={t(pAbout(`package`))}
                sectionEntries={packages}
                sectionOpenInit={false}/>

        </div>
    )
}

export {
    SettingsPageAbout
}