import React, { useState, useContext } from 'react';
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion"

import '../css/settings.css';
import { ESettingsStates, ELanguages } from '../../imports/typings';
import { ISettingsItemValueLanguage, ISettingsPages, ISettingsPageLanguage, ISettingsItems } from '../../imports/interfaces';
import {  mapEnum, getLanguageStatic, SettingsItemBoolean, SettingsItemSpacer, SettingsItemSelector, FormSettingsPage, FormSettingsPageLang } from '../../imports/utils';

import { SettingsContext } from "../../context/SettingsContext";

import { SettingsPage, SettingsPageButton } from './SettingsPage';
import { SettingsPageAbout } from './SettingsPageAbout';
import { getFixedT } from 'i18next';
import { useInit } from '../../imports/initializers';

const Settings: React.FC<{
    fSettingsOpen: (set: boolean) => void
}> = ({ fSettingsOpen }) => {
    const { t, i18n } = useTranslation('common');
    const { langs } = useContext(SettingsContext);
    const [isMounted, setIsMounted] = useState(true);
    const [settings, setSettings] = useState<ISettingsPages>([
        FormSettingsPage(0, "list", 'content', [
            SettingsItemSelector('content', ESettingsStates.LIST_LAYOUT, 0, [
                "card", "list"
            ])
            ,
            SettingsItemBoolean('content', ESettingsStates.AUTO_REFRESH, false)
            ,
            SettingsItemSpacer()
            ,
            SettingsItemBoolean('content', ESettingsStates.SHOW_SUMMONER_IDS, true)
            ,
            SettingsItemBoolean('content', ESettingsStates.SHOW_RANDOM_SKINS, true, [
                SettingsItemBoolean('content', ESettingsStates.USE_CUTOUTS, false)
            ])
            ,
            SettingsItemBoolean('content', ESettingsStates.SHOW_TEAM_LOGOS, false)
            ,
            SettingsItemBoolean('content', ESettingsStates.SHOW_UNAVAILABLE, true)
        ])
        ,
        FormSettingsPage(1, "list", 'application', [
            SettingsItemSelector('application', ESettingsStates.APP_THEME, 0, [
                "dark", "light", "system"
            ])
            ,
            SettingsItemSelector('application', ESettingsStates.APP_SCALE, 0, [
                "100%", "90%", "75%", "50%"
            ], true)
            ,
            SettingsItemBoolean('application', ESettingsStates.OPEN_ON_STARTUP, false)
            ,
            SettingsItemBoolean('application', ESettingsStates.MINIMIZE_TO_TRAY, true)
            ,
            SettingsItemBoolean('application', ESettingsStates.HARDWARE_ACCELERATION, false)
            ,
            SettingsItemBoolean('application', ESettingsStates.ANIMATIONS, true)
            ,
            SettingsItemSpacer()
            ,
            SettingsItemBoolean('application', ESettingsStates.USE_BACKGROUND, false, [
                SettingsItemBoolean('application', ESettingsStates.RANDOM_BACKGROUND, true),
                SettingsItemBoolean('application', ESettingsStates.LIVE_BACKGROUND, false)
            ])
            ,
            SettingsItemBoolean('application', ESettingsStates.KEYBOARD_MODE, false)
            ,
            SettingsItemBoolean('application', ESettingsStates.NOTIFICATIONS, true)
        ])
        ,
        FormSettingsPage(2, "list", 'shortcuts')
        ,
        FormSettingsPageLang(3, "lang", 'language', 0,
            langs.map((lang, i) => {
                return {
                    itemValue: { type: 'lang', value: i, text: lang.text, lang: lang.lang } as ISettingsItemValueLanguage
                }
            })
        )
        ,
        FormSettingsPage(4, "about", 'about')
    ]);

    return (
        <AnimatePresence>
            {isMounted && (
                <motion.div
                    className='settings-outer'
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1.0 }}
                    exit={{ opacity: 0, scale: 1.0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 250, duration: 0.05 }}
                >
                    <SettingsInner pagesProps={settings} fSettingsOpen={fSettingsOpen} />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const SettingsInner: React.FC<{
    pagesProps: ISettingsPages,
    fSettingsOpen: (set: boolean) => void
}> = ({ pagesProps, fSettingsOpen }) => {
    const { t } = useTranslation('common');
    const [pageActive, setPageActive] = useState<number>(0);
    const { useBackground } = useContext(SettingsContext);

    const isActive = (page: number): boolean => {
        return pageActive == page;
    }
    const FPageSwitch = (active: number) => {
        setPageActive(active);
    }

    return (
        <div className={`settings-inner`} >
            <div className='settings-content'>
                <div data-tauri-drag-region className='settings-topbar-container'>
                    <div className='settings-topbar-left'>
                        <span className='settings-title-text'>{`${t('settings.title')}`}</span>
                    </div>
                    <div className='settings-page-button-container'>
                        {React.Children.toArray(
                            pagesProps.map((page, i) => (
                                <SettingsPageButton key={page.index} pageActive={isActive(page.index)} buttonProps={{ index: page.index, text: page.title }} FPageSwitch={FPageSwitch} />
                                ))
                                )}
                    </div>
                    <div className='settings-topbar-right'></div>
                </div>

                <div className='settings-page-container'>
                    {React.Children.toArray(
                        pagesProps.map((page, i) => (
                            page.type === 'about'
                                ?
                                <SettingsPageAbout pageActive={isActive(i)} />
                                :
                                <SettingsPage key={page.index} pageProps={page} pageActive={isActive(i)} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Settings