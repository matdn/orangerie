import { fetchSessionStorage, LANGUAGE_KEY, updateSessionStorage } from './session-storage.js';
import { updateSessionStorageUser } from './user.session-storage.js';
import { Languages } from '../configs/languages';
import schema from '../../public/locales/schema.json';
import i18next from 'i18next';

export const updateLocalLanguage = (languageCode: string) => {
  if (!languageCode) {
    return;
  }

  updateSessionStorage({languageCode}, LANGUAGE_KEY);
  updateSessionStorageUser({
    language: languageCode,
  });
}

export const getSupportedLanguages = () => {
  const isProductionEnv = import.meta.env.VITE_NODE_ENV.includes('production');
  return  isProductionEnv ? schema.activeLanguages : schema.supportedLanguages;
}

export const changeLanguage = (languageCode: string) => {
  if (!languageCode) {
    return;
  }

  const schemaLanguages = getSupportedLanguages();
  const languageList = Languages.filter(language => !language.code || schemaLanguages.includes(language.code));
  if (languageList.find(language => language.code === languageCode)) {
    i18next.changeLanguage(languageCode);
  }
}

export const getBrowserLocalLanguage = () => {
  return (window.navigator.language || '').split('-')[0];
}

export const getDefaultLanguage = () => {
  const sessionLanguage = localStorage.getItem('i18nextLng');
  const {languageCode} = fetchSessionStorage(LANGUAGE_KEY);
  const schemaLanguages = getSupportedLanguages();
  const languageList = Languages.filter(language => !language.code || schemaLanguages.includes(language.code));
  const localLanguage =  languageList.find(item => item.code === (sessionLanguage || languageCode));
  const browserLanguage = languageList.find(item => item.code === getBrowserLocalLanguage());
  const mainLanguage = languageList.find(item => item.code === schema.mainLanguage);
  return localLanguage ?? (browserLanguage ?? mainLanguage);
}

export const getFlagIcon = (country: string) => {
  return `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/1x1/${country}.svg`;
}

