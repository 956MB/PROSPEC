import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
    // TODO: Removing strict mode during dev: stops app being mounted twice and causing classes to be inited 2x, need to look into if i need this for build or not
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>
)