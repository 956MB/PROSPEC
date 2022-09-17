import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { ISettingsSectionEntries, ISettingsSectionEntry, ISettingsSectionEntryChange, ISettingsSectionEntryPackage } from "../../imports/interfaces";
import { SettingsSectionEntryPackage, SettingsSectionEntryCredit, SettingsSectionEntryChange } from "./SettingsEntry";
import '../css/settings.css';
import { firstLastClass, getEntryIndexClass } from "../../imports/utils";

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
                    className="settings-about-section-title-show-hide noselect transition-0_08s"
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
                                    positionClass={firstLastClass(i, sectionEntries.length, "first-entry", "last-entry")}
                                    sectionEntry={entry as ISettingsSectionEntry} />
                                : null}
                            {sectionType === 'change' ?
                                <SettingsSectionEntryChange
                                    positionClass={getEntryIndexClass(i, sectionEntries.length)}
                                    sectionEntry={entry as ISettingsSectionEntryChange} />
                                : null}
                            {sectionType === 'package' ?
                                <SettingsSectionEntryPackage
                                    positionClass={getEntryIndexClass(i, sectionEntries.length)}
                                    sectionEntry={entry as ISettingsSectionEntryPackage} />
                                : null}
                            {i < sectionEntries.length - 1 ? <div className={`spacer-divider-entry ${sectionType === 'change' || sectionType === 'package' ? 'margin-lr-18' : null}`}></div> : null}
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