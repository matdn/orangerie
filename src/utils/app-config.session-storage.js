import { fetchData } from '../helpers/sessionStorage.helpers';

export const defaultKey = 'GameApp-config';
export const STYLES = 'GameApp-styles';

export const fetchSessionStorageConfig = (key = defaultKey) => {
  return fetchData(key) || {};
};


export const updateSessionStorageConfig = (updateData, key = defaultKey) => {
  const currentData = fetchSessionStorageConfig(key);
  const newData = {
    ...currentData,
    ...updateData,
  };
  sessionStorage.setItem(key, JSON.stringify(newData));
};
