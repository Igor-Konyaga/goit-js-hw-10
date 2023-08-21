import axios from 'axios';

const API_KEY =
  'live_ZRswS3nkdpDObPAFELcNEy6P3yBL78aSLcLEpcvRYiOrKQPwmC2UCVnyeUFTnZbv';
const BASE_URL = 'https://api.thecatapi.com/v1/';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  return axios(`${BASE_URL}breeds`);
}

export function fetchCatByBreed(breedId) {
  return axios(`${BASE_URL}images/search?breed_ids=${breedId}`);
}
