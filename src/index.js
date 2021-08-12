import countryTpl from './templates/countries.hbs';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';

const refs = {
  input: document.querySelector('#input-id'),
  output: document.querySelector('.country'),
};

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';
defaults.maxTextHeight = null;

// считывание с инпута
refs.input.addEventListener('input', debounce(searchCountry, 500));
// refs.input.addEventListener('input', searchCountry);

function searchCountry(e) {
  const searchQuery = e.target.value;
  console.log(searchQuery);
  fetchCountries(searchQuery).then(data => {
    console.log(data);
    if (data.length > 10) {
      error({
        title: 'Excuse me!!',
        text: 'Too many matches found. Please enter a more specific query!',
        delay: 4000,
      });
      console.log('Too many matches found...');
    } else if (data.length === 1) {
      const countryMarkup = countryTpl(data[0]);
      refs.output.innerHTML = countryMarkup;
    } else {
      const countryMarkup = data.map(country => `<li>${country.name}</li>`).join('');
      refs.output.innerHTML = `<ul class="country__list">${countryMarkup}</ul>`;
    }
  });
}

// вызов отправки из формы
function onSeach(event) {
  const inputValue = event.target.value;

  if (inputValue === '') {
    refs.createMarkupEl.innerHTML = '';
    return;
  }

  send(inputValue);
}

// console.log(fetchCountries(searchQuery));
// console.log(data);
//
// if (refs.body.className === Theme.DARK) {
//   refs.body.className = Theme.LIGHT;
//   localStorage.setItem('theme', Theme.LIGHT);
// } else {
//   refs.body.className = Theme.DARK;
//   localStorage.setItem('theme', Theme.DARK);
// }

// создание и рендер разметки
// const menuMarkup = foodCards.map(card => foodCardTpl(card)).join('');
// console.log(galleryMarkup);

// refs.menu.innerHTML = menuMarkup;
// function fetchCountries(searchQuery) {
//   fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       return data;
//     })
//     .catch(error => {
//       console.log(error);
//     });
