import { ReactLenis } from '@studio-freight/react-lenis';
import ReactDOM from 'react-dom/client';
import GameReact from './game/GameReact.tsx';
import './i18n';
import './index.css';
import PreloadReactView from './game/views/doms/reacts/preloads/PreloadReactView.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ReactLenis options={{ lerp: 0.1, duration: 1.5 }} root>
    <PreloadReactView />
    <GameReact />
  </ReactLenis>
);
