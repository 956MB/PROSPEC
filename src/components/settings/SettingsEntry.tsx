import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import parse from 'html-react-parser';

import { pAbout, replaceIssueTag } from "../../utils";
import { ISettingsSectionEntry, ISettingsSectionEntryPackage, ISettingsSectionEntryChange } from "../../interfaces";
import '../css/settings.css';
import { EChangeType } from "../../typings";

const SettingsSectionEntryCredit: React.FC<{
    sectionEntry: ISettingsSectionEntry
}> = ({ sectionEntry }) => {
    const [t] = useTranslation('common');

    return (
        <div className="settings-about-section-entry">
            <span className="settings-about-section-entry-name select">{sectionEntry.name}</span>
            <span className="settings-about-section-entry-reason noselect">{`${t(pAbout(`thanks.${sectionEntry.name}`))}`}</span>
            <a href={sectionEntry.link} target="_blank" rel="noopener noreferrer" className={`settings-about-section-entry-link select`}>{sectionEntry.link}</a>
        </div>
    )
}

const SettingsSectionEntryChange: React.FC<{
    sectionEntry: ISettingsSectionEntryChange
}> = ({ sectionEntry }) => {
    const [entryOpen, setEntryOpen] = useState<boolean>(false);

    return (
        <div className={`settings-about-section-entry-change ${entryOpen ? 'entry-open' : null}`}>
            <div
                className={`settings-about-entry-inner`}
                onClick={() => setEntryOpen(!entryOpen)}
            >
                <img src={`src/assets/icons/chevron.down.svg`} alt="" className='settings-about-section-entry-chevron value-right noselect' />
                <span className="settings-about-section-entry-version-change noselect">{sectionEntry.version}</span>
                <span className="settings-about-section-entry-date-change noselect">{sectionEntry.date}</span>
                {sectionEntry.changes.length >= 1 ?
                    <span className="settings-about-section-entry-line-change noselect">{sectionEntry.changes.at(0)?.change}</span> : null}
            </div>

            <div className={`settings-about-entry-content`}>
                {React.Children.toArray(
                    sectionEntry.changes.map((change, i) => (
                        <div className={`settings-entry-change-content ${i == 0 ? 'first-change' : null}`}>
                            <div className={`entry-change-tag-container`}>
                                {change.type === EChangeType.FIXED ? <span className="entry-tag entry-tag-fixed select">{EChangeType.FIXED}</span> : null}
                                {change.type === EChangeType.IMPROVED ? <span className="entry-tag entry-tag-improved select">{EChangeType.IMPROVED}</span> : null}
                                {change.type === EChangeType.ADDED ? <span className="entry-tag entry-tag-added select">{EChangeType.ADDED}</span> : null}
                                {change.type === EChangeType.REMOVED ? <span className="entry-tag entry-tag-removed select">{EChangeType.REMOVED}</span> : null}
                                {i <= sectionEntry.changes.length - 2 ? <div className="entry-tag-vertical-line"></div> : null}
                            </div>

                            <span className={`entry-change-text select`}>{parse(replaceIssueTag(change.change))}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

const SettingsSectionEntryPackage: React.FC<{
    sectionEntry: ISettingsSectionEntryPackage
}> = ({ sectionEntry }) => {
    const [entryOpen, setEntryOpen] = useState<boolean>(false);

    return (
        <div className={`settings-about-section-entry-package ${entryOpen ? 'entry-open' : null}`}>
            <div
                className={`settings-about-entry-inner`}
                onClick={() => setEntryOpen(!entryOpen)}
            >
                <img src={`src/assets/icons/chevron.down.svg`} alt="" className='settings-about-section-entry-chevron value-right noselect' />
                <span className="settings-about-section-entry-name-package noselect">{sectionEntry.name}</span>
                <span className="settings-about-section-entry-verison-package noselect">{`${sectionEntry.version}`}</span>
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
    SettingsSectionEntryChange,
    SettingsSectionEntryPackage
}