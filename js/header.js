'use strict';

// Search search product function
import { changePageTitle } from "./shop.js";

//import subtotal calculator
import { subtotalCalculator, calcutionSubtotal, calcutionSubtotalStep2 } from "./subtotal-calculator.js";
//import subtotal calculator

//import show the empty cart function
import { displayEmptyCard } from "./empty-cart.js";
//import show the empty cart function

// pop up and menu's background
var backdrop = document.getElementById('backdrop');
// pop up and menu's background

// header parent
var headerParent = document.getElementById('headerParent');
// header parent

// moblie menu
var moblieMenuBut = document.getElementById('header__mobile-menu-img');
var menu = document.getElementById('header__menu');

function closePopup() {
  menu.style.left = '-521px';
  menu.style.zIndex = '3';
  backdrop.style.display = 'none';
  profile.style.display = 'none';
  searchBox.style.top = '-658px';
  document.body.style.removeProperty('overflow');
  wishlist.style.display = 'none';
  card.style.right = '-450px';
};

moblieMenuBut.onclick = function (e) {
  e.stopPropagation();
  if (menu.style.left == '-521px') {
    closePopup();
    menu.style.left = '0';
    menu.style.zIndex = '3';
    headerParent.style.zIndex = '3';
    backdrop.style.display = 'block';
  } else {
    closePopup();
  };
};

var closeMenuBut = document.getElementById('header__menu--close');

closeMenuBut.onclick = function () {
  closePopup();
};
menu.onclick = function (e) {
  e.stopPropagation();
}
// moblie menu

// profile pop up
var profileBut = document.getElementById('profileButton');
var profile = document.getElementById('profile');
profileBut.onclick = function (e) {
  e.stopPropagation();
  closePopup();
  if (profile.style.display == 'none') {
    profile.style.display = 'block';
    backdrop.style.display = 'block';
    headerParent.style.zIndex = '3';
    profile.style.display = 'block';
  } else {
    profile.style.display = 'none';
    backdrop.style.display = 'none';
    menu.style.zIndex = '3';
  };
};

profile.onclick = function (e) {
  e.stopPropagation();
}

var closeProfile = document.getElementById('icon-menu--profile__close');

closeProfile.onclick = function () {
  closePopup();
}
// profile pop up

// search box
var searchPopupBut = document.getElementById('searchPopupButton');
var searchBox = document.getElementById('search-box');
searchPopupBut.onclick = function (e) {
  e.stopPropagation();
  closePopup();
  menu.style.zIndex = '2';
  headerParent.style.zIndex = '3';
  searchBox.style.top = '117px';
  backdrop.style.display = 'block';
  document.body.style.overflow = 'hidden';
};

searchBox.onclick = function (e) {
  e.stopPropagation();
};

var searchInput = document.getElementById('searchInput');
searchInput.value = '';
var productNameAndType = document.querySelectorAll('.search-box__results>a p');
var searchWithoutSpace = searchInput.value.toLocaleLowerCase().replaceAll(' ', '');
searchInput.addEventListener('input', function () {
  searchWithoutSpace = searchInput.value.toLocaleLowerCase().replaceAll(' ', '');
  productNameAndType.forEach(function (nameAndType) {
    if (nameAndType.textContent.toLocaleLowerCase().search(searchWithoutSpace) !== -1 && searchWithoutSpace !== '') {
      nameAndType.parentElement.parentElement.style.display = 'flex';
    } else if (nameAndType.textContent.toLocaleLowerCase().search(searchWithoutSpace) == -1 || searchWithoutSpace == '') {
      nameAndType.parentElement.parentElement.style.display = 'none';
    };

  });
});
searchBox.onsubmit = function (e) {
  e.preventDefault();
  sessionStorage.setItem('clientSearch', searchWithoutSpace);
  if (window.location.href.search('shop.html') !== -1) {
    changePageTitle();
    closePopup();
  } else {
    window.open('shop.html', '_self');
  };
};
if (window.location.href.search('shop.html') == -1) {
  sessionStorage.clear();
};
//search box

//Wish list
var WishListButton = document.getElementById('wishlist');
var wishlist = document.getElementById('header__icon-menu--wishlist');
WishListButton.onclick = function (e) {
  e.stopPropagation();
  closePopup();
  if (wishlist.style.display == 'none') {
    wishlist.style.display = 'block';
    backdrop.style.display = 'block';
    headerParent.style.zIndex = '3';
  } else {
    closePopup();
  };
};

window.addEventListener('load', function () {
  function checkLocalstorageNotEmpty() {
    var checkDivNoneDisplay = (divs) => {
      var checkItem = true;
      for (var i in divs) {
        if (divs[i].style.display !== 'none') {
          checkItem = false;
          break;
        };
      };
      if (checkItem) {
        document.querySelector('.header__icon-menu--wishlist > div:nth-child(2)').style.display = 'none';
        document.querySelector('.header__icon-menu--wishlist > div:nth-child(3)').style.display = 'none';
        document.querySelector('.header__icon-menu--wishlist > button').style.display = 'none';
        document.getElementById('wishlistEmpty').style.display = 'flex';
      };
    };
    var wishlistItems = document.querySelectorAll('.header__icon-menu--wishlist > div > div');
    var showWishlistNumber = document.getElementById('icon-menu--wishlist__write-num');
    showWishlistNumber.textContent = 0;
    var numberShowWishlistNumber = Number(showWishlistNumber.textContent);
    wishlistItems.forEach(function (item) {
      if (item.style.display !== 'none') {
        numberShowWishlistNumber += 1;
        showWishlistNumber.textContent = numberShowWishlistNumber + ' ' + 'items in wishlist';
      };

    });

    var wishlistItem = Array.from(document.querySelectorAll('.header__icon-menu--wishlist > div > div'));;
    wishlistItem = checkDivNoneDisplay(wishlistItem);
  };
  if (localStorage.getItem('wishlist') !== null) {
    var getWishlist = localStorage.getItem('wishlist');
    wishlist.innerHTML = getWishlist;
  };
  checkLocalstorageNotEmpty();

  var closeWishlist = document.getElementById('icon-menu--wishlist__close');
  closeWishlist.onclick = function () {
    closePopup();
  };

  var deleteWishlistItemBut = document.querySelectorAll('.header__icon-menu--wishlist>div>div>img:first-child');
  deleteWishlistItemBut.forEach(function (but) {
    but.onclick = function () {
      but.parentElement.style.transform = 'translateX(-397px)';
      setTimeout(() => {
        but.parentElement.style.display = 'none';
        localStorage.setItem('wishlist', wishlist.innerHTML);
        checkLocalstorageNotEmpty();
      }, 400);
    };
  });
});

wishlist.onclick = function (e) {
  e.stopPropagation();
}

var addToCart = document.getElementById('icon-menu--wishlist__add-cart');
addToCart.onclick = function () {
  if (localStorage.getItem('productsName') !== null) {
    var productImgUrl = JSON.parse(localStorage.getItem('imgUrl'));
    var productName = JSON.parse(localStorage.getItem('productsName'));
    var productPrice = JSON.parse(localStorage.getItem('productPrice'));
    var productNumber = JSON.parse(localStorage.getItem('productNumber'));

    function addItemToLocalstorageItem(select, specialArray, localItemName) {
      var x = document.querySelectorAll(select);
      if (!x.length) return;

      x.forEach(function (x1) {
        var value = (select === '.icon-menu--wishlist__img') ? x1.src : x1.textContent;
        var index = specialArray.indexOf(value);
        var isDuplicate = index !== -1;

        if (localItemName === 'productsName') {
          if (isDuplicate) {
            productNumber[index] = Number(productNumber[index]) + 1;
          } else {
            if (!x1.parentElement.parentElement.parentElement.getAttribute('style')) {
              specialArray.push(value);
              productNumber.push(1);
            };
          };
          return;
        };

        if (localItemName === 'imgUrl') {
          if (!isDuplicate) {
            if (!x1.parentElement.getAttribute('style')) {
              specialArray.push(x1.src);
            }
          }
          return;
        };

        if (!x1.parentElement.parentElement.parentElement.getAttribute('style')) {
          if (select === '.icon-menu--wishlist__number') {
            specialArray.push(x1.textContent.replace(/\D+/g, ''));
          } else {
            specialArray.push(x1.textContent + '.00');
          };
        };
      });

      if (localItemName !== 'productsName') {
        localStorage.setItem(localItemName, JSON.stringify(specialArray));
      };
    };

    addItemToLocalstorageItem('.icon-menu--wishlist__img', productImgUrl, 'imgUrl');
    addItemToLocalstorageItem('.icon-menu--wishlist__name', productName, 'productsName');
    addItemToLocalstorageItem('.icon-menu--wishlist__price', productPrice, 'productPrice');
    addItemToLocalstorageItem('.icon-menu--wishlist__number', productNumber, 'productNumber');

    function syncProductNameWithOther(arr, localItemName) {
      while (arr.length > productName.length) {
        arr.pop();
      };
      localStorage.setItem(localItemName, JSON.stringify(arr));
    };
    syncProductNameWithOther(productPrice, 'productPrice');
    syncProductNameWithOther(productNumber, 'productNumber');
  } else {
    function setLocalstorageItemInWishlist(select, localItemName) {

      var els = document.querySelectorAll(select);
      var productsAvalibile = [];
      productsAvalibile = Array.from(els)
        .filter(function (x) {
          if (localItemName == 'imgUrl') {
            return !x.parentElement.getAttribute('style');
          } else {
            return !x.parentElement.parentElement.parentElement.getAttribute('style');
          };
        })
        .map(function (x) {
          if (localItemName == 'imgUrl') {
            return x.src;
          } else {
            if (select == '.icon-menu--wishlist__number') {
              return x.textContent.replace(/\D+/g, '').trim();
            } else if (select == '.icon-menu--wishlist__price') {
              return x.textContent + '.00';
            } else {
              return x.textContent.trim();
            };
          };
        });
      localStorage.setItem(localItemName, JSON.stringify(productsAvalibile));
    };
    setLocalstorageItemInWishlist('.icon-menu--wishlist__img', 'imgUrl');
    setLocalstorageItemInWishlist('.icon-menu--wishlist__name', 'productsName');
    setLocalstorageItemInWishlist('.icon-menu--wishlist__price', 'productPrice');
    setLocalstorageItemInWishlist('.icon-menu--wishlist__number', 'productNumber');
  };
  window.postMessage('cart Changed');
};

//Wishlist

//cart
var CardButton = document.getElementById('shopCardButton');
var card = document.getElementById('header__shop-menu');
CardButton.onclick = function (e) {
  e.stopPropagation();
  headerParent.style.zIndex = '3';
  if (card.style.right == '-450px') {
    closePopup();
    card.style.right = '112px';
    backdrop.style.display = 'block';
  } else {
    closePopup();
  };
};

card.onclick = function (e) {
  e.stopPropagation();
};

var closeCard = document.getElementById('shop-menu--title__close');
closeCard.onclick = function () {
  closePopup();
};

function setItemToLocalhost(select, localItemName, checkInput) {
  var productel = document.querySelectorAll(select);
  var productsAvalibile = [];
  productsAvalibile = Array.from(productel)
    .filter(function (nam) {
      if (localItemName == 'imgUrl') {
        return !nam.parentElement.parentElement.getAttribute('style');
      } else {
        return !nam.parentElement.parentElement.parentElement.getAttribute('style');
      };
    })
    .map(function (nam, index) {
      if (checkInput == 'is') {
        return nam.value;
      } else {
        if (localItemName == 'imgUrl') {
          return nam.src;
        } else {
          if (select == '.shop-menu--products__price') {
            var calcution1Product = '';
            var calcution1ProductStep2 = '';
            var productNumber = document.querySelectorAll('.shop-menu--products__number');
            calcution1Product = nam.textContent.replace(/\D+/g, '');
            calcution1Product = Number(calcution1Product) / Number(productNumber[index].textContent);
            calcution1Product = calcution1Product.toString().replace('00', '');
            calcution1ProductStep2 = Number(calcution1Product).toFixed(2).split('.');
            var calcution1ProductFirstLenght = calcution1ProductStep2[0];
            calcution1ProductStep2.splice(0, 1);
            if (calcution1ProductFirstLenght.length > 3) {
              var firstThreeOfNumber = calcution1ProductFirstLenght.slice(0, calcution1ProductFirstLenght.length - 3);
              var secoundThreeOfNumber = calcution1ProductFirstLenght.slice(-3);
              calcution1Product = firstThreeOfNumber + ',' + secoundThreeOfNumber;
            };
            return `Rs.${calcution1Product}.${calcution1ProductStep2}`;
          } else {
            return nam.textContent.trim();
          }
        };
      };
    });
  localStorage.setItem(localItemName, JSON.stringify(productsAvalibile));
};

var openCartPage = document.getElementById('cart');
function setLocalhostItemAfterChange() {
  setItemToLocalhost('.shop-menu--products__img', 'imgUrl')
  setItemToLocalhost('.shop-menu--products__name', 'productsName');
  setItemToLocalhost('.shop-menu--products__price', 'productPrice');
  setItemToLocalhost('.shop-menu--products__number', 'productNumber');
};
openCartPage.onclick = function () {
  setLocalhostItemAfterChange();
  window.location.href = 'cart.html';
};

var checkoutPage = document.getElementById('checkout');
checkoutPage.onclick = function () {
  setLocalhostItemAfterChange();
  window.location.href = 'checkout.html';
};

var totalPrice = 0;
var totalPriceDecimal = 0;
function calculatortotal(priceElement) {
  totalPrice = 0;
  totalPriceDecimal = '00';
  priceElement.forEach(function (price) {
    if (!price.parentElement.parentElement.parentElement.getAttribute('style')) {
      totalPrice += Number(price.textContent.replace(/\D+/g, ''));
    };
  });
  totalPrice = totalPrice.toString().replace('00', '');
  totalPriceDecimal = Number(totalPrice).toFixed(2).split('.');
  var totalPriceLength = totalPriceDecimal[0];

  totalPrice = totalPriceLength.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  totalPriceDecimal.splice(0, 1);
};

function updatepopUpCart() {
  if (localStorage.getItem('productsName') !== null) {

    var productImgUrl = JSON.parse(localStorage.getItem('imgUrl'));
    var productName = JSON.parse(localStorage.getItem('productsName'));
    var productPrice = JSON.parse(localStorage.getItem('productPrice'));
    var productNumber = JSON.parse(localStorage.getItem('productNumber'));
    var productInCartMenu = document.getElementById('header__shop-menu--products');

    productInCartMenu.innerHTML = '';
    for (var i = 0; i < productName.length; i++) {
      var productParent = document.createElement('div');
      var productsParent = document.getElementById('header__shop-menu--products');
      productsParent.appendChild(productParent);

      var cartProductImgParent = document.createElement('div');
      productParent.appendChild(cartProductImgParent);
      var cartProductImg = document.createElement('img');
      cartProductImg.classList.add('shop-menu--products__img');
      cartProductImg.src = productImgUrl[i];
      cartProductImgParent.appendChild(cartProductImg);

      var cartProductContent = document.createElement('div');
      productParent.appendChild(cartProductContent);

      var productNameParent = document.createElement('div');
      cartProductContent.appendChild(productNameParent);

      var productNameElement = document.createElement('p');
      productNameElement.classList.add('shop-menu--products__name');
      productNameElement.textContent = productName[i];
      productNameParent.appendChild(productNameElement);

      var productNameAndPriceParent = document.createElement('div');
      cartProductContent.appendChild(productNameAndPriceParent);

      var productNumberElement = document.createElement('p');
      productNumberElement.classList.add('shop-menu--products__number');
      productNumberElement.textContent = productNumber[i];
      productNameAndPriceParent.appendChild(productNumberElement);

      var x = document.createElement('p');
      x.textContent = 'x';
      productNameAndPriceParent.appendChild(x);

      var newProductPriceElement = document.createElement('span');
      newProductPriceElement.classList.add('shop-menu--products__price');
      subtotalCalculator(productNumber[i], productPrice[i]);
      newProductPriceElement.textContent = `Rs.${calcutionSubtotal}.${calcutionSubtotalStep2}`;
      productNameAndPriceParent.appendChild(newProductPriceElement);

      var newRemoveCardItemParent = document.createElement('div');
      newRemoveCardItemParent.classList.add('shop-menu--products__close');
      productParent.appendChild(newRemoveCardItemParent);

      var newRemoveCardItem = document.createElement('img');
      newRemoveCardItem.src = 'img/Close2.svg';
      newRemoveCardItemParent.appendChild(newRemoveCardItem);

    };
  };
  var removeCardItem = document.querySelectorAll('.shop-menu--products__close');
  var productPriceElement = document.querySelectorAll('.shop-menu--products__price');
  var productsTotalPrice = document.getElementById('total');
  calculatortotal(productPriceElement);
  productsTotalPrice.textContent = `Rs.${totalPrice}.${totalPriceDecimal}`;
  removeCardItem.forEach(function (item) {
    item.addEventListener('click', function () {
      item.parentElement.style.transform = 'translateX(407px)';
      setTimeout(() => {
        item.parentElement.style.display = 'none';
      }, 300);
      calculatortotal(productPriceElement);
      productsTotalPrice.textContent = `Rs.${totalPrice}.${totalPriceDecimal}`;
      setLocalhostItemAfterChange();
      displayEmptyCard('header__shop-menu--total', 'header__shop-menu--empty');
    });
  });
  displayEmptyCard('header__shop-menu--total', 'header__shop-menu--empty');
};

window.addEventListener('load', function () {
  updatepopUpCart();
});

window.addEventListener('message', function (e) {
  if (e.origin === 'http://localhost') {
    if (e.data == 'cart Changed') {
      updatepopUpCart();
    };
  };
});
// close popups and menues when click on the places in page
window.addEventListener('click', function () {
  closePopup();
});
// close popups and menues when click on the places in page

// export set local host item and calculator total
export { setItemToLocalhost, calculatortotal, totalPrice, totalPriceDecimal };
// export set local host item and calculator total