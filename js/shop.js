'use strict';


// Export Search product function
export { changePageTitle };
// Export Search product function 

// Import add to cart porduct On page
import { addingProductOnPage } from "./product-on-page.js";
// Import add to cart porduct On page

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

// Filter
var filterParent = document.getElementById('filter');
var productsBoxParent = document.getElementById('productsBoxParent');
if (localStorage.getItem('whatFilterUse') !== null) {
  var setFilter = localStorage.getItem('whatFilterUse');
  var setFilterOnProduct = localStorage.getItem('applyFilterOnProduct');
  filterParent.innerHTML = setFilter;
  productsBoxParent.innerHTML = setFilterOnProduct;

}
var numberFilter = document.getElementById('setNumberOfShow');
var filterNumberChoiseBox = document.getElementById('showNumberBox');

numberFilter.onclick = function (event) {
  event.stopPropagation();
  if (filterNumberChoiseBox.style.display == 'none') {
    filterNumberChoiseBox.style.display = 'flex';
  } else {
    filterNumberChoiseBox.style.display = 'none';
  };
};

var allNumberFilter = document.querySelectorAll('.NumberFilterOption');
var produtsNetwork = document.querySelectorAll('.product-box-network .products__product');
var productList = document.querySelectorAll('.product-box-list .products__product');

function filterNumberEvent() {
  allNumberFilter.forEach(function (item) {
    item.addEventListener('click', function clicknumberFiltreEvent(event) {
      event.stopPropagation();
      filterNumberChoiseBox.style.display = 'none';
      numberFilter.textContent = item.textContent;
      var loadFiles = document.getElementById('fileLoading');
      productsBoxParent.style.display = 'none';
      loadFiles.style.display = 'block';
      item.classList.add('NumberFilterOption');
      filterNumberChoiseBox.insertBefore(item, filterNumberChoiseBox.firstElementChild);
      filterNumberChoiseBox.firstElementChild.removeAttribute('class');
      filterNumberChoiseBox.firstElementChild.removeEventListener('click', clicknumberFiltreEvent)
      var filterSecoundChild = document.querySelector('.filter__filters div div div span:nth-child(2)');
      filterSecoundChild.classList.add('NumberFilterOption');
      allNumberFilter = document.querySelectorAll('.NumberFilterOption');
      var filterDicribtion = document.getElementById('filter__description');
      filterDicribtion.textContent = ` Showing 1-${item.textContent} of 32 results `
      filterNumberEvent();
      var numberFilterValues = [];
      for (var m = 0; m <= allNumberFilter.length - 1; m++) {
        numberFilterValues.push(allNumberFilter[m].textContent);
      };
      numberFilterValues.sort(function (a, b) {
        return b - a;
      });
      for (var e = 0; e <= allNumberFilter.length - 1; e++) {
        allNumberFilter[e].textContent = numberFilterValues[e];
      };
      setTimeout(() => {
        produtsNetwork = document.querySelectorAll('.product-box-network .products__product');
        productList = document.querySelectorAll('.product-box-list .products__product');
        if (produtsNetwork.length - 1 <= Number(item.textContent)) {
          var ProductsBoxsecoundParentNetwork = document.getElementById('secoundProductsParent');
          var ProductsBoxsecoundParentlist = document.getElementById('secoundProductsParentList');
          var productNumber = 0;
          for (var t = produtsNetwork.length - 1; t < Number(item.textContent) - 1; t++) {
            function duplicateProduct(parent) {
              var cloneProduct = produtsNetwork[productNumber].cloneNode(true);
              parent.appendChild(cloneProduct);
              productNumber += 1;
              if (productNumber == 4) {
                productNumber = 0;
              };
            };
            duplicateProduct(ProductsBoxsecoundParentNetwork);
            duplicateProduct(ProductsBoxsecoundParentlist);
          };
        } else {
          for (var i = produtsNetwork.length - 1; i >= Number(item.textContent); i--) {
            produtsNetwork[i].remove();
            productList[i].remove();
          };
        };
        productsBoxParent.style.display = 'block';
        loadFiles.style.display = 'none';
        localStorage.setItem('applyFilterOnProduct', productsBoxParent.innerHTML);
        addingProductOnPage();
      }, 2000);
      localStorage.setItem('whatFilterUse', filterParent.innerHTML);
    });
  });
};
filterNumberEvent();
window.addEventListener('click', function () {
  filterNumberChoiseBox.style.display = 'none';
});
//Showing part
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
  localStorage.setItem('whatFilterUse', filterParent.innerHTML);
  localStorage.setItem('applyFilterOnProduct', productsBoxParent.innerHTML);
};

var listShowing = document.getElementById('listShow');
listShowing.onclick = function () {
  showingByFilter(listBox, newworkBox, '#listShow > img', '#networkShow > img');
  localStorage.setItem('whatFilterUse', filterParent.innerHTML);
  localStorage.setItem('applyFilterOnProduct', productsBoxParent.innerHTML)
};
//Showing part