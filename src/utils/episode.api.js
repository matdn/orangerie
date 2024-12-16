import { API_EPISODES } from '../constants/common.constant';
import { callApiGet } from '../helpers/api.helpers';

export const getEpisodes = async () => {
  let apiUrl = import.meta.env.VITE_API_URL + API_EPISODES;
  return callApiGet(apiUrl);
};
