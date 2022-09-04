import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { pAbout } from "../../utils";
import { ISettingsSectionChangeEntries, ISettingsSectionEntries, ISettingsSectionEntry, ISettingsSectionEntryChange, ISettingsSectionPackageEntries, ISettingsSections } from "../../interfaces";
import { EChangeType, ETooltip } from "../../typings";
import '../css/settings.css';

import { SettingsSection } from "./SettingsSection";
import appPackages from "../../imports/licenses";

const SettingsPageAbout: React.FC<{
    pageActive: boolean,
}> = ({ pageActive }) => {
    const [t] = useTranslation('common');

    const [sections, setSections] = useState<ISettingsSections>([
        {
            type: "credit", title: "thanks.title", initOpen: true, entries: [
                { name: "Jason Chan", link: "https://www.artstation.com/jasonchan" },
                { name: "Sephi Lash", link: "https://www.artstation.com/sephilash" },
                { name: "Adrien Gonzalez", link: "https://www.artstation.com/adrieng" },
                { name: "Riot Games", link: "https://www.riotgames.com" },
                { name: "Metafy.gg", link: "https://metafy.gg/" },
            ]
        },
        {
            type: "change", title: "changelog", initOpen: true, entries: [
                { version: "3.0.7", date: "August 30th, 2022", changes: [
                    { type: EChangeType.ADDED, change: "Add Warp terminal integration for macOS - #14329. Thanks @lhvy!", issues: [] },
                    { type: EChangeType.ADDED, change: "Add context menu to the Current Branch and Current Repository toolbar - #13148. Thanks @uttiya10!", issues: [] },
                    { type: EChangeType.FIXED, change: "Older versions of Sublime Text and SlickEdit are also recognized as external editors - #15117. Thanks @vbwx!", issues: [] },
                    { type: EChangeType.IMPROVED, change: "Display a banner when we have a pretext release note to highlight the new feature - #14620", issues: [] },
                    { type: EChangeType.REMOVED, change: "Outdated new drag and drop and split diff new feature callouts removed - #14463", issues: [] },
                ] } as ISettingsSectionEntryChange,
                { version: "3.0.6", date: "August 24th, 2022", changes: [
                    { type: EChangeType.FIXED, change: "Do not show login prompt when repositories are fetched - #15163", issues: [] }
                ] } as ISettingsSectionEntryChange
            ] as ISettingsSectionEntries
        },
        {
            type: "package", title: "package", initOpen: false, entries:
                appPackages.map((_package) => {
                    return _package;
                })
        },
    ]);

    return (
        <div className={`settings-page-about ${pageActive ? 'page-active' : null}`}>
            <div className='settings-about-title-container'>
                <span className='settings-about-title-text noselect'>{`ProSpec`}</span>
                <a href="https://github.com/956MB/ProSpec" target="_blank" rel="noopener noreferrer" className="settings-about-button">
                    <span>{t(pAbout("github"))}</span>
                </a>
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

            {React.Children.toArray(
                sections.map((section) => (
                    <SettingsSection
                        sectionType={section.type}
                        sectionTitle={t(pAbout(section.title))}
                        sectionEntries={section.entries}
                        sectionOpenInit={section.initOpen} />
                ))
            )}
        </div>
    )
}

export {
    SettingsPageAbout
}