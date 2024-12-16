import {removeSessionStorageRoom} from "./room.session-storage";
import {removeSessionStorageUser} from "./user.session-storage";
import { fetchData } from '../helpers/sessionStorage.helpers';

export const LANGUAGE_KEY = 'GameApp-language';

export const fetchSessionStorage = (key) => {
  return fetchData(key) || {};
};

export const removeSessionStorage = (key) => {
  sessionStorage.removeItem(key);
};

export const updateSessionStorage= (updateData, key) => {
  const currentData = fetchSessionStorage(key);
  const newData = {
    ...currentData,
    ...updateData,
  };
  sessionStorage.setItem(key, JSON.stringify(newData));
};

export const cleanAppSessionStorage = () => {
  removeSessionStorageRoom();
  removeSessionStorageUser();
  sessionStorage.setItem('GameApp-isAuthenticated', String(false));
}
