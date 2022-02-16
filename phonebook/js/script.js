import data from './modules/data.js';
import * as renderElements from './modules/render.js';
import sortPhonebook from './modules/sort.js';
import {
  deleteControl,
  formControl,
  modalControl,
  hoverRow,
} from './modules/control.js';
import {getStorage} from './modules/storage.js';

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      list,
      logo,
      btnAdd,
      btnDel,
      formOverlay,
      form,
    } = renderElements.renderPhonebook(app, title);

    // ----- Функционал -----
    // получение списка контактов из localStorage
    const phonebookStorage = JSON.parse(getStorage('phonebook'));
    if (phonebookStorage) data.push(...phonebookStorage);

    // вывод списка контактов
    const allRow = renderElements.renderContacts(list, data);

    const {closeModal} = modalControl(btnAdd, formOverlay);

    // Изменение шапки при наведении на контакт
    hoverRow(allRow, logo);

    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    // сортировка телефонного списка
    const tableTitle = document.querySelector('.tableTitle');
    tableTitle.addEventListener('click', e => {
      const target = e.target;

      if (target.className === 'titleName') {
        sortPhonebook('name');
      }
      if (target.className === 'titleSurname') {
        sortPhonebook('surname');
      }
      const tbody = document.querySelector('tbody');
      tbody.textContent = '';
      renderElements.renderContacts(list, data);
    });
  };

  window.phonebookInit = init;
}
