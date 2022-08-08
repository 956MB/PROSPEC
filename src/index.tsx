import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {I18nextProvider} from "react-i18next";
import i18next from "i18next";

import common_en from "./locale/en_EN/common.json";
import common_kr from "./locale/kr_KR/common.json";

i18next.init({
    interpolation: { escapeValue: false },
    lng: 'en_EN',
    resources: {
        en_EN: { common: common_en },
        kr_KR: { common: common_kr }
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <I18nextProvider i18n={i18next}>
        <App/>
    </I18nextProvider>

    // TODO: Removing strict mode during dev: stops app being mounted twice and causing classes to be inited 2x, need to look into if i need this for build or not
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>
)