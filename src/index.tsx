import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import SpectatorProvider from "./context/SpectatorContext";
import SettingsProvider from "./context/SettingsContext";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";

import common_en from "./locale/en_EN/common.json";
import common_kr from "./locale/kr_KR/common.json";
import common_fi from "./locale/fi_FI/common.json";
import common_sv from "./locale/sv_SV/common.json";
import common_jp from "./locale/ja_JP/common.json";
// import SettingsStore from './context/SettingsStore';

i18next.init({
    interpolation: { escapeValue: false },
    lng: 'kr_KR',
    resources: {
        en_EN: { common: common_en },
        kr_KR: { common: common_kr },
        fi_FI: { common: common_fi },
        sv_SV: { common: common_sv },
        ja_JP: { common: common_jp }
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <SpectatorProvider initPlayers={true}>
        <SettingsProvider>
            <I18nextProvider i18n={i18next}>
                <App/>
            </I18nextProvider>
        </SettingsProvider>
    </SpectatorProvider>

    // TODO: Removing strict mode during dev: stops app being mounted twice and causing classes to be inited 2x, need to look into if i need this for build or not
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>
)