import {
  API_PUBLIC_RANKING,
  API_RANKING,
  API_SCORES_CATEGORIES,
  API_SCORES_ROOMS,
  API_SCORES_USERS,
  API_SCORES_USERS_GROUPED,
} from '../constants/common.constant';
import { scoreOptions } from '../constants/score.constant';
import { callApiGet } from '../helpers/api.helpers';

export const getRanking = async (query) => {
  let apiUrl = import.meta.env.VITE_API_URL + API_RANKING;
  if (query) {
    const urlQuery = new URLSearchParams(query);
    apiUrl = `${apiUrl}?${urlQuery.toString()}`;
  }

  return callApiGet(apiUrl);
}

export const getTop5Ranking = async (type) => {
  const apiUrl = `${import.meta.env.VITE_API_URL + API_PUBLIC_RANKING}?${new URLSearchParams({type})}`;

  return callApiGet(apiUrl);
}

export const getScoresUsers = async (query) => {
  let apiUrl = import.meta.env.VITE_API_URL + API_SCORES_USERS;
  if (query) {
    const urlQuery = new URLSearchParams(query);
    apiUrl = `${apiUrl}?${urlQuery.toString()}`;
  }

  return callApiGet(apiUrl);
};

export const getScoresUsersGrouped = async (query) => {
  let apiUrl = import.meta.env.VITE_API_URL + API_SCORES_USERS_GROUPED;
  if (query) {
    const urlQuery = new URLSearchParams(query);
    apiUrl = `${apiUrl}?${urlQuery.toString()}`;
  }

  return callApiGet(apiUrl);
};

export const getScoresByUserId = async (userId, option = scoreOptions.LATEST) => {
  return getScoresUsers({ userId, option });
};

export const getScoresRooms = async (query) => {
  let apiUrl = import.meta.env.VITE_API_URL + API_SCORES_ROOMS;
  if (query) {
    const urlQuery = new URLSearchParams(query);
    apiUrl = `${apiUrl}?${urlQuery.toString()}`;
  }

  return callApiGet(apiUrl);
};

export const getScoresByRoomId = async (roomId, options) => {
  return getScoresRooms({ roomId, format: "JSON", ...options });
};

export const getScoresCategories = async () => {
  let apiUrl = import.meta.env.VITE_API_URL + API_SCORES_CATEGORIES;

  return callApiGet(apiUrl);
};
