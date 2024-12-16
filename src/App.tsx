import './App.scss';
import { RouterProvider, } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppLoading } from './components/customUI/appLoading/AppLoading.tsx';
import './helpers/storyblok.helpers';
import './i18n';
import router from './routes/routes';

// Providers
import AppStateProvider from './state';
const GameApp = () => {
  return <RouterProvider router={router} />;
};

const AppContainer = () => {
  return (
    <AppStateProvider>
      <GameApp />
      <ToastContainer />
    </AppStateProvider>
  );
}

export default function App() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  globalThis.app = {}
  return (
    <div className="App">
      <AppLoading />

      <AppContainer />
    </div>
  );
}
