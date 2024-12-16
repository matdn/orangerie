import { fetchData } from '../helpers/sessionStorage.helpers';

export const defaultKey = 'GameApp-user';

export const fetchSessionStorageUser = (key = defaultKey) => {
  return fetchData(key) || {};
};

export const removeSessionStorageUser = (key = defaultKey) => {
  sessionStorage.removeItem(key);
};

export const removeSessionStorageUserKeys = (keys) => {
  const currentData = fetchSessionStorageUser();
  keys.forEach((key) => {
    if (currentData[key]) {
      delete currentData.key;
    }
  })

  sessionStorage.setItem(defaultKey, JSON.stringify(currentData));
}


export const updateSessionStorageUser = (updateData, key = defaultKey) => {
  const currentData = fetchSessionStorageUser(key);
  const newData = {
    ...currentData,
    ...updateData,
  };
  sessionStorage.setItem(key, JSON.stringify(newData));
};
