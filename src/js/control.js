import data from './data';
import { removeStorage, setStorage } from './storage';
import { createRow } from './createElement';

// Функция удаления контакта
const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.del-icon')) {
      const tel = target.closest('.contact').dataset.tel;
      removeStorage(tel);
      target.closest('.contact').remove();
    }
  });
};

// функция добавления нового контакта на страницу
const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

// добавление контакта в книгу (массив и localStorage)
const addContactData = contact => {
  data.push(contact);
  setStorage('phonebook', JSON.stringify(data));
};

// форма добавления нового контакта
const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);

    addContactPage(newContact, list);
    addContactData(newContact);

    form.reset();
    closeModal();
  });
};

// функция смены шапки телефонного списка
const hoverRow = (allRow, logo) => {
  const text = logo.textContent;

  allRow.forEach(contact => {
    contact.addEventListener('mouseover', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay || target.closest('.close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

export {
  deleteControl,
  formControl,
  modalControl,
  hoverRow,
  addContactData,
};
