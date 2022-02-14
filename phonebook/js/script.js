'use strict';

// массив для телефонной книги
const data = [];

{
  // ---- Урок 8 ----
  // получение контакта из localStorage
  const getStorage = key => localStorage.getItem(key);

  // Запись контакта в localStorage
  const setStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // удаление контакта из localStorage
  const removeStorage = tel => {
    localStorage.removeItem(tel);
  };

  // добавление контакта в книгу (массив и localStorage)
  const addContactData = contact => {
    data.push(contact);
    setStorage(contact.phone, contact);
  };

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footerContainer.textContent = 'Все права защищены ©Эдуард';
    footer.append(footerContainer);

    footer.footerContainer = footerContainer;

    return footer;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const buttons = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.className = className;
      button.textContent = text;

      return button;
    });

    btnWrapper.append(...buttons);

    return {
      btnWrapper,
      buttons,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr class="tableTitle">
        <td class="delete">Удалить</td>
        <td class="titleName">Имя</td>
        <td class="titleSurname">Фамилия</td>
        <td class="titlePhone">Телефон</td>
        <td></td>
      </tr>
    `);

    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" type="text" name="name"
          id="name" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" type="text" name="surname"
          id="surname" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" type="number" name="phone"
          id="phone" required>
      </div>
    `);

    const buttonsGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonsGroup.buttons);

    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const renderPhonebook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const footer = createFooter();
    const buttonsGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();

    const {form, overlay} = createForm();

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonsGroup.btnWrapper, table, overlay);

    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonsGroup.buttons[0],
      btnDel: buttonsGroup.buttons[1],
      formOverlay: overlay,
      form,
    };
  };

  // функция создания строки контакта
  const createRow = ({name: firstname, surname, phone}) => {
    const row = document.createElement('tr');
    row.classList.add('contact');
    row.dataset.tel = phone;

    const columnDelete = document.createElement('td');
    columnDelete.classList.add('delete', 'align-middle');
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('del-icon');
    columnDelete.append(btnDelete);

    const columnName = document.createElement('td');
    columnName.classList.add('align-middle');
    columnName.textContent = firstname;

    const columnSurname = document.createElement('td');
    columnSurname.classList.add('align-middle');
    columnSurname.textContent = surname;

    const columnPhone = document.createElement('td');
    columnPhone.classList.add('align-middle');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    row.phoneLink = phoneLink;
    columnPhone.append(phoneLink);

    const columnEdit = document.createElement('td');
    columnEdit.classList.add('align-middle');
    const btnEdit = document.createElement('button');
    btnEdit.classList.add('btn', 'btn-success');
    btnEdit.textContent = 'Редактировать';
    columnEdit.append(btnEdit);

    row.append(columnDelete, columnName, columnSurname, columnPhone,
        columnEdit);

    return row;
  };

  // Формирует и выводит строки телефонной книги
  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);

    return allRow;
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

  // сортировка телефонного списка
  const sortPhonebook = param => {
    console.log('param: ', param);
    if (param === 'name') {
      data.sort((a, b) => (a.name > b.name ? 1 : -1));
    }
    if (param === 'surname') {
      data.sort((a, b) => (a.surname > b.surname ? 1 : -1));
    }
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
        data.splice(data.findIndex(elem =>
          elem.phone === tel), 1);
        target.closest('.contact').remove();
      }
    });
  };

  // функция добавления нового контакта на страницу
  const addContactPage = (contact, list) => {
    list.append(createRow(contact));
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

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      list,
      logo,
      btnAdd,
      btnDel,
      formOverlay,
      form,
    } = renderPhonebook(app, title);

    // ----- Функционал -----
    // получение списка контактов из localStorage
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== 'sort') {
          data.push(JSON.parse(getStorage(key)));
        }
      }

      if (getStorage('sort')) {
        sortPhonebook(JSON.parse(getStorage('sort')));
      }
    } else console.error('phonebook is empty');

    // вывод списка контактов
    const allRow = renderContacts(list, data);

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
        setStorage('sort', 'name');
      }
      if (target.className === 'titleSurname') {
        sortPhonebook('surname');
        setStorage('sort', 'surname');
      }
      const tbody = document.querySelector('tbody');
      tbody.textContent = '';
      renderContacts(list, data);
    });
  };

  window.phonebookInit = init;
}
