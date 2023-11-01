/* eslint-disable func-names */
/* eslint-disable no-shadow */
document.addEventListener('DOMContentLoaded', () => {
  // Encontrar todos os elementos com a classe 'tm-paging-link'
  const pagingLinks = document.querySelectorAll('.tm-paging-link');

  // Adicionar um ouvinte de clique a cada elemento
  pagingLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      // Obter o texto da página
      const page = this.textContent.toLowerCase();

      // Esconder todas as páginas da galeria
      const galleryPages = document.querySelectorAll('.tm-gallery-page');
      galleryPages.forEach((page) => {
        page.classList.add('hidden');
      });

      // Mostrar a página da galeria correspondente à página selecionada
      const selectedGalleryPage = document.getElementById(
        `tm-gallery-page-${page}`
      );
      if (selectedGalleryPage) {
        selectedGalleryPage.classList.remove('hidden');
      }

      // Remover a classe 'active' de todos os links de paginação
      pagingLinks.forEach((link) => {
        link.classList.remove('active');
      });

      // Adicionar a classe 'active' ao link de página atual
      this.classList.add('active');
    });
  });
});
