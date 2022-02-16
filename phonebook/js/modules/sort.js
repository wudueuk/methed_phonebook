import data from './data.js';
import {setStorage} from './storage.js';

// сортировка телефонного списка
const sortPhonebook = param => {
  if (param === 'name') {
    data.sort((a, b) => (a.name > b.name ? 1 : -1));
    setStorage('phonebook', JSON.stringify(data));
  }
  if (param === 'surname') {
    data.sort((a, b) => (a.surname > b.surname ? 1 : -1));
    setStorage('phonebook', JSON.stringify(data));
  }
};

export default sortPhonebook;
