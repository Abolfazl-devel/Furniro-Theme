'use strict';
// Export Search product function
export { changePageTitle };
// Export Search product function 

// Open page with search code

function changePageTitle() {
  var produtsName = document.querySelectorAll('.product__caption--name');
  var whatSerach = sessionStorage.getItem('clientSearch');
  var pageTitle = document.getElementsByTagName('title');
  pageTitle.textContent = `Searching for ${whatSerach}`;

  var titleOnpage = document.getElementById('pageTitle');
  titleOnpage.textContent = `Searching for ${whatSerach}`;

  var pagePath = document.getElementById('pagePath');
  pagePath.textContent = whatSerach;
  produtsName.forEach(function (t) {
    if (t.textContent.toLocaleLowerCase().search(whatSerach) == -1) {
      t.parentElement.parentElement.style.display = 'none';
    } else {
      t.parentElement.parentElement.style.display = 'block';
    };
  });
};
window.addEventListener('load', function () {
  if (sessionStorage.getItem('clientSearch') !== null) {
    changePageTitle();
  };
});