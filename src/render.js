const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const renderTemplate = (container, template, insertPlace) => {
  container.insertAdjacentHTML(insertPlace, template);
};

export {RenderPosition, renderTemplate};
