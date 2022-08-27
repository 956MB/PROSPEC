
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import '../css/settings.css';

import { unull } from "../../utils";
import { ISettingsItem, ISettingsItemValueBool, ISettingsItemValueLanguage, ISettingsItemValueSelector, useInit } from "../../interfaces";
import { SettingsContext } from '../../context/SettingsContext';
import { useDetectClickOutside } from "react-detect-click-outside";
import { ESettingsStates } from '../../typings';

const SettingsItem: React.FC<{
    itemProps: ISettingsItem,
    itemZIndex: number
}> = ({ itemProps, itemZIndex }) => {
    const { t } = useTranslation('common');
    const [noDescription, setNoDescription] = useState<boolean>(itemProps.description === '' || itemProps.description === undefined);
    const [parentEanbled, setParentEnabled] = useState<boolean>(itemProps.itemValue.value);

    const fToggleParent = (set: boolean) => { setParentEnabled(set); }

    return (
        <div className={`settings-page-item`} style={{ zIndex: itemZIndex }}>
            <div className={`item-parent-container`}>
                <div className={`item-title-conatiner ${noDescription ? 'center-container' : null}`}>
                    <span className='item-title noselect'>{itemProps.title ? t(itemProps.title) : ''}</span>
                    <span className={`item-description ${noDescription ? 'description-hidden' : null} noselect`}>{itemProps.description ? t(itemProps.description) : ''}</span>
                </div>

                <div className={`${itemProps.itemValue.type === 'boolean' ? 'item-value-container' : 'item-value-selector-container'}`}>
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
                    <div className={`item-child-container ${!parentEanbled ? 'child-disabled' : null}`}>
                        <div className='item-child-text'>
                            <span className={'item-title noselect'}>{child.title ? t(child.title) : ''}</span>
                            <span className={`item-description ${child.description === '' ? 'description-hidden' : null} noselect`}>{child.description ? t(child.description) : ''}</span>
                        </div>

                        <div className={`${child.itemValue.type === 'boolean' ? 'item-value-container' : 'item-value-selector-container'}`}>
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

const SettingsItemSpacer: React.FC<{
}> = ({ }) => {

    return (
        <div className={`settings-page-spacer`}>
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
    const { i18n } = useTranslation('common');
    const { updateSetting } = useContext(SettingsContext);

    const fSelectLanguage = () => {
        fLangSelect(itemValue.value);
        i18n.changeLanguage(itemValue.lang);
        updateSetting(ESettingsStates.APP_LANGUAGE, itemValue.value);
    }

    return (
        <div
            className={`item-language ${langSelected == itemValue.value ? 'selected-lang' : 'unselected-lang'} ${i18n.hasResourceBundle(itemValue.lang, 'common') ? null : 'lang-disabled'}`}
            onClick={fSelectLanguage}>
            <div className={`circle ${langSelected == itemValue.value ? 'onSelected' : 'offUnselected'}`}></div>
            <span className='language-text'>{itemValue.text}</span>
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
        <div className={`item-value-bool ${boolValue ? 'bool-true' : null}`} onClick={() => fBoolValue(!boolValue)}>
            <div className={`bool-circle`}></div>
        </div>
    )
}

const SettingsItemSelector: React.FC<{
    selectorProps: ISettingsItemValueSelector
}> = ({ selectorProps }) => {
    const [t] = useTranslation('common');
    const [selectorOpen, setSelectorOpen] = useState<boolean>(false);
    const [selectorValue, setSelectorValue] = useState<number>(selectorProps.value);
    const { updateSetting, getSetting } = useContext(SettingsContext);

    const newSelectorValue = (set: number) => {
        setSelectorValue(set);
        if (selectorOpen) { setSelectorOpen(false) }
        updateSetting(selectorProps.key, set);
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
                <span className={`value-text noselect`}>{t(selectorProps.options[selectorValue].text)}</span>
                <img src={`src/assets/icons/chevron.down.svg`} alt="" className='value-right' />
            </div>

            {!selectorOpen ? null :
                <div className={`item-value-selector-dropdown`}>
                    {React.Children.toArray(
                        selectorProps.options.map((item, i) =>
                            <div className={`item-dropdown-button`} onClick={() => newSelectorValue(i)}>
                                {/* <div className={`circle ${item.index == selectorProps.value ? 'onSelected' : null}`}></div> */}
                                <span className='value-text noselect'>{t(item.text)}</span>
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
    SettingsItemSpacer,
    SettingsItemLanguage,
    SettingsItemBool,
    SettingsItemSelector
}