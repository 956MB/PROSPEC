import React, { useState, useContext } from 'react';
import { useTranslation } from "react-i18next";
import '../css/settings.css';

import { EEMessages, ETooltip, ESettingsStates } from '../../typings';
import { ISettingsItemValueBool, ISettingsItemValueLanguage, ISettingsItemValueSelector, ISettingsPages, ISettingsPageLanguage, IAppBackground, useInit } from '../../interfaces';
import { sTitle, sItemTitle, sItemDescription } from '../../utils';

import closeIcon from '../../assets/icons/close.svg';

import SettingsSidebar from './SettingsSidebar';
import { SettingsPage, SettingsPageButton } from './SettingsPage';

const Settings: React.FC<{
    appBackground: IAppBackground,
    settingsOpen: boolean,
    FSettingsOpen: (set: boolean) => void
}> = ({ appBackground, settingsOpen, FSettingsOpen }) => {

    const [settings, setSettings] = useState<ISettingsPages>([
        {
            index: 0, type: 'list', title: sTitle('content'), items: [
                {
                    title: sItemTitle('content', 'listLayout'), itemValue: {
                        type: 'selector', value: 0, options: [
                            { text: sItemTitle('content', 'card') }, { index: 1, text: sItemTitle('content', 'list') }
                        ]
                    } as ISettingsItemValueSelector
                }
                ,
                {
                    title: sItemTitle('content', 'autoRefresh'), itemValue: { type: 'boolean', value: false, key: ESettingsStates.AUTO_REFRESH } as ISettingsItemValueBool, childValues: [
                        // { title: sItemTitle('content', 'refreshInterval'), description: sItemDescription('content', 'refreshInterval'), itemValue: { type: 'boolean', value: false } as ISettingsItemValueBool}
                    ]
                }
                ,
                { itemValue: { type: "spacer", value: false } }
                ,
                { title: sItemTitle('content', 'showSummonerIds'), description: sItemDescription('content', 'showSummonerIds'), itemValue: { type: 'boolean', value: true, key: ESettingsStates.SHOW_SUMMONER_IDS } as ISettingsItemValueBool }
                ,
                {
                    title: sItemTitle('content', 'showRandomSkins'), description: sItemDescription('content', 'showRandomSkins'), itemValue: { type: 'boolean', value: true, key: ESettingsStates.SHOW_RANDOM_SKINS } as ISettingsItemValueBool, childValues: [
                        { title: sItemTitle('content', 'useCutouts'), description: sItemDescription('content', 'useCutouts'), itemValue: { type: 'boolean', value: false, key: ESettingsStates.USE_CUTOUTS } as ISettingsItemValueBool }
                    ]
                }
                ,
                { title: sItemTitle('content', 'showTeamLogos'), description: sItemDescription('content', 'showTeamLogos'), itemValue: { type: 'boolean', value: false, key: ESettingsStates.SHOW_TEAM_LOGOS } as ISettingsItemValueBool }
            ]
        }
        ,
        {
            index: 1, type: 'list', title: sTitle('application'), items: [
                {
                    title: sItemTitle('application', 'theme'), itemValue: {
                        type: 'selector', value: 0, options: [
                            { index: 0, text: sItemTitle('application', 'dark') }, { index: 1, text: sItemTitle('application', 'light') }, { index: 2, text: sItemTitle('application', 'system') }
                        ]
                    } as ISettingsItemValueSelector
                }
                ,
                {
                    title: sItemTitle('application', 'appScale'), itemValue: {
                        type: 'selector', value: 0, options: [
                            { index: 0, text: '100%' }, { index: 1, text: '90%' }, { index: 2, text: '75%' }, { index: 2, text: '50%' }
                        ]
                    } as ISettingsItemValueSelector
                }
                ,
                { title: sItemTitle('application', 'openOnStartup'), itemValue: { type: 'boolean', value: false, key: ESettingsStates.OPEN_ON_STARTUP } as ISettingsItemValueBool }
                ,
                { title: sItemTitle('application', 'minimizeToTray'), description: sItemDescription('application', 'minimizeToTray'), itemValue: { type: 'boolean', value: true, key: ESettingsStates.MINIMIZE_TO_TRAY } as ISettingsItemValueBool }
                ,
                { title: sItemTitle('application', 'hardwareAcceleration'), description: sItemDescription('application', 'hardwareAcceleration'), itemValue: { type: 'boolean', value: false, key: ESettingsStates.HARDWARE_ACCELERATION } as ISettingsItemValueBool }
                ,
                { itemValue: { type: "spacer", value: false } }
                ,
                { title: sItemTitle('application', 'randomAppBackground'), description: sItemDescription('application', 'randomAppBackground'), itemValue: { type: 'boolean', value: true, key: ESettingsStates.RANDOM_APP_BACKGROUND } as ISettingsItemValueBool }
                ,
                { title: sItemTitle('application', 'keyboardMode'), description: sItemDescription('application', 'keyboardMode'), itemValue: { type: 'boolean', value: false, key: ESettingsStates.KEYBOARD_MODE } as ISettingsItemValueBool }
                ,
                { title: sItemTitle('application', 'favortieNotifications'), description: sItemDescription('application', 'favortieNotifications'), itemValue: { type: 'boolean', value: true, key: ESettingsStates.NOTIFICATIONS } as ISettingsItemValueBool }
            ]
        }
        ,
        {
            index: 2, type: 'lang', title: sTitle('language'), selected: 0, items: [
                { itemValue: { type: 'lang', value: 0, text: 'English', lang: 'en_EN' } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 1, text: 'Deutsch', lang: 'de_DE' } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 2, text: 'Français', lang: 'fr_FR' } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 3, text: 'Italiano', lang: 'it_IT' } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 4, text: 'Nederlands', lang: 'nl_NL' } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 5, text: 'Svenska', lang: 'sv_SV' } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 6, text: 'Suomi', lang: 'fi_FI' } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 7, text: 'Português', lang: 'pt_PT' } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 8, text: 'Polski', lang: 'pl_PL' } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 9, text: 'Русский', lang: 'ru_RU' } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 10, text: 'Türkçe', lang: 'tr_TR' } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 11, text: 'Čeština', lang: 'cs_CS' } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 12, text: 'Ελληνικά', lang: 'el_EL' } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 13, text: '한국어', lang: 'kr_KR' } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 14, text: '日本語', lang: 'ja_JP' } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 15, text: 'Tiếng Việt', lang: 'vi_VI' } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 16, text: '简体中文', lang: 'zh_CN' } as ISettingsItemValueLanguage },
                { itemValue: { type: 'lang', value: 17, text: '繁體中文', lang: 'zh_TW' } as ISettingsItemValueLanguage }
            ]
        } as ISettingsPageLanguage
        ,
        { index: 3, type: 'list', title: sTitle('about'), items: [] }
    ]
    )

    return (
        <div className={`settings-outer ${settingsOpen ? 'settings-open' : null}`}>
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
    const [pageActive, setPageActive] = useState(0);

    const isActive = (page: number): boolean => {
        return pageActive == page;
    }
    const FPageSwitch = (active: number) => {
        setPageActive(active);
    }

    return (
        <div className={`settings-inner`} >
            <div className='settings-content'>
                <div className='settings-close-container'>
                    <span className='settings-title-text'>{t('settings.title')}</span>
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

                {React.Children.toArray(
                    pagesProps.map((page, i) => (
                        <SettingsPage key={page.index} pageProps={page} pageActive={isActive(i)} />
                    ))
                )}
            </div>
            <div className="settings-dark-overlay"></div>
            <div className={`${(settingsBackground.type === 'splash') ? 'settings-background-center' : 'settings-background-left'}`} style={{ backgroundImage: `url(src/${settingsBackground.secondary})` }}></div>
        </div>
    )
}

export default Settings