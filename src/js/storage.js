import data from './data';

// получение контакта из localStorage
export const getStorage = key => localStorage.getItem(key);

// Запись в localStorage
export const setStorage = (key, value) => {
  localStorage.setItem(key, value);
};

// удаление контакта из localStorage
export const removeStorage = tel => {
  data.splice(data.findIndex(elem =>
    elem.phone === tel), 1);

  setStorage('phonebook', JSON.stringify(data));
};
