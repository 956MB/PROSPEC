
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import '../css/settings.css';

import { unull } from "../../utils";
import { ISettingsItem, ISettingsItemValueBool, ISettingsItemValueLanguage, ISettingsItemValueSelector, useInit } from "../../interfaces";
import { SettingsContext } from '../../context/SettingsContext';

const SettingsItem: React.FC<{
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
                    ? <SettingsItemBool
                        itemPropsBool={itemProps.itemValue as ISettingsItemValueBool}
                        fToggleParent={fToggleParent} /> : null}
                {itemProps.itemValue.type === 'selector'
                    ? <SettingsItemSelector
                        itemProps={itemProps.itemValue as ISettingsItemValueSelector} /> : null}
            </div>

            {React.Children.toArray(
                itemProps.childValues?.map((child) => (
                    <div className={`item-child-container ${!parentEanbled ? 'child-disabled' : null}`}>
                        <div className='item-child-text'>
                            <span className={'item-title noselect'}>{child.title ? t(child.title) : ''}</span>
                            <span className={`item-description ${child.description === '' ? 'description-hidden' : null} noselect`}>{child.description ? t(child.description) : ''}</span>
                        </div>

                        {child.itemValue.type === 'boolean'
                            ? <SettingsItemBool
                                itemPropsBool={child.itemValue as ISettingsItemValueBool}
                                fToggleParent={unull()} /> : null}
                        {child.itemValue.type === 'selector'
                            ? <SettingsItemSelector
                                itemProps={child.itemValue as ISettingsItemValueSelector} /> : null}
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
        updateSetting('keyAppLanguage', itemValue.value);
    }

    return (
        <div className={`item-language ${langSelected == itemValue.value ? 'selected-lang' : 'unselected-lang'} ${i18n.hasResourceBundle(itemValue.lang, 'common') ? null : 'lang-disabled'}`} onClick={fSelectLanguage}>
            <div className={`circle ${langSelected == itemValue.value ? 'onSelected' : 'offUnselected'}`}></div>
            <span className='language-text'>{i18n.hasResourceBundle(itemValue.lang, 'common') ? itemValue.text : '· · ·'}</span>
        </div>
    )
}

const SettingsItemBool: React.FC<{
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
const SettingsItemSelector: React.FC<{
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

export {
    SettingsItem,
    SettingsItemSpacer,
    SettingsItemLanguage,
    SettingsItemBool,
    SettingsItemSelector
}