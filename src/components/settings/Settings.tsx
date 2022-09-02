import React, { useState, useContext } from 'react';
import { useTranslation } from "react-i18next";
import '../css/settings.css';

import { EEMessages, ETooltip, ESettingsStates, ELanguages } from '../../typings';
import { ISettingsItemValueBool, ISettingsItemValueLanguage, ISettingsItemValueSelector, ISettingsPages, ISettingsPageLanguage, IAppBackground, useInit } from '../../interfaces';
import { sTitle, sItemTitle, sItemDescription } from '../../utils';

import closeIcon from '../../assets/icons/close.svg';

import SettingsSidebar from './SettingsSidebar';
import { SettingsPage, SettingsPageButton } from './SettingsPage';
import { useDetectClickOutside } from 'react-detect-click-outside';

const Settings: React.FC<{
    appBackground: IAppBackground,
    settingsOpen: boolean,
    FSettingsOpen: (set: boolean) => void
}> = ({ appBackground, settingsOpen, FSettingsOpen }) => {
    const toggleSettingsOpen = (e: any) => {
        e.stopPropagation();
        if (settingsOpen) { FSettingsOpen(false) }
    }
    const settingsRef = useDetectClickOutside({ onTriggered: toggleSettingsOpen });

    const [settings, setSettings] = useState<ISettingsPages>([
        {
            index: 0, type: 'list', title: sTitle('content'), items: [
                {
                    title: sItemTitle('content', ESettingsStates.LIST_LAYOUT), itemValue: {
                        type: 'selector', key: ESettingsStates.LIST_LAYOUT, value: 0, options: [
                            { index: 0, text: sItemTitle('content', 'card') },
                            { index: 1, text: sItemTitle('content', 'list') }
                        ]
                    } as ISettingsItemValueSelector
                }
                ,
                {
                    title: sItemTitle('content', ESettingsStates.AUTO_REFRESH), itemValue: { type: 'boolean', value: false, key: ESettingsStates.AUTO_REFRESH } as ISettingsItemValueBool, childValues: [
                        // { title: sItemTitle('content', 'refreshInterval'), description: sItemDescription('content', 'refreshInterval'), itemValue: { type: 'boolean', value: false } as ISettingsItemValueBool}
                    ]
                }
                ,
                { itemValue: { type: "spacer", value: false } }
                ,
                { title: sItemTitle('content', ESettingsStates.SHOW_SUMMONER_IDS), description: sItemDescription('content', ESettingsStates.SHOW_SUMMONER_IDS), itemValue: { type: 'boolean', value: true, key: ESettingsStates.SHOW_SUMMONER_IDS } as ISettingsItemValueBool }
                ,
                {
                    title: sItemTitle('content', ESettingsStates.SHOW_RANDOM_SKINS), description: sItemDescription('content', ESettingsStates.SHOW_RANDOM_SKINS), itemValue: { type: 'boolean', value: true, key: ESettingsStates.SHOW_RANDOM_SKINS } as ISettingsItemValueBool, childValues: [
                        { title: sItemTitle('content', ESettingsStates.USE_CUTOUTS), description: sItemDescription('content', ESettingsStates.USE_CUTOUTS), itemValue: { type: 'boolean', value: false, key: ESettingsStates.USE_CUTOUTS } as ISettingsItemValueBool }
                    ]
                }
                ,
                { title: sItemTitle('content', ESettingsStates.SHOW_TEAM_LOGOS), description: sItemDescription('content', ESettingsStates.SHOW_TEAM_LOGOS), itemValue: { type: 'boolean', value: false, key: ESettingsStates.SHOW_TEAM_LOGOS } as ISettingsItemValueBool }
                ,
                { title: sItemTitle('content', ESettingsStates.SHOW_UNAVAILABLE), description: sItemDescription('content', ESettingsStates.SHOW_UNAVAILABLE), itemValue: { type: 'boolean', value: true, key: ESettingsStates.SHOW_UNAVAILABLE } as ISettingsItemValueBool }
            ]
        }
        ,
        {
            index: 1, type: 'list', title: sTitle('application'), items: [
                {
                    title: sItemTitle('application', ESettingsStates.APP_THEME), itemValue: {
                        type: 'selector', key: ESettingsStates.APP_THEME, value: 0, options: [
                            { index: 0, text: sItemTitle('application', 'dark') }, { index: 1, text: sItemTitle('application', 'light') }, { index: 2, text: sItemTitle('application', 'system') }
                        ]
                    } as ISettingsItemValueSelector
                }
                ,
                {
                    title: sItemTitle('application', ESettingsStates.APP_SCALE), itemValue: {
                        type: 'selector', key: ESettingsStates.APP_SCALE, value: 0, options: [
                            { index: 0, text: '100%' }, { index: 1, text: '90%' }, { index: 2, text: '75%' }, { index: 2, text: '50%' }
                        ]
                    } as ISettingsItemValueSelector
                }
                ,
                { title: sItemTitle('application', ESettingsStates.OPEN_ON_STARTUP), itemValue: { type: 'boolean', value: false, key: ESettingsStates.OPEN_ON_STARTUP } as ISettingsItemValueBool }
                ,
                { title: sItemTitle('application', ESettingsStates.MINIMIZE_TO_TRAY), description: sItemDescription('application', ESettingsStates.MINIMIZE_TO_TRAY), itemValue: { type: 'boolean', value: true, key: ESettingsStates.MINIMIZE_TO_TRAY } as ISettingsItemValueBool }
                ,
                { title: sItemTitle('application', ESettingsStates.HARDWARE_ACCELERATION), description: sItemDescription('application', ESettingsStates.HARDWARE_ACCELERATION), itemValue: { type: 'boolean', value: false, key: ESettingsStates.HARDWARE_ACCELERATION } as ISettingsItemValueBool }
                ,
                { itemValue: { type: "spacer", value: false } }
                ,
                {
                    title: sItemTitle('application', ESettingsStates.USE_BACKGROUND), description: sItemDescription('application', ESettingsStates.USE_BACKGROUND), itemValue: { type: 'boolean', value: false, key: ESettingsStates.USE_BACKGROUND } as ISettingsItemValueBool, childValues: [
                        { title: sItemTitle('application', ESettingsStates.RANDOM_BACKGROUND), description: sItemDescription('application', ESettingsStates.RANDOM_BACKGROUND), itemValue: { type: 'boolean', value: true, key: ESettingsStates.RANDOM_BACKGROUND } as ISettingsItemValueBool },
                        { title: sItemTitle('application', ESettingsStates.LIVE_BACKGROUND), description: sItemDescription('application', ESettingsStates.LIVE_BACKGROUND), itemValue: { type: 'boolean', value: false, key: ESettingsStates.LIVE_BACKGROUND } as ISettingsItemValueBool }
                    ]
                }
                ,
                { title: sItemTitle('application', ESettingsStates.KEYBOARD_MODE), description: sItemDescription('application', ESettingsStates.KEYBOARD_MODE), itemValue: { type: 'boolean', value: false, key: ESettingsStates.KEYBOARD_MODE } as ISettingsItemValueBool }
                ,
                { title: sItemTitle('application', ESettingsStates.NOTIFICATIONS), description: sItemDescription('application', ESettingsStates.NOTIFICATIONS), itemValue: { type: 'boolean', value: true, key: ESettingsStates.NOTIFICATIONS } as ISettingsItemValueBool }
            ]
        }
        ,
        {
            index: 2, type: 'lang', title: sTitle('language'), selected: 0, items: [
                { itemValue: { type: 'lang', value: 0, text: 'English', lang: ELanguages.en_EN } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 1, text: 'العربية', lang: ELanguages.ar_AE } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 2, text: 'Deutsch', lang: ELanguages.de_DE } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 3, text: 'עִברִית', lang: ELanguages.he_HE } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 4, text: 'Français', lang: ELanguages.fr_FR } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 5, text: 'Italiano', lang: ELanguages.it_IT } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 6, text: 'Nederlands', lang: ELanguages.nl_NL } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 7, text: 'Svenska', lang: ELanguages.sv_SV } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 8, text: 'Suomi', lang: ELanguages.fi_FI } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 9, text: 'हिन्दी', lang: ELanguages.hi_HI } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 10, text: 'Português', lang: ELanguages.pt_PT } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 11, text: 'Polski', lang: ELanguages.pl_PL } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 12, text: 'Русский', lang: ELanguages.ru_RU } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 13, text: 'Türkçe', lang: ELanguages.tr_TR } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 14, text: 'Čeština', lang: ELanguages.cs_CS } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 15, text: 'Ελληνικά', lang: ELanguages.el_EL } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 16, text: '한국어', lang: ELanguages.kr_KR } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 17, text: '日本語', lang: ELanguages.ja_JP } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 18, text: 'Tiếng Việt', lang: ELanguages.vi_VI } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 19, text: '简体中文', lang: ELanguages.zh_CN } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 20, text: '繁體中文', lang: ELanguages.zh_TW } as ISettingsItemValueLanguage }
            ]
        } as ISettingsPageLanguage
        ,
        { index: 3, type: 'list', title: sTitle('about'), items: [] }
    ]
    )

    return (
        <div
            className={`settings-outer ${settingsOpen ? 'settings-open' : null}`}
            ref={settingsRef}
        >
            <SettingsInner pagesProps={settings} settingsOpen={settingsOpen} settingsBackground={appBackground} FSettingsOpen={FSettingsOpen} />

            <SettingsSidebar settingsOpen={settingsOpen} FSettingsOpen={FSettingsOpen} />
        </div>
    )
}

// TODO: need to make SettingsInner `display: none` or remove element AFTER settings slides all the way back to 55px.
const SettingsInner: React.FC<{
    pagesProps: ISettingsPages,
    settingsOpen: boolean,
    settingsBackground: IAppBackground,
    FSettingsOpen: (set: boolean) => void
}> = ({ pagesProps, settingsOpen, settingsBackground, FSettingsOpen }) => {
    const { t } = useTranslation('common');
    const [pageActive, setPageActive] = useState<number>(0);

    const isActive = (page: number): boolean => {
        return pageActive == page;
    }
    const FPageSwitch = (active: number) => {
        setPageActive(active);
    }

    return (
        <div className={`settings-inner`} >
            <div className='settings-content'>
                <div data-tauri-drag-region className='settings-close-container'>
                    <span className='settings-title-text'>{`${t('settings.title')}`}</span>
                    <div className={`titlebar-button titlebar-button-edge-both close-button ${ETooltip.TOOLTIP}`} onClick={() => FSettingsOpen(false)}>
                        <img src={closeIcon} alt="close" />
                        <span className={`${ETooltip.LEFT}`}>{EEMessages.ESC}</span>
                    </div>
                </div>
                <div className='settings-buttons-container'>
                    <div className='settings-page-button-container'>
                        {React.Children.toArray(
                            pagesProps.map((page, i) => (
                                <SettingsPageButton key={page.index} pageActive={isActive(page.index)} buttonProps={{ index: page.index, text: page.title }} FPageSwitch={FPageSwitch} />
                            ))
                        )}
                    </div>
                </div>

                <div className='settings-page-container'>
                    {React.Children.toArray(
                        pagesProps.map((page, i) => (
                            <SettingsPage key={page.index} pageProps={page} pageActive={isActive(i)} />
                        ))
                    )}
                </div>
            </div>
            <div className="settings-dark-overlay"></div>
            <div
                className={`${(settingsBackground.secondary.type === 'centered') ? 'settings-background-center' : 'settings-background-left'}`}
                style={{
                    backgroundImage:
                        `url(src/assets/dragontail/${settingsBackground.secondary.type}/${settingsBackground.secondary.name}.jpg)`
                }}>
            </div>
        </div>
    )
}

export default Settings