import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

selectEl.hidden = true;

fetchBreeds()
  .then(({ data }) => {
    creatSelect(data);
    loaderEl.hidden = true;
    selectEl.hidden = false;
  })
  .catch(err => {
	Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    loaderEl.hidden = true;
  });

function creatSelect(arr) {
  const markup = arr.map(({ id, name }) => {
    return `<option value=${id}>${name}</option>`;
  });

  selectEl.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
	select: selectEl
 })
}

selectEl.addEventListener('change', onBreedCat);

function onBreedCat(e) {
  const optionValue = e.target.value;

  catInfoEl.hidden = true;
  loaderEl.hidden = false;

  fetchCatByBreed(optionValue)
    .then(cat => {
      creatMarkup(cat.data);
      loaderEl.hidden = true;
      selectEl.hidden = false;
      catInfoEl.hidden = false;
    })
    .catch(err => {
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
      loaderEl.hidden = true;
    });
}

function creatMarkup(arr) {
  const markup = `<div class='content'><img class='img' src=${arr[0].url} alt="cat" width="500" haight="400">
	 <h2>${arr[0].breeds[0].name}</h2> <p>${arr[0].breeds[0].description}</p> <p><b>Temperament:</b>${arr[0].breeds[0].temperament}</p></div>`;

  catInfoEl.innerHTML = markup;
}
