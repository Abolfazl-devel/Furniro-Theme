'use strict';
// pop up and menu's background
var backdrop = document.getElementById('backdrop');
// pop up and menu's background

// header parent
var headerParent = document.getElementById('headerParent');
// header parent

// moblie menu
var moblieMenuBut = document.getElementById('header__mobile-menu-img');
var menu = document.getElementById('header__menu');

function close() {
  menu.style.left = '-521px';
  menu.style.zIndex = '3';
  backdrop.style.display = 'none';
  profile.style.display = 'none';
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
  close();
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

// close popups and menues when click on the places in page
window.addEventListener('click', function () {
  close();
});