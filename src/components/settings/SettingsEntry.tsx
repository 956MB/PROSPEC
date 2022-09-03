import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { pAbout } from "../../utils";
import { ISettingsAboutSectionEntry, ISettingsAboutSectionEntryDep } from "../../interfaces";
import '../css/settings.css';

const SettingsSectionEntryCredit: React.FC<{
    sectionEntry: ISettingsAboutSectionEntry
}> = ({ sectionEntry }) => {
    const [t, i18n] = useTranslation('common');

    return (
        <div className="settings-about-section-entry">
            <span className="settings-about-section-entry-name select">{sectionEntry.name}</span>
            <span className="settings-about-section-entry-reason noselect">{`${t(pAbout(`thanks.${sectionEntry.name}`))}`}</span>
            <a href={sectionEntry.link} target="_blank" rel="noopener noreferrer" className={`settings-about-section-entry-link select`}>{sectionEntry.link}</a>
        </div>
    )
}

const SettingsSectionEntryDep: React.FC<{
    sectionEntry: ISettingsAboutSectionEntryDep
}> = ({ sectionEntry }) => {
    const [t, i18n] = useTranslation('common');
    const [entryOpen, setEntryOpen] = useState<boolean>(false);

    return (
        <div className={`settings-about-section-entry-dep ${entryOpen ? 'entry-open' : null}`}>
            <div
                className={`settings-about-entry-inner`}
                onClick={() => setEntryOpen(!entryOpen)}
            >
                <img src={`src/assets/icons/chevron.down.svg`} alt="" className='value-right' />
                <span className="settings-about-section-entry-name-dep select">{sectionEntry.name}</span>
                <span className="settings-about-section-entry-link-dep select">{`${sectionEntry.version}`}</span>
            </div>

            <div className={`settings-about-entry-content`}>
                <div className="settings-about-entry-title-container">
                    <div className="settings-about-entry-content-name select">{sectionEntry.name}</div>
                    <div className="settings-about-entry-content-version select">{sectionEntry.version}</div>
                </div>
                {sectionEntry.link ? <div className="settings-about-entry-content-link select">{sectionEntry.link}</div> : null}
                {sectionEntry.license && sectionEntry.license != "" ? <div className="settings-about-entry-content-license select">{sectionEntry.license}</div> : null}
            </div>
        </div>
    )
}

export {
    SettingsSectionEntryCredit,
    SettingsSectionEntryDep
}