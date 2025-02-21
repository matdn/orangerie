import ReactDOM from 'react-dom/client';
import GameReact from './game/GameReact.tsx';
import './i18n';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GameReact />
);
