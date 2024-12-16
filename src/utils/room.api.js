import {
  API_ROOMS,
  API_ROOMS_JOIN,
  API_ROOMS_LEAVE,
  API_ROOMS_ONLINE,
  API_ROOMS_START,
  GAME_HOST,
} from '../constants/common.constant';
import { callApiGet, callApiPost } from '../helpers/api.helpers';
import { roomUserStatus } from "../constants/room.constant";
import { updateSessionStorageRoom } from './room.session-storage';
import { updateSessionStorageUser } from './user.session-storage';

export const createRoom = async (payload) => {
  const apiUrl = import.meta.env.VITE_API_URL + API_ROOMS;

  let customData = payload?.customData || {};

  const origin = import.meta.env.VITE_ORIGIN;
  const gameName = import.meta.env.VITE_GAME_TITLE;

  if (origin) {
    customData = { ...customData, origin }
  }

  const options = {
    body: JSON.stringify({
      host: sessionStorage.getItem(GAME_HOST) || undefined,
      sourceName: origin,
      isRandom: false,
      gameName,
      ...payload,
      customData,
    }),
  };
  const { data, error, isLoading } = await callApiPost(apiUrl, options);
  updateSessionStorageRoom(data);
  updateSessionStorageUser({currentRoomId: data?._id || null});

  return { data, error, isLoading };
};

export const startRoom = async (id) => {
  const apiUrl = import.meta.env.VITE_API_URL + API_ROOMS_START.replace(':id', id);

  return callApiPost(apiUrl);
}


export const getRoomOnlineUsers = async (id, threshold = 120) => {
  const apiUrl = `${import.meta.env.VITE_API_URL}${API_ROOMS_ONLINE.replace(':id', id)}?threshold=${threshold}`;

  return callApiGet(apiUrl);
}

export const getRooms = async (query) => {
  let apiUrl = import.meta.env.VITE_API_URL + API_ROOMS;
  if (query) {
    const urlQuery = new URLSearchParams(query);
    apiUrl = `${apiUrl}?${urlQuery.toString()}`;
  }

  return callApiGet(apiUrl);
};

export const getRoomByName = async (name) => {
  const query = {
    name,
  };

  const { data = [], ...rest } = await getRooms(query);
  const [room] = data;
  return Promise.resolve({ data: room, ...rest });
};

export const getRoomById = async (id) => {
  const apiUrl = import.meta.env.VITE_API_URL + API_ROOMS + `/${id}`;
  return callApiGet(apiUrl)
    .then((data) => {
      updateSessionStorageRoom(data);
      updateSessionStorageUser({currentRoomId: data?._id || null});
      const scorm = globalThis.app?.scorm;
      if (scorm) {
        scorm.setSuspendData('room', data);
      }
      return data;
    });
};

export const joinRoom = async (id) => {
  const apiUrl = import.meta.env.VITE_API_URL + API_ROOMS_JOIN;
  const options = {
    body: JSON.stringify({
      roomId: id,
    }),
  };

  return callApiPost(apiUrl, options);
};

export const leaveRoom = async (id, isLeaving = true) => {
  const apiUrl = import.meta.env.VITE_API_URL + API_ROOMS_LEAVE.replace(':id', id);

  const options = {
    body: JSON.stringify({
      status: isLeaving ? roomUserStatus.LEAVE : roomUserStatus.TIMEOUT,
    })
  };

  return callApiPost(apiUrl, options);
};
