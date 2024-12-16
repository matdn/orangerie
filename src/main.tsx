import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import GameReact from './game/GameReact.tsx'
import './i18n';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>,
  <GameReact />,
)
