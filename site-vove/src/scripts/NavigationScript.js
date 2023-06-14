function navigationScript() {
  const pageLinks = document.querySelectorAll('.page-link');

  const handleClick = (event) => {
    const clickedLink = event.target;
    pageLinks.forEach(link => {
      if (link === clickedLink) {
        link.classList.add('selected');
      } else {
        link.classList.remove('selected');
      }
    });
  };

  pageLinks.forEach(link => {
    link.addEventListener('click', handleClick);
  });

  // Remover os ouvintes de evento quando necessário
  const removeEventListeners = () => {
    pageLinks.forEach(link => {
      link.removeEventListener('click', handleClick);
    });
  };

  // Expor a função para uso externo, se necessário
  return {
    removeEventListeners
  };
}

export default navigationScript;
