'use strict';

// Search search product function
import { changePageTitle } from "./shop.js";

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
};

moblieMenuBut.onclick = function (e) {
  e.stopPropagation();
  menu.style.left = '0';
  menu.style.zIndex = '3';
  headerParent.style.removeProperty('z-index');
  backdrop.style.display = 'block';
  profile.style.display = 'none';
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
// profile pop up

// search box
var searchPopupBut = document.getElementById('searchPopupButton');
var searchBox = document.getElementById('search-box');
searchPopupBut.onclick = function (e) {
  e.stopPropagation();
  closePopup();
  menu.style.zIndex = '2';
  headerParent.style.zIndex = '2';
  searchBox.style.top = '25px';
  backdrop.style.display = 'block';
  document.body.style.overflow = 'hidden';
};

searchBox.onclick = function (e) {
  e.stopPropagation();
};

var closeSearchBut = document.getElementById('search-box__close');
closeSearchBut.onclick = function () {
  closePopup();
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
  if (wishlist.style.display == 'none') {
    wishlist.style.display = 'block';
    backdrop.style.display = 'block';
    headerParent.style.zIndex = '3';
  } else {
    closePopup();
  };
};

var deleteWishlistItemBut = document.querySelectorAll('.header__icon-menu--wishlist>div>div>img:first-child');
deleteWishlistItemBut.forEach(function (but) {
  but.onclick = function () {
    but.parentElement.style.transform = 'translateX(-397px)';
    setTimeout(() => {
      but.parentElement.style.display = 'none';
    }, 400);
  };
});

wishlist.onclick = function (e) {
  e.stopPropagation();
}

var closeWishlist = document.getElementById('icon-menu--wishlist__close');
closeWishlist.onclick = function () {
  closePopup();
}

// close popups and menues when click on the places in page
window.addEventListener('click', function () {
  closePopup();
});
// close popups and menues when click on the places in page