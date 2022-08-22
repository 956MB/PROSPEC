import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import '../css/settings.css';

import { ISettingsItemValueLanguage, ISettingsPage, ISettingsPageButton, ISettingsPageLanguage } from "../../interfaces";
import { SettingsItem, SettingsItemLanguage, SettingsItemSpacer } from "./SettingsItem";

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
                    if (item.itemValue.type === 'spacer') { return <SettingsItemSpacer /> }

                    const valueLang = item.itemValue as ISettingsItemValueLanguage
                    return pageProps.type === 'lang'
                        ? <SettingsItemLanguage
                            itemValue={item.itemValue as ISettingsItemValueLanguage}
                            langSelected={i18n.language === valueLang.lang ? valueLang.value : -1}
                            fLangSelect={fLangSelect}></SettingsItemLanguage>
                        : <SettingsItem itemProps={item}></SettingsItem>
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

export {
    SettingsPage,
    SettingsPageButton
}