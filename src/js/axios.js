import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/';
const API_KEY = '29860277-84021bf85cd78542af410165f';

export default async function requestAxios(query, page, perPage) {
  axios.defaults.params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page: page,
  };
  const response = await axios.get(`api/`);
  const data = await response.data;
  return data;
}
