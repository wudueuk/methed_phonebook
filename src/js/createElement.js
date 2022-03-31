import image from '../img/icon.svg';

export const createImageLogo = () => {
  const img = document.createElement('img');
  img.src = image;
  return img;
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

  const buttons = params.map(({ className, type, text }) => {
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

// функция создания строки контакта
const createRow = ({ name: firstname, surname, phone }) => {
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

export {
  createHeader,
  createFooter,
  createLogo,
  createMain,
  createTable,
  createForm,
  createButtonsGroup,
  createRow,
};
