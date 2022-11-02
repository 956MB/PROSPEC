
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import '../css/settings.css';
import parse from 'html-react-parser';

import { unull } from "../../imports/utils";
import { ISettingsItem, ISettingsItemValueBool, ISettingsItemValueLanguage, ISettingsItemValueSelector } from "../../imports/interfaces";
import { useInit } from '../../imports/initializers';
import { SettingsContext } from '../../context/SettingsContext';
import { useDetectClickOutside } from "react-detect-click-outside";
import { ELanguages, ESettingsStates } from '../../imports/typings';
import { downIcon, refreshIcon } from "../../imports/icons";

const SettingsItem: React.FC<{
    itemProps: ISettingsItem,
    itemZIndex: number,
}> = ({ itemProps, itemZIndex }) => {
    const { t } = useTranslation('common');
    const { updateSetting, getSetting, randomBackground } = useContext(SettingsContext);
    const [noDescription, setNoDescription] = useState<boolean>(itemProps.description === '' || itemProps.description === undefined);
    const [parentEanbled, setParentEnabled] = useState<boolean>(itemProps.itemValue.value);

    const fToggleParent = (set: boolean) => { setParentEnabled(set); }

    useInit(() => {
        if (itemProps.itemValue.type === 'boolean') {
            const getStoredValue = async () => {
                const itemValueBool = itemProps.itemValue as ISettingsItemValueBool;
                const stored = await getSetting(itemValueBool.key) as boolean | null;
                if (stored != null) {
                    setParentEnabled(stored);
                }
            }
            getStoredValue();
        }
    });

    return (
        <div className={`settings-page-item`} style={{ zIndex: itemZIndex }}>
            <div className={`item-parent-container`}>
                <div className={`item-title-conatiner ${noDescription ? 'center-container' : ''}`}>
                    <span className='item-title noselect'>{itemProps.title ? ( itemProps.key === 'appLanguage' ? parse(t(itemProps.title)) : t(itemProps.title)) : ''}</span>
                    <span className={`item-description ${noDescription ? 'description-hidden' : ''} noselect`}>{itemProps.description ? t(itemProps.description) : ''}</span>
                </div>

                <div className={`${itemProps.itemValue.type === 'boolean' ? 'item-value-container' : 'item-value-selector-container'}`}>
                    {randomBackground && itemProps.secondaryAction ? 
                        <button
                            className="titlebar-button refresh-group-button settings-secondary-action noselect"
                            id='refresh-button'
                            onClick={() => itemProps.secondaryAction?.()}>
                            <img src={refreshIcon} alt="refresh" id="titlebar-refresh" />
                        </button>
                    : null}

                    {itemProps.itemValue.type === 'boolean'
                        ? <SettingsItemBool
                            boolProps={itemProps.itemValue as ISettingsItemValueBool}
                            fToggleParent={fToggleParent} /> : null}
                    {itemProps.itemValue.type === 'selector'
                        ? <SettingsItemSelector
                            selectorProps={itemProps.itemValue as ISettingsItemValueSelector} /> : null}
                </div>

            </div>

            {React.Children.toArray(
                itemProps.childValues?.map((child) => (
                    <div className={`item-child-container ${!parentEanbled ? 'child-disabled' : ''}`}>
                        <div className='item-child-text'>
                            <span className={'item-title noselect'}>{child.title ? t(child.title) : ''}</span>
                            <span className={`item-description ${child.description === '' ? 'description-hidden' : ''} noselect`}>{child.description ? t(child.description) : ''}</span>
                        </div>

                        <div className={`${child.itemValue.type === 'boolean' ? 'item-value-container' : 'item-value-selector-container'}`}>
                            {randomBackground && child.secondaryAction ? 
                                <button
                                    className="titlebar-button refresh-group-button settings-secondary-action noselect"
                                    id='refresh-button'
                                    onClick={() => child.secondaryAction?.()}>
                                    <img src={refreshIcon} alt="refresh" id="titlebar-refresh" />
                                </button>
                            : null}

                            {child.itemValue.type === 'boolean'
                                ? <SettingsItemBool
                                    boolProps={child.itemValue as ISettingsItemValueBool}
                                    fToggleParent={unull()} /> : null}
                            {child.itemValue.type === 'selector'
                                ? <SettingsItemSelector
                                    selectorProps={child.itemValue as ISettingsItemValueSelector} /> : null}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

const SettingsItemSpacerElement: React.FC<{
    itemProps: ISettingsItem
}> = ({ itemProps }) => {
    const { t } = useTranslation('common');

    return (
        <div className={`settings-page-spacer`}>
            {itemProps.title ? <span className={`spacer-title-text`}>{t(itemProps.title)}</span> : null}
            <div className='spacer-divider'></div>
        </div>
    )
}

// NOTE: ISettingsItemValue components:

const SettingsItemLanguage: React.FC<{
    itemValue: ISettingsItemValueLanguage,
    langSelected: number,
    fLangSelect: (set: number) => void
}> = ({ itemValue, langSelected, fLangSelect }) => {
    const { t, i18n } = useTranslation('common');
    const { updateSetting } = useContext(SettingsContext);
    // const [hasLang, setHasLang] = useState<boolean>(i18n.hasResourceBundle(itemValue.lang, 'common'));

    const fSelectLanguage = () => {
        console.log(langSelected, itemValue.value, itemValue.lang);
        if (langSelected != itemValue.value) {
            fLangSelect(itemValue.value);
            i18n.changeLanguage(itemValue.lang);
            updateSetting(ESettingsStates.APP_LANGUAGE, itemValue.value);
        }
    }

    return (
        <div
            className={`item-language ${langSelected == itemValue.value ? 'selected-lang' : ''}`}
            onClick={fSelectLanguage}>
            <div className={`circle noselect ${langSelected == itemValue.value ? 'onSelected' : 'offUnselected'}`}></div>
            <span className={`language-text noselect ${itemValue.lang === ELanguages.br_BA ? 'braille-override' : ''}`}>{itemValue.text}</span>
            {/* {!hasLang ? null : */}
                <div className="language-flag-container">
                    {/* <span className={`language-lang noselect`}>{itemValue.lang}</span> */}
                    <img src={`src/assets/flags/${itemValue.lang}.png`} alt="lang-flag" className={`item-language-flag`} />
                </div>
            {/* } */}
        </div>
    )
}

const SettingsItemBool: React.FC<{
    boolProps: ISettingsItemValueBool,
    fToggleParent: (set: boolean) => void
}> = ({ boolProps, fToggleParent }) => {
    const { updateSetting, getSetting } = useContext(SettingsContext);
    const [boolValue, setBoolValue] = useState<boolean>(boolProps.value);

    const fBoolValue = (set: boolean) => {
        setBoolValue(set);
        fToggleParent(set);
        updateSetting(boolProps.key, set);
    }

    useInit(() => {
        const getStoredValue = async () => {
            const stored = await getSetting(boolProps.key) as boolean | null;
            if (stored != null) {
                setBoolValue(stored);
            }
        }
        getStoredValue();
    });

    return (
        <div className={`item-value-bool ${boolValue ? 'bool-true' : ''}`} onClick={() => fBoolValue(!boolValue)}>
            <div className={`bool-circle`}></div>
        </div>
    )
}

const SettingsItemSelector: React.FC<{
    selectorProps: ISettingsItemValueSelector
}> = ({ selectorProps }) => {
    const { t, i18n } = useTranslation('common');
    const [selectorOpen, setSelectorOpen] = useState<boolean>(false);
    const [selectorValue, setSelectorValue] = useState<number>(selectorProps.value);
    const { updateSetting, getSetting } = useContext(SettingsContext);

    const updateSelectorValue = (val: number, lang: string) => {
        if (selectorProps.key === 'appLanguage') {
            i18n.changeLanguage(lang);
        }
        setSelectorValue(val);
        if (selectorOpen) { setSelectorOpen(false) }
        updateSetting(selectorProps.key, val);
    }
    const toggleSelectorClosed = (e: any) => {
        e.stopPropagation();
        if (selectorOpen) { setSelectorOpen(false) }
    }
    const selectorRef = useDetectClickOutside({ onTriggered: toggleSelectorClosed });

    useInit(() => {
        const getStoredValue = async () => {
            const stored = await getSetting(selectorProps.key) as number | null;
            if (stored != null) {
                setSelectorValue(stored);
            }
        }
        getStoredValue();
    });

    return (
        <div
            className={`${selectorOpen ? 'item-selector-inner-open' : 'item-selector-inner'}`}
            ref={selectorRef}
        >
            <div className={`item-value-selector`} onClick={() => setSelectorOpen(!selectorOpen)}>
                <span className={`value-text value-selected noselect`}>{t(selectorProps.options[selectorValue].text)}</span>
                <img src={downIcon} alt="" className='value-right' />
            </div>

            {!selectorOpen ? null :
                <div className={`item-value-selector-dropdown`}>
                    {React.Children.toArray(
                        selectorProps.options.map((item, i) =>
                        <div className={`item-dropdown-button`} onClick={() => updateSelectorValue(i, item.extra)}>
                                <span className={`value-text ${i == selectorValue ? 'value-selected' : ''} noselect`}>{t(item.text)}</span>
                            </div>
                        )
                    )}
                </div>
            }
        </div>
    )
}

export {
    SettingsItem,
    SettingsItemSpacerElement,
    SettingsItemLanguage,
    SettingsItemBool,
    SettingsItemSelector
}