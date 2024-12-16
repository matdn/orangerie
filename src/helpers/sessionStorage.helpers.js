// Local storage
export const fetchData = (key) => {
  return JSON.parse(sessionStorage.getItem(key));
};
