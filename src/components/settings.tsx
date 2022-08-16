import React, { useState, useContext } from 'react';
import { useTranslation } from "react-i18next";
import { useDetectClickOutside } from 'react-detect-click-outside';
import './css/settings.css';

import { EEMessages, ETooltip } from '../typings';
import { ISettingsItem, ISettingsItemValueBool, ISettingsItemValueLanguage, ISettingsItemValueSelector, ISettingsPage, ISettingsPageButton, ISettingsPages, ISettingsPageLanguage, IAppBackground, useInit } from '../interfaces';
import { sTitle, sItemTitle, sItemDescription, unull } from '../utils';

import closeIcon from '../assets/icons/close.svg';
import gearIcon from '../assets/icons/gear.svg';
import discordIcon from '../assets/icons/discord.svg';
import { t } from 'i18next';

import { SettingsContext } from '../context/SettingsContext';

const Settings: React.FC<{
    appBackground: IAppBackground,
    settingsOpen: boolean,
    FSettingsOpen: (set: boolean) => void
}> = ({ appBackground, settingsOpen, FSettingsOpen }) => {

    const [settings, setSettings] = useState<ISettingsPages>([
        {
            index: 0, type: 'list', title: sTitle('content'), items: [
                { title: sItemTitle('content', 'listLayout'), itemValue: {
                    type: 'selector', value: 0, options: [
                        { text: sItemTitle('content', 'card') }, { index: 1, text: sItemTitle('content', 'list') }
                    ]
                } as ISettingsItemValueSelector}
                ,
                { title: sItemTitle('content', 'autoRefresh'), itemValue: { type: 'boolean', value: false, key: 'keyAutoRefresh' } as ISettingsItemValueBool, childValues: [
                    // { title: sItemTitle('content', 'refreshInterval'), description: sItemDescription('content', 'refreshInterval'), itemValue: { type: 'boolean', value: false } as ISettingsItemValueBool}
                ] }
                ,
                { itemValue: { type: "spacer", value: false } }
                ,
                { title: sItemTitle('content', 'showSummonerIds'), description: sItemDescription('content', 'showSummonerIds'), itemValue: { type: 'boolean', value: true, key: 'keyShowSummonerIds' } as ISettingsItemValueBool}
                ,
                { title: sItemTitle('content', 'showRandomSkins'), description: sItemDescription('content', 'showRandomSkins'), itemValue: { type: 'boolean', value: true, key: 'keyShowRandomSkins' } as ISettingsItemValueBool, childValues: [
                    { title: sItemTitle('content', 'useCutouts'), description: sItemDescription('content', 'useCutouts'), itemValue: { type: 'boolean', value: false, key: 'keyUseCutouts' } as ISettingsItemValueBool}
                ] }
                ,
                { title: sItemTitle('content', 'showTeamLogos'), description: sItemDescription('content', 'showTeamLogos'), itemValue: { type: 'boolean', value: false, key: 'keyShowTeamLogos' } as ISettingsItemValueBool}
            ]
        }
        ,
        {
            index: 1, type: 'list', title: sTitle('application'), items: [
                { title: sItemTitle('application', 'theme'), itemValue: {
                    type: 'selector', value: 0, options: [
                        { index: 0, text: sItemTitle('application', 'dark') }, { index: 1, text: sItemTitle('application', 'light') }, { index: 2, text: sItemTitle('application', 'system') }
                    ]
                } as ISettingsItemValueSelector}
                ,
                { title: sItemTitle('application', 'appScale'), itemValue: {
                    type: 'selector', value: 0, options: [
                        { index: 0, text: '100%' }, { index: 1, text: '90%' }, { index: 2, text: '75%' }, { index: 2, text: '50%' }
                    ]
                } as ISettingsItemValueSelector}
                ,
                { title: sItemTitle('application', 'openOnStartup'), itemValue: { type: 'boolean', value: false, key: 'keyOpenOnStartup' } as ISettingsItemValueBool}
                ,
                { title: sItemTitle('application', 'minimizeToTray'), description: sItemDescription('application', 'minimizeToTray'), itemValue: { type: 'boolean', value: true, key: 'keyMinimizeToTray' } as ISettingsItemValueBool}
                ,
                { title: sItemTitle('application', 'hardwareAcceleration'), description: sItemDescription('application', 'hardwareAcceleration'), itemValue: { type: 'boolean', value: false, key: 'keyHardwareAcceleration' } as ISettingsItemValueBool}
                ,
                { itemValue: { type: "spacer", value: false } }
                ,
                { title: sItemTitle('application', 'randomAppBackground'), description: sItemDescription('application', 'randomAppBackground'), itemValue: { type: 'boolean', value: true, key: 'keyRandomAppBackground' } as ISettingsItemValueBool}
                ,
                { title: sItemTitle('application', 'keyboardMode'), description: sItemDescription('application', 'keyboardMode'), itemValue: { type: 'boolean', value: false, key: 'keyKeyboardMode' } as ISettingsItemValueBool}
                ,
                { title: sItemTitle('application', 'favortieNotifications'), description: sItemDescription('application', 'favortieNotifications'), itemValue: { type: 'boolean', value: true, key: 'keyNotifications' } as ISettingsItemValueBool}
            ]
        }
        ,
        {
            index: 2, type: 'lang', title: sTitle('language'), selected: 0, items: [
                { itemValue: { type: 'lang', value: 0, text: 'English', lang: 'en_EN' } as ISettingsItemValueLanguage},
                { itemValue: { type: 'lang', value: 1, text: 'Deutsch', lang: 'de_DE' } as ISettingsItemValueLanguage},
                { itemValue: { type: 'lang', value: 2, text: 'Français', lang: 'fr_FR' } as ISettingsItemValueLanguage},
                { itemValue: { type: 'lang', value: 3, text: 'Italiano', lang: 'it_IT' } as ISettingsItemValueLanguage},
                { itemValue: { type: 'lang', value: 4, text: 'Nederlands', lang: 'nl_NL' } as ISettingsItemValueLanguage},
                { itemValue: { type: 'lang', value: 5, text: 'Svenska', lang: 'sv_SV' } as ISettingsItemValueLanguage},
                { itemValue: { type: 'lang', value: 6, text: 'Suomi', lang: 'fi_FI' } as ISettingsItemValueLanguage},
                { itemValue: { type: 'lang', value: 7, text: 'Português', lang: 'pt_PT' } as ISettingsItemValueLanguage},
                { itemValue: { type: 'lang', value: 8, text: 'Polski', lang: 'pl_PL' } as ISettingsItemValueLanguage},
                { itemValue: { type: 'lang', value: 9, text: 'Русский', lang: 'ru_RU' } as ISettingsItemValueLanguage},
                { itemValue: { type: 'lang', value: 10, text: 'Türkçe', lang: 'tr_TR' } as ISettingsItemValueLanguage},
                { itemValue: { type: 'lang', value: 11, text: 'Čeština', lang: 'cs_CS' } as ISettingsItemValueLanguage},
                { itemValue: { type: 'lang', value: 12, text: 'Ελληνικά', lang: 'el_EL' } as ISettingsItemValueLanguage},
                { itemValue: { type: 'lang', value: 13, text: '한국어', lang: 'kr_KR' } as ISettingsItemValueLanguage},
                { itemValue: { type: 'lang', value: 14, text: '日本語', lang: 'ja_JP' } as ISettingsItemValueLanguage},
                { itemValue: { type: 'lang', value: 15, text: 'Tiếng Việt', lang: 'vi_VI' } as ISettingsItemValueLanguage},
                { itemValue: { type: 'lang', value: 16, text: '简体中文', lang: 'zh_CN' } as ISettingsItemValueLanguage},
                { itemValue: { type: 'lang', value: 17, text: '繁體中文', lang: 'zh_TW' } as ISettingsItemValueLanguage}
            ]
        } as ISettingsPageLanguage
        ,
        { index: 3, type: 'list', title: sTitle('about'), items: [] }
    ]
    )

    return (
        <div className={`settings-outer ${settingsOpen ? 'settings-open' : null}`}>
            <SettingsInner pagesProps={settings} settingsOpen={settingsOpen} settingsBackground={appBackground} FSettingsOpen={FSettingsOpen} />

            <SettingsVerticalContainer settingsOpen={settingsOpen} FSettingsOpen={FSettingsOpen} />
        </div>
    )
}

const SettingsVerticalContainer: React.FC<{
    settingsOpen: boolean,
    FSettingsOpen: (set: boolean) => void
}> = ({ settingsOpen, FSettingsOpen }) => {
    const { t } = useTranslation('common');
    const { autoRefresh } = useContext(SettingsContext);

    return (
        <div className={`settings-vertical-container`} >
            <div className={`vertical-button ${ETooltip.TOOLTIP}`} onClick={() => null} id={'discord-button'}>
                <img src={discordIcon} alt="discord" />
                <span className={`${ETooltip.RIGHT} right-far`}>{`Discord`}</span>
            </div>

            <div className={`vertical-button ${ETooltip.TOOLTIP}`} onClick={() => FSettingsOpen(true)}>
                <img src={gearIcon} alt="gear" />
                <span className={`${ETooltip.RIGHT} right-far`}>{`${t('settings.title')}`}</span>
            </div>
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

const SettingsPage: React.FC<{
    pageProps: ISettingsPage,
    pageActive: boolean,
}> = ({ pageProps, pageActive }) => {
    const [t, i18n] = useTranslation('common');
    const langPage = pageProps as ISettingsPageLanguage;
    const [langSelected, setLangSelected] = useState(-1);

    const fLangSelect = (set: number) => {
        setLangSelected(set);
    }

    return (
        <div className={`${pageProps.type === 'lang' ? 'settings-page-lang' : 'settings-page'} ${pageActive ? `${pageProps.type === 'lang' ? 'page-active-lang' : 'page-active'}` : null}`}>
            {React.Children.toArray(
                pageProps.items.map((item) => {
                    if (item.itemValue.type === 'spacer') { return <SettingsPageSpacer/> }
                    
                    const valueLang = item.itemValue as ISettingsItemValueLanguage
                    return pageProps.type === 'lang'
                        ? <SettingsPageItemLanguage itemValue={item.itemValue as ISettingsItemValueLanguage} langSelected={i18n.language === valueLang.lang ? valueLang.value : -1} fLangSelect={fLangSelect}></SettingsPageItemLanguage>
                        : <SettingsPageItem itemProps={item}></SettingsPageItem>
                })
            )}
        </div>
    )
}

const SettingsPageButton: React.FC<{
    pageActive: boolean,
    buttonProps: ISettingsPageButton,
    FPageSwitch: (active: number) => void
}> = ({ pageActive, buttonProps, FPageSwitch }) => {
    const { t } = useTranslation('common');

    return (
        <div className={`settings-page-button ${pageActive ? 'page-button-active' : null}`} onClick={() => FPageSwitch(buttonProps.index)}>
            <div className='page-button-inner'>
                <span className='page-button-text'>{t(buttonProps.text)}</span>
            </div>
        </div>
    )
}

const SettingsPageItem: React.FC<{
    itemProps: ISettingsItem,
}> = ({ itemProps }) => {
    const { t } = useTranslation('common');
    const [noDescription, setNoDescription] = useState(itemProps.description === '');
    const [parentEanbled, setParentEnabled] = useState(itemProps.itemValue.value);

    const fToggleParent = (set: boolean) => { setParentEnabled(set); }

    return (
        <div className={`settings-page-item`}>
            <div className={`item-parent-container`}>
                <div className={`item-title-conatiner ${noDescription ? 'center-container' : null}`}>
                    <span className='item-title noselect'>{itemProps.title ? t(itemProps.title) : ''}</span>
                    <span className={`item-description ${noDescription ? 'description-hidden' : null} noselect`}>{itemProps.description ? t(itemProps.description) : ''}</span>
                </div>

                {itemProps.itemValue.type === 'boolean'
                    ? <SettingsItemValueBool itemPropsBool={itemProps.itemValue as ISettingsItemValueBool} fToggleParent={fToggleParent} /> : null}
                {itemProps.itemValue.type === 'selector'
                    ? <SettingsItemValueSelector itemProps={itemProps.itemValue as ISettingsItemValueSelector} /> : null}
            </div>

            {React.Children.toArray(
                itemProps.childValues?.map((child) => (
                    <div className={`item-child-container ${!parentEanbled ? 'child-disabled' : null}`}>
                        <div className='item-child-text'>
                            <span className={'item-title noselect'}>{child.title ? t(child.title) : ''}</span>
                            <span className={`item-description ${child.description === '' ? 'description-hidden' : null} noselect`}>{child.description ? t(child.description) : ''}</span>
                        </div>

                        {child.itemValue.type === 'boolean'
                            ? <SettingsItemValueBool itemPropsBool={child.itemValue as ISettingsItemValueBool} fToggleParent={unull()} /> : null}
                        {child.itemValue.type === 'selector'
                            ? <SettingsItemValueSelector itemProps={child.itemValue as ISettingsItemValueSelector} /> : null}
                    </div>
                ))
            )}
        </div>
    )
}

const SettingsPageSpacer: React.FC<{
}> = ({ }) => {

    return (
        <div className={`settings-page-spacer`}>
            <div className='spacer-divider'></div>
        </div>
    )
}

const SettingsPageItemLanguage: React.FC<{
    itemValue: ISettingsItemValueLanguage,
    langSelected: number,
    fLangSelect: (set: number) => void
}> = ({ itemValue, langSelected, fLangSelect }) => {
    const { i18n } = useTranslation('common');
    const { updateSetting } = useContext(SettingsContext);

    const fSelectLanguage = () => {
        fLangSelect(itemValue.value);
        i18n.changeLanguage(itemValue.lang);
        updateSetting('keyAppLanguage', itemValue.value);
    }

    return (
        <div className={`item-language ${langSelected == itemValue.value ? 'selected-lang' : 'unselected-lang'} ${i18n.hasResourceBundle(itemValue.lang, 'common') ? null : 'lang-disabled'}`} onClick={fSelectLanguage}>
            <div className={`circle ${langSelected == itemValue.value ? 'onSelected' : 'offUnselected'}`}></div>
            <span className='language-text'>{i18n.hasResourceBundle(itemValue.lang, 'common') ? itemValue.text : '· · ·'}</span>
        </div>
    )
}

// NOTE: ISettingsItemValue components:
const SettingsItemValueBool: React.FC<{
    itemPropsBool: ISettingsItemValueBool,
    fToggleParent: (set: boolean) => void
}> = ({ itemPropsBool, fToggleParent }) => {
    const { updateSetting, getSetting } = useContext(SettingsContext);
    const [boolValue, setBoolValue] = useState(itemPropsBool.value);

    const fBoolValue = (set: boolean) => {
        setBoolValue(set);
        fToggleParent(set);
        updateSetting(itemPropsBool.key, set);
    }

    useInit(() => {
        const getStoredValue = async () => {
            const stored = await getSetting(itemPropsBool.key) as boolean | null;
            if (stored != null) {
                setBoolValue(stored);
            }
        }
        getStoredValue();
    });

    return (
        <div className={`item-value-bool ${boolValue ? 'bool-true' : null}`}>
            <div className={`bool-half`} onClick={() => fBoolValue(false)}>
                <div className={`circle ${boolValue ? 'offUnselected' : 'offSelected'}`}></div>
            </div>
            <div className={`bool-half`} onClick={() => fBoolValue(true)}>
                <div className={`bar ${boolValue ? 'onSelected' : 'onUnselected'}`}></div>
            </div>
            <div className={`half-selected`}></div>
        </div>
    )
}
const SettingsItemValueSelector: React.FC<{
    itemProps: ISettingsItemValueSelector
}> = ({ itemProps }) => {
    const [t] = useTranslation('common');
    const [selectorOpen, setSelectorOpen] = useState(false);
    // const [selectorValue, setSelectorValue] = useState(itemValue);

    return (
        <div className={`item-value-selector`}>
            <span className='value-text'>{t(itemProps.options[itemProps.value].text)}</span>
            <img src={`src/assets/icons/chevron.right.svg`} alt="" className='value-right' />
        </div>
    )
}

export default Settings