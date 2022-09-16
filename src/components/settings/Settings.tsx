import React, { useState, useContext } from 'react';
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion"

import '../css/settings.css';
import { ESettingsStates, ELanguages } from '../../imports/typings';
import { ISettingsItemValueBool, ISettingsItemValueLanguage, ISettingsItemValueSelector, ISettingsPages, ISettingsPageLanguage, IAppBackground, ISettingsItems } from '../../imports/interfaces';
import { sTitle, sItemTitle, sItemDescription, mapEnum, getLanguageStatic, SettingsItemBoolean, SettingsItemSpacer, SettingsItemSelector, ItemValueSelection, FormSettingsPage, FormSettingsPageLang, SettingsItemLanguage } from '../../imports/utils';

import { SettingsContext } from "../../context/SettingsContext";

import { SettingsPage, SettingsPageButton } from './SettingsPage';
import { SettingsPageAbout } from './SettingsPageAbout';
import { useDelayUnmount, useInit } from '../../imports/initializers';

const Settings: React.FC<{
    fSettingsOpen: (set: boolean) => void
}> = ({ fSettingsOpen }) => {
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
        FormSettingsPageLang(2, "lang", 'language', 0,
            mapEnum(ELanguages, "string", (lang: ELanguages, i: number) => {
                return {
                    itemValue: { type: 'lang', value: i, text: getLanguageStatic(i), lang: lang as string } as ISettingsItemValueLanguage
                }
            }) as ISettingsItems
        ) as ISettingsPageLanguage
        ,
        FormSettingsPage(3, "about", 'about', [])
    ]
    )

    return (
        <AnimatePresence>
            {isMounted && (
                <motion.div
                    className='settings-outer'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
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