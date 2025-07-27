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

function addOrRemoveProduct() {
  console.log('worked');
  produtsNetwork = document.querySelectorAll('.product-box-network .products__product');
  productList = document.querySelectorAll('.product-box-list .products__product');

  if (produtsNetwork.length - 1 <= Number(numberFilter.textContent)) {
    var productNumber = 0;
    for (var t = produtsNetwork.length - 1; t < Number(numberFilter.textContent) - 1; t++) {
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
    for (var i = produtsNetwork.length - 1; i >= Number(numberFilter.textContent); i--) {
      console.log(produtsNetwork[i]);

      produtsNetwork[i].remove();
      productList[i].remove();
    };
  };
};

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
var loadFiles = document.getElementById('fileLoading');
var ProductsBoxsecoundParentNetwork = document.getElementById('secoundProductsParent');
var ProductsBoxsecoundParentlist = document.getElementById('secoundProductsParentList');
function filterNumberEvent() {
  allNumberFilter.forEach(function (item) {
    item.addEventListener('click', function clicknumberFiltreEvent(event) {
      event.stopPropagation();
      filterNumberChoiseBox.style.display = 'none';
      numberFilter.textContent = item.textContent;
      productsBoxParent.style.display = 'none';
      loadFiles.style.display = 'block';
      item.classList.add('NumberFilterOption');
      filterNumberChoiseBox.insertBefore(item, filterNumberChoiseBox.firstElementChild);
      filterNumberChoiseBox.firstElementChild.removeAttribute('class');
      filterNumberChoiseBox.firstElementChild.removeEventListener('click', clicknumberFiltreEvent);
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
        addOrRemoveProduct();
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
  mainFilterBox.style.display = 'none';
});

var mainFilter = document.getElementById('FilterEverything');
var mainFilterItem = document.querySelectorAll('.mainFilterItem');
var mainFilterBox = document.getElementById('mainFilterBox');
mainFilter.onclick = function (event) {
  event.stopPropagation();
  if (mainFilterBox.style.display == 'none') {
    mainFilterBox.style.display = 'flex';
  } else {
    mainFilterBox.style.display = 'none';
  };
};

function setEventForMainFilter() {
  mainFilterItem.forEach(function (filterItem) {
    filterItem.addEventListener('click', function clickMainFilter(event) {
      event.stopPropagation();
      mainFilterBox.style.display = 'none';
      productsBoxParent.style.display = 'none';
      loadFiles.style.display = 'block';
      mainFilter.textContent = filterItem.textContent;
      mainFilterBox.insertBefore(filterItem, mainFilterBox.firstElementChild);
      mainFilterBox.firstElementChild.removeAttribute('class');
      mainFilterBox.firstElementChild.removeEventListener('click', clickMainFilter);
      var filterSecoundChild = document.querySelector('.filter__filters div:last-child div div span:nth-child(2)');
      filterSecoundChild.classList.add('mainFilterItem');
      mainFilterItem = document.querySelectorAll('.mainFilterItem');
      setEventForMainFilter();
      if (filterItem.textContent == ' Cheapest ' || filterItem.textContent == ' The most expensive') {
        function priceCompareer(container) {
          var singleProduct = Array.from(container.getElementsByClassName('products__product'));
          var sorting = [...singleProduct].sort((a, b) => {
            var priceA = parseFloat(a.querySelector('.product__caption h6').textContent.replace(/\D+/g, ''));
            var priceB = parseFloat(b.querySelector('.product__caption h6').textContent.replace(/\D+/g, ''));
            return filterItem.textContent.includes('Cheapest') ? priceA - priceB : priceB - priceA;
          });
          sorting.forEach(item => container.insertBefore(item, null));
        };
        priceCompareer(ProductsBoxsecoundParentNetwork);
        priceCompareer(ProductsBoxsecoundParentlist);
      } else if (filterItem.textContent == ' Newest ') {
        var singleProduct = document.querySelectorAll('#secoundProductsParent .products__product');
        var markers = document.getElementsByClassName('product__marker');
        var newsetProducts = [];

        singleProduct.forEach(function (aProduct) {
          var hasMarker = Array.from(markers).some(function (marker) {
            return aProduct.contains(marker);
          });

          if (hasMarker) {
            newsetProducts.push(aProduct);
          }
        });

        newsetProducts.forEach(item => {
          ProductsBoxsecoundParentNetwork.insertBefore(item, ProductsBoxsecoundParentNetwork.firstChild);
        }); console.log(newsetProducts);
      }
      else {
        function changeInnerHtmlAfterSettingFilter(div) {
          div.innerHTML = `

            <div class="products__product">

              <img src="img/product1.png">

              <div class="product__discount">

                <p> -30% </p>

              </div>

              <div class="product__caption">

                <h5 class="product__caption--name"> Syltherine </h5>

                <p class="product__caption--name"> Stylish cafe chair </p>

                <div class="product__price">

                  <h6> Rp 2.500.000 </h6>

                  <del> Rp 3.500.000 </del>

                </div>

              </div>

              <div class="product__hover">

                <div class="product__hover-content">

                  <div class="product__hover-content--button">

                    <button> Add to card </button>

                  </div>

                  <div class="product__hover--img">

                    <div>

                      <img src="img/share.svg">

                      <span> Share </span>

                    </div>

                    <div>

                      <a href="product-comparison.html">

                        <img src="img/compare.svg">

                        <span> Compare </span>

                      </a>

                    </div>

                    <div>

                      <img src="img/heart1.svg">

                      <span> Like </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div class="products__product">

              <img src="img/product2.png">

              <div class="product__caption">

                <h5 class="product__caption--name"> Leviosa </h5>

                <p class="product__caption--name"> Stylish cafe chair </p>

                <h6> Rp 2.500.000 </h6>

              </div>

              <div class="product__hover">

                <div class="product__hover-content">

                  <div class="product__hover-content--button">

                    <button> Add to card </button>

                  </div>

                  <div class="product__hover--img">

                    <div>

                      <img src="img/share.svg">

                      <span> Share </span>

                    </div>

                    <div>

                      <a href="product-comparison.html">

                        <img src="img/compare.svg">

                        <span> Compare </span>

                      </a>

                    </div>

                    <div>

                      <img src="img/heart1.svg">

                      <span> Like </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div class="products__product">

              <img src="img/product3.png">

              <div class="product__discount">

                <p> -50% </p>

              </div>

              <div class="product__caption">

                <h5 class="product__caption--name"> Lolito </h5>

                <p class="product__caption--name"> Luxury big sofa </p>

                <div class="product__price">

                  <h6> Rp 7.000.000 </h6>

                  <del> Rp 14.000.000 </del>

                </div>

              </div>

              <div class="product__hover">

                <div class="product__hover-content">

                  <div class="product__hover-content--button">

                    <button> Add to card </button>

                  </div>

                  <div class="product__hover--img">

                    <div>

                      <img src="img/share.svg">

                      <span> Share </span>

                    </div>

                    <div>

                      <a href="product-comparison.html">

                        <img src="img/compare.svg">

                        <span> Compare </span>

                      </a>

                    </div>

                    <div>

                      <img src="img/heart1.svg">

                      <span> Like </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div class="products__product">

              <img src="img/product4.png">

              <div class="product__marker">

                <p> New </p>

              </div>

              <div class="product__caption">

                <h5 class="product__caption--name"> Respira </h5>

                <p class="product__caption--name"> Outdoor bar table and stool </p>

                <h6> Rp 500.000 </h6>

              </div>

              <div class="product__hover">

                <div class="product__hover-content">

                  <div class="product__hover-content--button">

                    <button> Add to card </button>

                  </div>

                  <div class="product__hover--img">

                    <div>

                      <img src="img/share.svg">

                      <span> Share </span>

                    </div>

                    <div>

                      <a href="product-comparison.html">

                        <img src="img/compare.svg">

                        <span> Compare </span>

                      </a>

                    </div>

                    <div>

                      <img src="img/heart1.svg">

                      <span> Like </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div class="products__product">

              <img src="img/product1.png">

              <div class="product__discount">

                <p> -30% </p>

              </div>

              <div class="product__caption">

                <h5 class="product__caption--name"> Syltherine </h5>

                <p class="product__caption--name"> Stylish cafe chair </p>

                <div class="product__price">

                  <h6> Rp 2.500.000 </h6>

                  <del> Rp 3.500.000 </del>

                </div>

              </div>

              <div class="product__hover">

                <div class="product__hover-content">

                  <div class="product__hover-content--button">

                    <button> Add to card </button>

                  </div>

                  <div class="product__hover--img">

                    <div>

                      <img src="img/share.svg">

                      <span> Share </span>

                    </div>

                    <div>

                      <a href="product-comparison.html">

                        <img src="img/compare.svg">

                        <span> Compare </span>

                      </a>

                    </div>

                    <div>

                      <img src="img/heart1.svg">

                      <span> Like </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div class="products__product">

              <img src="img/product2.png">

              <div class="product__caption">

                <h5 class="product__caption--name"> Leviosa </h5>

                <p class="product__caption--name"> Stylish cafe chair </p>

                <h6> Rp 2.500.000 </h6>

              </div>

              <div class="product__hover">

                <div class="product__hover-content">

                  <div class="product__hover-content--button">

                    <button> Add to card </button>

                  </div>

                  <div class="product__hover--img">

                    <div>

                      <img src="img/share.svg">

                      <span> Share </span>

                    </div>

                    <div>

                      <a href="product-comparison.html">

                        <img src="img/compare.svg">

                        <span> Compare </span>

                      </a>

                    </div>

                    <div>

                      <img src="img/heart1.svg">

                      <span> Like </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div class="products__product">

              <img src="img/product3.png">

              <div class="product__discount">

                <p> -50% </p>

              </div>

              <div class="product__caption">

                <h5 class="product__caption--name"> Lolito </h5>

                <p class="product__caption--name"> Luxury big sofa </p>

                <div class="product__price">

                  <h6> Rp 7.000.000 </h6>

                  <del> Rp 14.000.000 </del>

                </div>

              </div>

              <div class="product__hover">

                <div class="product__hover-content">

                  <div class="product__hover-content--button">

                    <button> Add to card </button>

                  </div>

                  <div class="product__hover--img">

                    <div>

                      <img src="img/share.svg">

                      <span> Share </span>

                    </div>

                    <div>

                      <a href="product-comparison.html">

                        <img src="img/compare.svg">

                        <span> Compare </span>

                      </a>

                    </div>

                    <div>

                      <img src="img/heart1.svg">

                      <span> Like </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div class="products__product">

              <img src="img/product4.png">

              <div class="product__marker">

                <p> New </p>

              </div>

              <div class="product__caption">

                <h5 class="product__caption--name"> Respira </h5>

                <p class="product__caption--name"> Outdoor bar table and stool </p>

                <h6> Rp 500.000 </h6>

              </div>

              <div class="product__hover">

                <div class="product__hover-content">

                  <div class="product__hover-content--button">

                    <button> Add to card </button>

                  </div>

                  <div class="product__hover--img">

                    <div>

                      <img src="img/share.svg">

                      <span> Share </span>

                    </div>

                    <div>

                      <a href="product-comparison.html">

                        <img src="img/compare.svg">

                        <span> Compare </span>

                      </a>

                    </div>

                    <div>

                      <img src="img/heart1.svg">

                      <span> Like </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div class="products__product">

              <img src="img/product1.png">

              <div class="product__discount">

                <p> -30% </p>

              </div>

              <div class="product__caption">

                <h5 class="product__caption--name"> Syltherine </h5>

                <p class="product__caption--name"> Stylish cafe chair </p>

                <div class="product__price">

                  <h6> Rp 2.500.000 </h6>

                  <del> Rp 3.500.000 </del>

                </div>

              </div>

              <div class="product__hover">

                <div class="product__hover-content">

                  <div class="product__hover-content--button">

                    <button> Add to card </button>

                  </div>

                  <div class="product__hover--img">

                    <div>

                      <img src="img/share.svg">

                      <span> Share </span>

                    </div>

                    <div>

                      <a href="product-comparison.html">

                        <img src="img/compare.svg">

                        <span> Compare </span>

                      </a>

                    </div>

                    <div>

                      <img src="img/heart1.svg">

                      <span> Like </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div class="products__product">

              <img src="img/product2.png">

              <div class="product__caption">

                <h5 class="product__caption--name"> Leviosa </h5>

                <p class="product__caption--name"> Stylish cafe chair </p>

                <h6> Rp 2.500.000 </h6>

              </div>

              <div class="product__hover">

                <div class="product__hover-content">

                  <div class="product__hover-content--button">

                    <button> Add to card </button>

                  </div>

                  <div class="product__hover--img">

                    <div>

                      <img src="img/share.svg">

                      <span> Share </span>

                    </div>

                    <div>

                      <a href="product-comparison.html">

                        <img src="img/compare.svg">

                        <span> Compare </span>

                      </a>

                    </div>

                    <div>

                      <img src="img/heart1.svg">

                      <span> Like </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div class="products__product">

              <img src="img/product3.png">

              <div class="product__discount">

                <p> -50% </p>

              </div>

              <div class="product__caption">

                <h5 class="product__caption--name"> Lolito </h5>

                <p class="product__caption--name"> Luxury big sofa </p>

                <div class="product__price">

                  <h6> Rp 7.000.000 </h6>

                  <del> Rp 14.000.000 </del>

                </div>

              </div>

              <div class="product__hover">

                <div class="product__hover-content">

                  <div class="product__hover-content--button">

                    <button> Add to card </button>

                  </div>

                  <div class="product__hover--img">

                    <div>

                      <img src="img/share.svg">

                      <span> Share </span>

                    </div>

                    <div>

                      <a href="product-comparison.html">

                        <img src="img/compare.svg">

                        <span> Compare </span>

                      </a>

                    </div>

                    <div>

                      <img src="img/heart1.svg">

                      <span> Like </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div class="products__product">

              <img src="img/product4.png">

              <div class="product__marker">

                <p> New </p>

              </div>

              <div class="product__caption">

                <h5 class="product__caption--name"> Respira </h5>

                <p class="product__caption--name"> Outdoor bar table and stool </p>

                <h6> Rp 500.000 </h6>

              </div>

              <div class="product__hover">

                <div class="product__hover-content">

                  <div class="product__hover-content--button">

                    <button> Add to card </button>

                  </div>

                  <div class="product__hover--img">

                    <div>

                      <img src="img/share.svg">

                      <span> Share </span>

                    </div>

                    <div>

                      <a href="product-comparison.html">

                        <img src="img/compare.svg">

                        <span> Compare </span>

                      </a>

                    </div>

                    <div>

                      <img src="img/heart1.svg">

                      <span> Like </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div class="products__product">

              <img src="img/product1.png">

              <div class="product__discount">

                <p> -30% </p>

              </div>

              <div class="product__caption">

                <h5 class="product__caption--name"> Syltherine </h5>

                <p class="product__caption--name"> Stylish cafe chair </p>

                <div class="product__price">

                  <h6> Rp 2.500.000 </h6>

                  <del> Rp 3.500.000 </del>

                </div>

              </div>

              <div class="product__hover">

                <div class="product__hover-content">

                  <div class="product__hover-content--button">

                    <button> Add to card </button>

                  </div>

                  <div class="product__hover--img">

                    <div>

                      <img src="img/share.svg">

                      <span> Share </span>

                    </div>

                    <div>

                      <a href="product-comparison.html">

                        <img src="img/compare.svg">

                        <span> Compare </span>

                      </a>

                    </div>

                    <div>

                      <img src="img/heart1.svg">

                      <span> Like </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div class="products__product">

              <img src="img/product2.png">

              <div class="product__caption">

                <h5 class="product__caption--name"> Leviosa </h5>

                <p class="product__caption--name"> Stylish cafe chair </p>

                <h6> Rp 2.500.000 </h6>

              </div>

              <div class="product__hover">

                <div class="product__hover-content">

                  <div class="product__hover-content--button">

                    <button> Add to card </button>

                  </div>

                  <div class="product__hover--img">

                    <div>

                      <img src="img/share.svg">

                      <span> Share </span>

                    </div>

                    <div>

                      <a href="product-comparison.html">

                        <img src="img/compare.svg">

                        <span> Compare </span>

                      </a>

                    </div>

                    <div>

                      <img src="img/heart1.svg">

                      <span> Like </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div class="products__product">

              <img src="img/product3.png">

              <div class="product__discount">

                <p> -50% </p>

              </div>

              <div class="product__caption">

                <h5 class="product__caption--name"> Lolito </h5>

                <p class="product__caption--name"> Luxury big sofa </p>

                <div class="product__price">

                  <h6> Rp 7.000.000 </h6>

                  <del> Rp 14.000.000 </del>

                </div>

              </div>

              <div class="product__hover">

                <div class="product__hover-content">

                  <div class="product__hover-content--button">

                    <button> Add to card </button>

                  </div>

                  <div class="product__hover--img">

                    <div>

                      <img src="img/share.svg">

                      <span> Share </span>

                    </div>

                    <div>

                      <a href="product-comparison.html">

                        <img src="img/compare.svg">

                        <span> Compare </span>

                      </a>

                    </div>

                    <div>

                      <img src="img/heart1.svg">

                      <span> Like </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div class="products__product">

              <img src="img/product4.png">

              <div class="product__marker">

                <p> New </p>

              </div>

              <div class="product__caption">

                <h5 class="product__caption--name"> Respira </h5>

                <p class="product__caption--name"> Outdoor bar table and stool </p>

                <h6> Rp 500.000 </h6>

              </div>

              <div class="product__hover">

                <div class="product__hover-content">

                  <div class="product__hover-content--button">

                    <button> Add to card </button>

                  </div>

                  <div class="product__hover--img">

                    <div>

                      <img src="img/share.svg">

                      <span> Share </span>

                    </div>

                    <div>

                      <a href="product-comparison.html">

                        <img src="img/compare.svg">

                        <span> Compare </span>

                      </a>

                    </div>

                    <div>

                      <img src="img/heart1.svg">

                      <span> Like </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>`;
        };
        changeInnerHtmlAfterSettingFilter(ProductsBoxsecoundParentNetwork);
        changeInnerHtmlAfterSettingFilter(ProductsBoxsecoundParentlist);
        addingProductOnPage();
        addOrRemoveProduct();
      };
      localStorage.setItem('whatFilterUse', filterParent.innerHTML);
      localStorage.setItem('applyFilterOnProduct', productsBoxParent.innerHTML);
      setTimeout(() => {
        productsBoxParent.style.display = 'block';
        loadFiles.style.display = 'none';
      }, 2000);
    });
  });
};
setEventForMainFilter();

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
  localStorage.setItem('applyFilterOnProduct', productsBoxParent.innerHTML);
};
//Showing part