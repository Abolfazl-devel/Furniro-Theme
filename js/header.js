'use strict';
// pop up and menu's background
var backdrop = document.getElementById('backdrop');

backdrop.onclick = function () {
  closeMenu();
};
// pop up and menu's background

// moblie menu
var moblieMenuBut = document.getElementById('header__mobile-menu-img');
var menu = document.getElementById('header__menu');

function closeMenu() {
  menu.style.left = '-521px';
  backdrop.style.display = 'none';
}

moblieMenuBut.onclick = function () {
  menu.style.left = '0';
  backdrop.style.display = 'block';
};

var closeMenuBut = document.getElementById('header__menu--close');

closeMenuBut.onclick = function () {
  closeMenu();
};
// moblie menu