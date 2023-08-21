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
    .then(cat => creatMarkup(cat.data))
    .catch(err => console.error(err));
}

function creatMarkup(arr) {
  const markup = `<img src=${arr[0].url} alt="cat" width="500" haight="400">
	 <h2>${arr[0].breeds[0].name}</h2> <p>${arr[0].breeds[0].description}</p> <p>Temperament: ${arr[0].breeds[0].temperament}</p>`;

  catInfoEl.innerHTML = markup;
}
