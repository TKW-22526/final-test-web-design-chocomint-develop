function renderCatalog(keyword = ''){
  renderProducts('no-screen-list', getFilteredProducts(keyword, 'no-screen'));
  renderProducts('screen-list', getFilteredProducts(keyword, 'screen'));
}

function handleSearch(){
  const searchInput = document.getElementById('product-search');
  const searchForm = document.getElementById('product-search-form');

  if (!searchInput || !searchForm) {
    return;
  }

  const applyFilter = () => renderCatalog(searchInput.value);

  searchInput.addEventListener('input', applyFilter);
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    applyFilter();
  });

  renderCatalog();
}

handleSearch();