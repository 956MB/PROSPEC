import React, { useState } from 'react';
import { EButtonImages, EEMessages, ETooltip } from '../typings';
import './css/settings.css';

import closeIcon from '../assets/icons/close.svg';
import gearIcon from '../assets/icons/gear.svg';
import { ISettingsItem, ISettingsItemValueBool, ISettingsItemValueLanguage, ISettingsItemValueSelector, ISettingsPage, ISettingsPageButton, ISettingsPages, ISettingsPageLanguage } from '../interfaces';

const Settings: React.FC<{
    appBackground: string,
    settingsOpen: boolean,
    FSettingsOpen: (set: boolean) => void
}> = ({ appBackground, settingsOpen, FSettingsOpen }) => {
    const [settings, setSettings] = useState<ISettingsPages>([
        {
            index: 0, type: 'list', title: 'Application', items: [
                { title: 'Theme', description: '', itemValue: { type: 'selector', value: 0, options: [
                    {index: 0, text: 'Dark'}, {index: 1, text: 'Light'}, {index: 2, text: 'System'}
                ] } as ISettingsItemValueSelector, childValues: [] }
                ,
                { title: 'Accent', description: '', itemValue: { type: 'boolean', value: false } as ISettingsItemValueBool, childValues: []}
                ,
                { title: 'App scale', description: '', itemValue: { type: 'selector', value: 0, options: [
                    {index: 0, text: '100%'}, {index: 1, text: '90%'}, {index: 2, text: '75%'}, {index: 2, text: '50%'}
                ] } as ISettingsItemValueSelector, childValues: [] }
                ,
                { title: 'Open on startup', description: '', itemValue: { type: 'boolean', value: false } as ISettingsItemValueBool, childValues: []}
                ,
                { title: 'Minimize to tray', description: 'Close button should minimize, not exit.', itemValue: { type: 'boolean', value: true } as ISettingsItemValueBool, childValues: []}
                ,
                { title: 'Hardware acceleration', description: 'Hardware acceleration uses the GPU to make the ProSpec run more smoothly.', itemValue: { type: 'boolean', value: false } as ISettingsItemValueBool, childValues: []}
                ,
                { title: 'Random app background', description: 'Choose the app background to be randomly selected from champion pool, or set it to a specific default.', itemValue: { type: 'boolean', value: false } as ISettingsItemValueBool, childValues: []}
                ,
                { title: 'Keyboard mode', description: 'Enables app navigation using the keyboard.', itemValue: { type: 'boolean', value: false } as ISettingsItemValueBool, childValues: []}
                ,
                { title: 'Favorite notifications', description: 'Favorite pros gets notifications when they start a game (Auto refresh on).', itemValue: { type: 'boolean', value: true } as ISettingsItemValueBool, childValues: []}
        ] }
        ,
        { index: 1, type: 'list', title: 'Content', items: [
            { title: 'List layout', description: '', itemValue: { type: 'selector', value: 0, options: [
                {index: 0, text: 'Card'}, {index: 1, text: 'List'}, {index: 2, text: 'Item3'}
            ] } as ISettingsItemValueSelector, childValues: [] }
            ,
            {
                title: 'Auto refresh', description: '', itemValue: { type: 'boolean', value: true } as ISettingsItemValueBool, childValues: [
                    { title: 'Refresh interval', description: 'How many seconds/min to refresh the list of pros. 3m+ recommended because of LoL API rate limits.', itemValue: { type: 'boolean', value: false } as ISettingsItemValueBool, childValues: [], disabledByParent: true }
                ]
            }
            ,
            { title: 'Show summoner IDs', description: 'Displays player summoner ID (Hide on bush), instead of gamertag (Faker).', itemValue: { type: 'boolean', value: false } as ISettingsItemValueBool, childValues: [] },
            {
                title: 'Show random skins', description: 'Displays random skin backgrounds instead of the default skin art.', itemValue: { type: 'boolean', value: false } as ISettingsItemValueBool, childValues: [
                    { title: 'Use cutouts', description: 'Uses transparent champion cutouts instead of loading splash art', itemValue: { type: 'boolean', value: false } as ISettingsItemValueBool, childValues: [], disabledByParent: true }
                ]
            }
            ,
            { title: 'Show team logos', description: 'Displays team logo in place of current champion in card.', itemValue: { value: false } as ISettingsItemValueBool, childValues: [] }
        ] }
        ,
        { index: 2, type: 'lang', title: 'Language', selected: 13, items: [
            { title: '', description: '', itemValue: { type: 'lang', value: 0, text: 'English' } as ISettingsItemValueLanguage, childValues: [] },
            { title: '', description: '', itemValue: { type: 'lang', value: 1, text: 'Deutsch' } as ISettingsItemValueLanguage, childValues: [] },
            { title: '', description: '', itemValue: { type: 'lang', value: 2, text: 'Français' } as ISettingsItemValueLanguage, childValues: [] },
            { title: '', description: '', itemValue: { type: 'lang', value: 3, text: 'Italiano' } as ISettingsItemValueLanguage, childValues: [] },
            { title: '', description: '', itemValue: { type: 'lang', value: 4, text: 'Nederlands' } as ISettingsItemValueLanguage, childValues: [] },
            { title: '', description: '', itemValue: { type: 'lang', value: 5, text: 'Svenska' } as ISettingsItemValueLanguage, childValues: [] },
            { title: '', description: '', itemValue: { type: 'lang', value: 6, text: 'Suomeksi' } as ISettingsItemValueLanguage, childValues: [] },
            { title: '', description: '', itemValue: { type: 'lang', value: 7, text: 'Português' } as ISettingsItemValueLanguage, childValues: [] },
            { title: '', description: '', itemValue: { type: 'lang', value: 8, text: 'Polski' } as ISettingsItemValueLanguage, childValues: [] },
            { title: '', description: '', itemValue: { type: 'lang', value: 9, text: 'Русский' } as ISettingsItemValueLanguage, childValues: [] },
            { title: '', description: '', itemValue: { type: 'lang', value: 10, text: 'Türkçe' } as ISettingsItemValueLanguage, childValues: [] },
            { title: '', description: '', itemValue: { type: 'lang', value: 11, text: 'Čeština' } as ISettingsItemValueLanguage, childValues: [] },
            { title: '', description: '', itemValue: { type: 'lang', value: 12, text: 'Ελληνικά' } as ISettingsItemValueLanguage, childValues: [] },
            { title: '', description: '', itemValue: { type: 'lang', value: 13, text: '한국어' } as ISettingsItemValueLanguage, childValues: [] },
            { title: '', description: '', itemValue: { type: 'lang', value: 14, text: '日本語' } as ISettingsItemValueLanguage, childValues: [] },
            { title: '', description: '', itemValue: { type: 'lang', value: 15, text: 'Tiếng Việt' } as ISettingsItemValueLanguage, childValues: [] },
            { title: '', description: '', itemValue: { type: 'lang', value: 16, text: '简体中文' } as ISettingsItemValueLanguage, childValues: [] },
            { title: '', description: '', itemValue: { type: 'lang', value: 17, text: '繁體中文' } as ISettingsItemValueLanguage, childValues: [] }
        ] } as ISettingsPageLanguage
        ,
        { index: 3, type: 'list', title: 'About', items: [] }
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
    return (
        <div data-tauri-drag-region className={`settings-vertical-container`} >
            <div className={`vertical-button`} onClick={() => FSettingsOpen(true)}>
                <img src={gearIcon} alt="gear" />
            </div>
        </div>
    )
}

// TODO: need to make SettingsInner `display: none` or remove element AFTER settings slides all the way back to 55px.
const SettingsInner: React.FC<{
    pagesProps: ISettingsPages,
    settingsOpen: boolean,
    settingsBackground: string,
    FSettingsOpen: (set: boolean) => void
}> = ({ pagesProps, settingsOpen, settingsBackground, FSettingsOpen }) => {
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
                    <span className='settings-title-text'>Settings</span>
                    <div className={`titlebar-button titlebar-button-edge-both close-button ${ETooltip.TOOLTIP}`} onClick={() => FSettingsOpen(false)}>
                        <img src={closeIcon} alt="close" />
                        <span className={`${ETooltip.LEFT}`}>{EEMessages.ESC}</span>
                    </div>
                </div>
                <div className='settings-buttons-container'>
                    <div className='settings-page-button-container'>
                        {pagesProps.map((page, i) => (
                            <SettingsPageButton key={page.index} pageActive={isActive(page.index)} buttonProps={{ index: page.index, text: page.title }} FPageSwitch={FPageSwitch} />
                        ))}
                    </div>
                </div>

                {pagesProps.map((page, i) => (
                    <SettingsPage key={page.index} pageProps={page} pageActive={isActive(i)} />
                ))}
            </div>
            <div className="settings-dark-overlay"></div>
            <div className="settings-background" style={{ backgroundImage: `url(src/assets/dragontail-12.13.1/centered/${settingsBackground}.webp)` }}></div>
        </div>
    )
}

const SettingsPage: React.FC<{
    pageProps: ISettingsPage,
    pageActive: boolean,
}> = ({ pageProps, pageActive }) => {
    const langPage = pageProps as ISettingsPageLanguage;
    const [langSelected, setLangSelected] = useState(langPage.selected);

    const fLangSelect = (set: number) => {
        setLangSelected(set);
    }

    return (
        <div className={`${pageProps.type === 'lang' ? 'settings-page-lang' : 'settings-page'} ${pageActive ? `${pageProps.type === 'lang' ? 'page-active-lang' : 'page-active'}` : null}`}>
            {pageProps.items.map((item, i) => (
                pageProps.type === 'lang'
                    ? <SettingsPageItemLanguage key={i} itemValue={item.itemValue as ISettingsItemValueLanguage} langSelected={langSelected} fLangSelect={fLangSelect}></SettingsPageItemLanguage>
                    : <SettingsPageItem key={i} itemProps={item} parentFalse={item.itemValue.value == false}></SettingsPageItem>
            ))}
        </div>
    )
}

const SettingsPageButton: React.FC<{
    pageActive: boolean,
    buttonProps: ISettingsPageButton,
    FPageSwitch: (active: number) => void
}> = ({ pageActive, buttonProps, FPageSwitch }) => {
    return (
        <div className={`settings-page-button ${pageActive ? 'page-button-active' : null}`} onClick={() => FPageSwitch(buttonProps.index)}>
            <span className='page-button-text'>{buttonProps.text}</span>
        </div>
    )
}

const SettingsPageItem: React.FC<{
    itemProps: ISettingsItem,
    parentFalse: boolean
}> = ({ itemProps, parentFalse }) => {
    const [noDescription, setNoDescription] = useState(itemProps.description === '');
    return (
        <div className={`settings-page-item`}>
            <div className={`item-parent-container`}>
                <div className={`item-title-conatiner ${noDescription ? 'center-container' : null}`}>
                    <span className='item-title noselect'>{itemProps.title}</span>
                    <span className={`item-description ${noDescription ? 'description-hidden' : null} noselect`}>{itemProps.description}</span>
                </div>

                {itemProps.itemValue.type === 'boolean'
                    ? <SettingsItemValueBool itemValue={itemProps.itemValue.value} /> : null}
                {itemProps.itemValue.type === 'selector'
                    ? <SettingsItemValueSelector itemProps={itemProps.itemValue as ISettingsItemValueSelector} /> : null}
            </div>

            {itemProps.childValues.map((child, i) => (
                <div className={`item-child-container ${parentFalse && child.disabledByParent ? 'child-disabled' : null}`}>
                    <div className='item-child-text'>
                        <span className={'item-title noselect'}>{child.title}</span>
                        <span className={`item-description ${child.description === '' ? 'description-hidden' : null} noselect`}>{child.description}</span>
                    </div>

                    {child.itemValue.type === 'boolean'
                        ? <SettingsItemValueBool itemValue={child.itemValue.value} /> : null}
                    {child.itemValue.type === 'selector'
                        ? <SettingsItemValueSelector itemProps={child.itemValue as ISettingsItemValueSelector} /> : null}
                </div>
            ))}
        </div>
    )
}

const SettingsPageItemLanguage: React.FC<{
    itemValue: ISettingsItemValueLanguage,
    langSelected: number,
    fLangSelect: (set: number) => void
}> = ({ itemValue, langSelected, fLangSelect }) => {
    return (
        <div className='item-language' onClick={() => fLangSelect(itemValue.value)}>
            <div className={`circle ${langSelected == itemValue.value ? 'onSelected' : 'offUnselected'}`}></div>
            <span className='language-text'>{itemValue.text}</span>
        </div>
    )
}

// NOTE: ISettingsItemValue components:
const SettingsItemValueBool: React.FC<{
    itemValue: boolean
}> = ({ itemValue }) => {
    const [boolValue, setBoolValue] = useState(itemValue);

    return (
        <div className={`item-value-bool`}>
            <div className={`bool-half half-left ${boolValue ? 'half-selected' : null}`} onClick={() => setBoolValue(false)}>
                <div className={`circle ${boolValue ? 'offUnselected' : 'offSelected'}`}></div>
            </div>
            <div className={`bool-half half-right ${!boolValue ? 'half-selected' : null}`} onClick={() => setBoolValue(true)}>
                <div className={`bar ${boolValue ? 'onSelected' : 'onUnselected'}`}></div>
            </div>
        </div>
    )
}
const SettingsItemValueSelector: React.FC<{
    itemProps: ISettingsItemValueSelector
}> = ({ itemProps }) => {
    const [selectorOpen, setSelectorOpen] = useState(false);
    // const [selectorValue, setSelectorValue] = useState(itemValue);

    return (
        <div className={`item-value-selector`}>
            <span className='value-text'>{itemProps.options[itemProps.value].text}</span>
            <img src={`src/assets/icons/chevron.right.svg`} alt="" className='value-right' />
        </div>
    )
}

export default Settings