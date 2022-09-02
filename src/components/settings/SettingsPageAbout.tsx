import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { pAbout } from "../../utils";
import { ISettingsAboutSectionEntries, ISettingsAboutSectionEntry, ISettingsAboutSectionEntryDep, ISettingsAboutSectionEntryDeps } from "../../interfaces";
import { ETooltip } from "../../typings";
import '../css/settings.css';

import * as licenses from '../../imports/licenses'

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
    const [deps, setDeps] = useState<ISettingsAboutSectionEntryDeps>([
        // TODO: Do this dynamically...
        { name: "@tauri-apps/api", version: "@1.0.2", link: "https://github.com/tauri-apps/tauri", license: licenses.tauriLicense },
        { name: "@tauri-apps/cli", version: "@1.0.5", link: "https://github.com/tauri-apps/tauri", license: licenses.tauriLicense },
        { name: "tauri-plugin-store-api", version: "@0.1.0", link: "https://github.com/tauri-apps/tauri-plugin-store", license: licenses.tauriLicense },
        { name: "@types/node", version: "@18.7.14", link: "https://github.com/DefinitelyTyped/DefinitelyTyped", license: licenses.typesNodeLicense },
        { name: "@types/react", version: "@18.0.18", link: "https://github.com/DefinitelyTyped/DefinitelyTyped", license: licenses.typesNodeLicense },
        { name: "@types/react-dom", version: "@18.0.6", link: "https://github.com/DefinitelyTyped/DefinitelyTyped", license: licenses.typesNodeLicense },
        { name: "@vitejs/plugin-react", version: "@1.3.2", link: "https://github.com/jsx-eslint/eslint-plugin-react", license: licenses.pluginReactLicense },
        { name: "prop-types", version: "@15.8.1", link: "https://github.com/facebook/prop-types", license: licenses.reactLicense },
        { name: "react", version: "@18.2.0", link: "https://github.com/facebook/react", license: licenses.reactLicense },
        { name: "react-dom", version: "@18.2.0", link: "https://github.com/facebook/react", license: licenses.reactLicense },
        { name: "react-router-dom", version: "@6.3.0", link: "https://github.com/facebook/react", license: licenses.reactLicense },
        { name: "react-i18next", version: "@11.18.5", link: "https://github.com/i18next/react-i18next", license: licenses.reacti18nextLicense },
        { name: "react-detect-click-outside", version: "@1.1.7", link: "https://github.com/zhaluza/react-detect-click-outside", license: "" },
        { name: "react-hotkeys-hook", version: "@3.4.7", link: "https://github.com/JohannesKlauss/react-hotkeys-hook", license: licenses.reactHotkeysHookLicense },
        { name: "semantic-ui-react", version: "@2.1.3", link: "https://github.com/Semantic-Org/Semantic-UI-React", license: licenses.semanticUiReactLicense },
        { name: "typescript", version: "@4.8.2", link: "https://github.com/Microsoft/TypeScript", license: licenses.typescriptLicense },
        { name: "vite", version: "@2.9.15", link: "https://github.com/vitejs/vite", license: licenses.viteLicense },
        { name: "i18next", version: "@21.9.1", link: "https://github.com/i18next/i18next", license: licenses.i18nextLicense },
        { name: "ini", version: "@3.0.1", link: "https://github.com/npm/ini", license: licenses.iniLicense },
        { name: "random", version: "@3.0.6", link: "https://github.com/transitive-bullshit/random", license: "" },
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
                <span className={`${ETooltip.RIGHT} right-close noselect`}>{t(`tooltips.copy`)}</span>
            </div>

            <div className={`settings-about-description`}>
                <span className="noselect">{t(pAbout(`description`))}</span>
            </div>

            <div className={`settings-about-section`}>
                <div className="settings-about-section-title">
                    <span className="noselect">{`${t(pAbout(`thanks.title`))}:`}</span>
                </div>

                <div className="settings-about-section-credit-container">
                    {React.Children.toArray(
                        credits.map((credit, i) => (
                            <div>
                                <div className="settings-about-section-entry">
                                    <span className="settings-about-section-entry-name select">{credit.name}</span>
                                    <span className="settings-about-section-entry-reason noselect">{`${t(pAbout(`thanks.${credit.name}`))}`}</span>
                                    {/* <span className="settings-about-section-entry-link select">{`${credit.link}`}</span> */}
                                    <a href={credit.link} target="_blank" rel="noopener noreferrer" className={`settings-about-section-entry-link select`}>{credit.link}</a>
                                </div>
                                {i < credits.length - 1 ? <div className="spacer-divider-entry"></div> : null}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className={`settings-about-section`}>
                <div className="settings-about-section-title">
                    <span className="noselect">{`${t(pAbout(`dep`))}:`}</span>
                </div>

                <div className={`settings-about-dep-container`}>
                    {React.Children.toArray(
                        deps.map((dep, i) => (
                            <div>
                                <SettingsSectionEntryCollapse sectionEntry={dep} />
                                {i < deps.length - 1 ? <div className="spacer-divider-entry"></div> : null}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

const SettingsSectionEntryCollapse: React.FC<{
    sectionEntry: ISettingsAboutSectionEntryDep
}> = ({ sectionEntry }) => {
    const [entryOpen, setEntryOpen] = useState<boolean>(false);

    return (
        <div className={`settings-about-section-entry-dep ${entryOpen ? 'entry-open' : null}`}>
            <div
                className={`settings-about-entry-inner`}
                onClick={() => setEntryOpen(!entryOpen)}
            >
                <img src={`src/assets/icons/chevron.down.svg`} alt="" className='value-right' />
                <span className="settings-about-section-entry-name-dep select">{sectionEntry.name}</span>
                {/* <div className="dots-divider"></div> */}
                <span className="settings-about-section-entry-link-dep select">{`${sectionEntry.version}`}</span>
            </div>

            <div className={`settings-about-entry-content`}>
                <div className="settings-about-entry-content-name select">{sectionEntry.name}</div>
                {sectionEntry.link ? <div className="settings-about-entry-content-link select">{sectionEntry.link}</div> : null}
                {sectionEntry.license && sectionEntry.license != "" ? <div className="settings-about-entry-content-license select">{sectionEntry.license}</div> : null}
            </div>
        </div>
    )
}

export {
    SettingsPageAbout
}