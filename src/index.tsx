import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import SpectatorProvider from "./context/SpectatorContext";
import SettingsProvider from "./context/SettingsContext";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import * as locales from './imports/locales'

i18next.init({
    interpolation: { escapeValue: false },
    lng: 'en_US',
    resources: {
        "en_US": { common: locales.common_en_us },
        "en_UK": { common: locales.common_en_uk },
        "ar_AE": { common: locales.common_ar },
        "kr_KR": { common: locales.common_kr },
        "fi_FI": { common: locales.common_fi },
        "sv_SV": { common: locales.common_sv },
        "ja_JP": { common: locales.common_jp },
        "hi_HI": { common: locales.common_hi },
        "br_BA": { common: locales.common_br }
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <I18nextProvider i18n={i18next}>
        <SettingsProvider>
            <SpectatorProvider initPlayers={true}>
                <App />
            </SpectatorProvider>
        </SettingsProvider>
    </I18nextProvider>

    // TODO: Removing strict mode during dev: stops app being mounted twice and causing classes to be inited 2x, need to look into if i need this for build or not
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>
)