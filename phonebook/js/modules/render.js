import {
  createHeader,
  createFooter,
  createLogo,
  createMain,
  createTable,
  createForm,
  createButtonsGroup,
  createRow,
} from './createElement.js';

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

// Формирует и выводит строки телефонной книги
const renderContacts = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);

  return allRow;
};

export {
  renderPhonebook,
  renderContacts,
};
