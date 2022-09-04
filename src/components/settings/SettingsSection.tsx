import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { ISettingsSectionEntries, ISettingsSectionEntry, ISettingsSectionEntryChange, ISettingsSectionEntryPackage } from "../../interfaces";
import { SettingsSectionEntryPackage, SettingsSectionEntryCredit, SettingsSectionEntryChange } from "./SettingsEntry";
import '../css/settings.css';
import { getEntryIndexClass } from "../../utils";

const SettingsSection: React.FC<{
    sectionType: string,
    sectionTitle: string,
    sectionEntries: ISettingsSectionEntries,
    sectionOpenInit: boolean
}> = ({ sectionType, sectionTitle, sectionEntries, sectionOpenInit }) => {
    const [t] = useTranslation('common');
    const [sectionOpen, setSectionOpen] = useState<boolean>(sectionOpenInit);

    return (
        <div className={`settings-about-section ${!sectionOpen ? 'section-closed' : null}`}>
            <div className="settings-about-section-title">
                <span className="settings-about-section-title-text noselect">{`${sectionTitle}:`}</span>
                <span
                    className="settings-about-section-title-show-hide noselect"
                    onClick={() => setSectionOpen(!sectionOpen)}>
                    {`${t(`${sectionOpen ? 'tooltips.hide' : 'tooltips.show'}`)}`}
                </span>
            </div>

            <div className={`${(sectionType === 'package' || sectionType === 'change') ? 'settings-about-scroll-container' : 'settings-about-credit-container'}`}>
                {React.Children.toArray(
                    sectionEntries.map((entry, i) => (
                        <div>
                            {sectionType === 'credit' ?
                                <SettingsSectionEntryCredit
                                    sectionEntry={entry as ISettingsSectionEntry} />
                                : null}
                            {sectionType === 'change' ?
                                <SettingsSectionEntryChange
                                    indexClass={getEntryIndexClass(i, sectionEntries.length)}
                                    sectionEntry={entry as ISettingsSectionEntryChange} />
                                : null}
                            {sectionType === 'package' ?
                                <SettingsSectionEntryPackage
                                    indexClass={getEntryIndexClass(i, sectionEntries.length)}
                                    sectionEntry={entry as ISettingsSectionEntryPackage} />
                                : null}
                            {i < sectionEntries.length - 1 ? <div className="spacer-divider-entry margin-left-18"></div> : null}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export {
    SettingsSection
}