import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { ISettingsAboutSectionEntries, ISettingsAboutSectionEntryPackage } from "../../interfaces";
import { SettingsSectionEntryPackage, SettingsSectionEntryCredit } from "./SettingsEntry";
import '../css/settings.css';

const SettingsSection: React.FC<{
    sectionType: string,
    sectionTitle: string,
    sectionEntries: ISettingsAboutSectionEntries,
    sectionOpenInit: boolean
}> = ({ sectionType, sectionTitle, sectionEntries, sectionOpenInit }) => {
    const [t] = useTranslation('common');
    const [sectionOpen, setSectionOpen] = useState<boolean>(sectionOpenInit);

    return (
        <div className={`settings-about-section ${sectionOpen ? 'section-open' : null}`}>
            <div className="settings-about-section-title">
                <span className="settings-about-section-title-text noselect">{`${sectionTitle}:`}</span>
                <span
                    className="settings-about-section-title-show-hide noselect"
                    onClick={() => setSectionOpen(!sectionOpen)}>
                    {`${t(`${sectionOpen ? 'tooltips.hide' : 'tooltips.show'}`)}`}
                </span>
            </div>

            {sectionOpen
                ?
                <div className={`${sectionType === 'dep' ? 'settings-about-dep-container' : 'settings-about-credit-container'}`}>
                    {React.Children.toArray(
                        sectionEntries.map((entry, i) => (
                            <div>
                                {sectionType === 'credit' ?
                                    <SettingsSectionEntryCredit sectionEntry={entry} />
                                    : null}
                                {sectionType === 'dep' ?
                                    <SettingsSectionEntryPackage sectionEntry={entry as ISettingsAboutSectionEntryPackage} />
                                    : null}
                                {i < sectionEntries.length - 1 ? <div className="spacer-divider-entry"></div> : null}
                            </div>
                        ))
                    )}
                </div>
                : null
            }
        </div>
    )
}

export {
    SettingsSection
}