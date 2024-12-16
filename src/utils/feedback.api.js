import { API_FEEDBACKS } from '../constants/common.constant';
import { callApiPost } from '../helpers/api.helpers';

export const sendFeedback = async (payload) => {
  let apiUrl = import.meta.env.VITE_API_URL + API_FEEDBACKS;
  const options = {
    body: JSON.stringify(payload),
  };

  return callApiPost(apiUrl, options);
};
