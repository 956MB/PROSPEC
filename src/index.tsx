import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import SpectatorProvider from "./context/SpectatorContext";
import SettingsProvider from "./context/SettingsContext";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import common_en from "./locale/en_EN/common.json";
import common_ar from "./locale/ar_AE/common.json";
import common_he from "./locale/he_HE/common.json";
import common_kr from "./locale/kr_KR/common.json";
import common_fi from "./locale/fi_FI/common.json";
import common_sv from "./locale/sv_SV/common.json";
import common_jp from "./locale/ja_JP/common.json";
import common_hi from "./locale/hi_HI/common.json";
// import SettingsStore from './context/SettingsStore';

i18next.init({
    interpolation: { escapeValue: false },
    lng: 'en_EN',
    resources: {
        en_EN: { common: common_en },
        ar_AE: { common: common_ar },
        he_HE: { common: common_he },
        kr_KR: { common: common_kr },
        fi_FI: { common: common_fi },
        sv_SV: { common: common_sv },
        ja_JP: { common: common_jp },
        hi_HI: { common: common_hi }
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