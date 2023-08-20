import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');

fetchBreeds()
  .then(({ data }) => creatSelect(data))
  .catch(err => console.error(err));

function creatSelect(arr) {
  const markup = arr.map(({ id, name }) => {
    return `<option value=${id}>${name}</option>`;
  });
  selectEl.insertAdjacentHTML('beforeend', markup);
}

selectEl.addEventListener('change', onBreedCat);

function onBreedCat(e) {
  const optionValue = e.target.value;

  fetchCatByBreed(optionValue)
    .then(cat => creatMarcupImg(cat.data))
    .catch(err => console.error(err));
}

function creatMarcupImg(arr) {
  const markup = arr.map(({url}) => {
    return `<img src=${url} alt="cat" width="500" haight="400">`;
  });
  catInfoEl.innerHTML = markup;
}
