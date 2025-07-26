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

var networkShowing = document.getElementById('networkShow');
var newworkBox = document.getElementById('product-box-network');
var listBox = document.getElementById('product-box-list');
function showingByFilter(div1, div2, divImg1, divImg2) {
  div1.style.display = 'block';
  div2.style.display = 'none';
  div1.disabled = true;
  div2.disabled = false;
  var img1 = document.querySelector(divImg1);
  var img2 = document.querySelector(divImg2);
  img1.style.filter = 'brightness(0) saturate(100%) invert(45%) sepia(0%) saturate(1074%) hue-rotate(254deg) brightness(97%) contrast(83%)';
  img2.removeAttribute('style');
}
networkShowing.onclick = function () {
  showingByFilter(newworkBox, listBox, '#networkShow > img', '#listShow > img');
};

var listShowing = document.getElementById('listShow');
listShowing.onclick = function () {
  showingByFilter(listBox, newworkBox, '#listShow > img', '#networkShow > img');
};  