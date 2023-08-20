import axios from 'axios';

const selectEl = document.querySelector('.breed-select');

const API_KEY =
  'live_ ZRswS3nkdpDObPAFELcNEy6P3yBL78 aSLcLEpcvRYiOrKQPwmC2UCVnyeUFT nZbv';
const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

axios.defaults.headers.common['x-api-key'] = API_KEY;

axios(BASE_URL)
  .then(resp => {
    console.log(resp);
    creatSelect(resp.data);
  })
  .catch(error => console.error(resp.status.text));

function creatSelect(arr) {
  const markup = arr.map(({ id, name }) => {
   return `<option value=${id}>${name}</option>`;
  });
  selectEl.insertAdjacentHTML('beforeend', markup);
}
