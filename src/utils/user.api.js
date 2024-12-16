import {
  API_AUTH_SIGN_UP,
  API_USERS_KEEP_ALIVE,
  API_USERS_ME,
  API_USERS_PROGRESS,
  API_USERS_READY,
} from '../constants/common.constant';
import { callApiGet, callApiPatch, callApiPost, callApiPut } from '../helpers/api.helpers';
import { leaveRoom } from "./room.api.js";
import { fetchSessionStorageRoom, fetchSessionStorageRoomUser } from "./room.session-storage.js";
import { roomStatus } from "../constants/room.constant";
import { getAppUrl, normalizeUsername, randomString, setAuthenticated } from '../helpers/common.helpers';
import { cleanAppSessionStorage } from "./session-storage";
import { isScorm } from "../helpers/scorm.helper";
import { fetchSessionStorageUser, updateSessionStorageUser } from './user.session-storage';
import { fetchSessionStorageConfig } from './app-config.session-storage';

export const keepUserAlive = async () => {
  const user = fetchSessionStorageRoomUser();

  if (user?.status !== roomStatus.PLAYING) {
    return false;
  }

  const apiUrl = (import.meta.env.VITE_API_URL + API_USERS_KEEP_ALIVE).replace(':id', user.userId);

  for (let i = 0; i < 3; i++) {
    const { data } = await callApiPost(apiUrl);
    if (data) {
      return true;
    }
  }

  return false;
}

export const signUp = async (payload) => {
  const apiUrl = import.meta.env.VITE_API_URL + API_AUTH_SIGN_UP;

  const options = {
    body: JSON.stringify(payload),
  };

  const {data, error, isLoading} =  await callApiPost(apiUrl, options);

  if (error) {
    return {error, isLoading};
  }

  const { refreshToken, token } = data;
  updateSessionStorageUser({
    refreshToken,
    token,
  });

  setAuthenticated(true);

  return {data, error, isLoading}
};

export const silentSignUp = async () => {
  const gameConfig = fetchSessionStorageConfig();
  const randomName = randomString();
  let name = randomName;
  let username = randomName;
  let email = `${randomName}@emeraude.games`;

  const {searchParams} = new URL(window.location.href);
  const [ userid, userId, externalid, fullname] = [
    searchParams.get('userid'),
    searchParams.get('userId'),
    searchParams.get('externalid'),
    searchParams.get('fullname'),
  ];

  let userIdFromParams = userid || userId || externalid;

  if (userIdFromParams?.includes('@')) {
    userIdFromParams = userIdFromParams?.split('@')[0];
  }

  if (fullname) {
    username = fullname;
    name = fullname;
  }

  if (userIdFromParams) {
    email = `${userIdFromParams}@emeraude.games`;
  }

  if (isScorm()) {
    const scormData = globalThis.app.scorm;
    name = scormData.learnerName
    username = scormData.learnerId;
    email = `${scormData.learnerId}@emeraude.games`;
    if (scormData.learnerId?.includes('@')) {
      email = scormData.learnerId;
      username = (scormData.learnerId || '').split('@')[0];
    }
  } else if (gameConfig.defaultSignUpEmailSuffix) {
    if (userIdFromParams) {
      username = userIdFromParams;
      name = fullname || userIdFromParams;
      email = `${userIdFromParams}${gameConfig.defaultSignUpEmailSuffix}`;
    } else {
      username = randomName;
      name = randomName;
      email = `${randomName}${gameConfig.defaultSignUpEmailSuffix}`;
    }
  }

  const payload = {
    username: normalizeUsername(username),
    name,
    email,
    isConsent: true,
  };

  const { data, error } = await signUp(payload);
  if (error) {
    return false;
  }

  const { refreshToken, token } = data;
  updateSessionStorageUser({
    refreshToken,
    token,
  });

  setAuthenticated(true);

  return true;
}

export const updateUserProfile = async (payload) => {
  const apiUrl = import.meta.env.VITE_API_URL + API_USERS_ME;
  const options = {
    body: JSON.stringify(payload),
  };

  const { data, error, isLoading } = await callApiPatch(apiUrl, options);

  if (error?.status === 401 || error?.status === 403) {
    cleanAppSessionStorage();
    window.location.href = getAppUrl('start');
    return { data, error, isLoading };
  }

  if (data) {
    updateSessionStorageUser(payload);
  }

  return { data, error, isLoading };
};

export const getCurrentUser = async () => {
  const apiUrl = import.meta.env.VITE_API_URL + API_USERS_ME;

  const { data, error, isLoading } = await callApiGet(apiUrl);

  if (data) {
    updateSessionStorageUser(data);
  }

  if (isScorm()) {
    const scorm = globalThis.app?.scorm;
    if (scorm) {
      scorm.setSuspendData('user', data);
    }
  }

  return { data, error, isLoading };
};

export const setStatus = async (id, payload) => {
  const apiUrl = import.meta.env.VITE_API_URL + API_USERS_READY.replace(':id', id);

  const options = {
    body: JSON.stringify(payload),
  };

  return callApiPut(apiUrl, options);
};

export const updateUserProgress = async (payload) => {
  const userId = fetchSessionStorageUser()._id;
  const apiUrl = import.meta.env.VITE_API_URL + API_USERS_PROGRESS.replace(':id', userId);

  const options = {
    body: JSON.stringify(payload),
  };

  const {data, error, isLoading} = await callApiPost(apiUrl, options);

  return {data, error, isLoading};
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setUserCompleted = async (id) => {
  const requestBody = {
    "scene": "FINAL_SCENE",
    "element": "FINAL_SCENE_ELEMENT",
  };
  return updateUserProgress(requestBody)
};

export const setUserTimeOut = async () => {
  const room = fetchSessionStorageRoom();
  return leaveRoom(room._id, false);
};
