import React, { useState, useContext } from 'react';
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion"

import '../css/settings.css';
import { ESettingsStates } from '../../imports/typings';
import {ISettingsItems, ISettingsItemValueLanguage, ISettingsPages} from '../../imports/interfaces';
import { SettingsItemBoolean, SettingsItemSpacer, SettingsItemSelector, FormSettingsPage, FormSettingsPageLang, isPageActive, THEMES, SCALES } from '../../imports/utils';
import { SettingsItem, SettingsItemLanguage, SettingsItemSpacerElement } from "./SettingsItem";

import { SettingsContext } from "../../context/SettingsContext";

import { SettingsPage, SettingsPageButton } from './SettingsPage';
import { SettingsPageAbout } from './SettingsPageAbout';

const Settings: React.FC<{
    fRefreshBackground: () => void,
    fNavigatePage: (page: string) => void
}> = ({ fRefreshBackground, fNavigatePage }) => {
    const { t } = useTranslation('common');
    const { langs } = useContext(SettingsContext);
    const [isMounted, setIsMounted] = useState(true);
    const [settings, setSettings] = useState<ISettingsItems>([
        SettingsItemSpacer('settings.pages.language.title'),

        SettingsItemSelector('application', ESettingsStates.APP_LANGUAGE, 0, langs.map((lang) => lang.text), langs.map((lang) => lang.lang), true),

        SettingsItemSpacer('settings.pages.application.title'),

        SettingsItemSelector('application', ESettingsStates.APP_THEME, 0, THEMES),
        SettingsItemSelector('application', ESettingsStates.APP_SCALE, 0, SCALES, [], true),
        SettingsItemBoolean('application', ESettingsStates.OPEN_ON_STARTUP, false),
        SettingsItemBoolean('application', ESettingsStates.MINIMIZE_TO_TRAY, true),
        SettingsItemBoolean('application', ESettingsStates.HARDWARE_ACCELERATION, false),

        SettingsItemSpacer('settings.pages.accessability.title'),

        SettingsItemBoolean('application', ESettingsStates.ANIMATIONS, true),
        SettingsItemBoolean('application', ESettingsStates.USE_BACKGROUND, false, [
            SettingsItemBoolean('application', ESettingsStates.RANDOM_BACKGROUND, true, [], () => fRefreshBackground()),
            SettingsItemBoolean('application', ESettingsStates.LIVE_BACKGROUND, false)
        ]),
        SettingsItemBoolean('application', ESettingsStates.KEYBOARD_MODE, false),
        SettingsItemBoolean('application', ESettingsStates.NOTIFICATIONS, true),

        SettingsItemSpacer('settings.pages.content.title'),

        SettingsItemBoolean('content', ESettingsStates.AUTO_REFRESH, false),
        SettingsItemSelector('content', ESettingsStates.LIST_LAYOUT, 0, [
            "card", "list"
        ]),
        SettingsItemBoolean('content', ESettingsStates.SHOW_SUMMONER_IDS, true),
        SettingsItemBoolean('content', ESettingsStates.SHOW_RANDOM_SKINS, true),
        SettingsItemBoolean('content', ESettingsStates.SHOW_TEAM_LOGOS, false),
        SettingsItemBoolean('content', ESettingsStates.SHOW_UNAVAILABLE, true)
    ]);

    return (
        <div className={`settings-title-container`}>
            <div className='settings-topbar-container'>
                <span className='settings-title-text'>{`${t('settings.title')}`}</span>
            </div>
            <AnimatePresence>
                {isMounted && (
                    <motion.div
                        className='settings-outer'
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1.0 }}
                        exit={{ opacity: 0, scale: 1.0 }}
                        transition={{ type: "spring", damping: 15, stiffness: 250, duration: 0.05 }}
                    >
                        <SettingsInner
                            itemsProps={settings} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const SettingsInner: React.FC<{
    itemsProps: ISettingsItems
}> = ({ itemsProps }) => {
    const { t } = useTranslation('common');
    const [pageActive, setPageActive] = useState<number>(0);
    const FPageSwitch = (active: number) => { setPageActive(active); }

    return (
        <div className={`settings-inner`} >
            <div className='settings-content'>
                <div className='settings-page-container'>
                    {React.Children.toArray(
                        itemsProps.map((item, i) => {
                            if (item.itemValue.type === 'spacer') { return <SettingsItemSpacerElement itemProps={item} /> }

                            return <SettingsItem
                                itemProps={item}
                                itemZIndex={itemsProps.length - i}></SettingsItem>
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default Settings