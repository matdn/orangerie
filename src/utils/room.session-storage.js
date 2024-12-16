import { fetchData } from '../helpers/sessionStorage.helpers';
import { fetchSessionStorageUser } from "./user.session-storage";

export const defaultKey = 'GameApp-room';

export const fetchSessionStorageRoom = (key = defaultKey) => {
  return fetchData(key) || {};
};

export const fetchSessionStorageRoomUser = ()  => {
  const user = fetchSessionStorageUser();
  const room = fetchSessionStorageRoom();

  return (room?.users || []).find(_user => _user.userId === user._id) || {};
}

export const removeSessionStorageRoom = (key = defaultKey) => {
  sessionStorage.removeItem(key);
};

export const updateSessionStorageRoom = (updateData, key = defaultKey) => {
  const currentData = fetchSessionStorageRoom(key);
  const newData = {
    ...currentData,
    ...updateData,
  };
  sessionStorage.setItem(key, JSON.stringify(newData));
};
