'use strict';

// prodcut on page 
import { addingProductOnPage } from './product-on-page.js';
addingProductOnPage('.products__product > img', '.product__caption h5', '.product__caption h6', '.product__hover-content--button button');
// prodcut on page 

// Change main picture
var smallPicsParent = document.querySelectorAll('.buy__all-img div');
smallPicsParent.forEach(function (image, index) {
  image.onclick = function () {
    var smallPics = document.querySelectorAll('.buy__all-img div img');
    var mainImg = document.getElementById('buy__active-img');
    mainImg.src = smallPics[index].src;
  };
});
// Change main picture

// Change product size
var sizesParent = document.querySelectorAll('.buy__description--size div div');
sizesParent.forEach(function (singleSize, index) {
  singleSize.onclick = function () {
    var sizes = document.querySelectorAll('.buy__description--size div div span');
    sizesParent.forEach(function (allSize, removeSizeIndex) {
      allSize.removeAttribute('style');
      sizes[removeSizeIndex].removeAttribute('style');
    });
    singleSize.style.background = '#B98E2F';
    sizes[index].style.color = '#fff';
  };
});
// Change product size

// Change product color
var colorsParent = document.querySelectorAll('.buy__description--color > div > div');
colorsParent.forEach(function (but, index) {
  but.onclick = function () {
    var colors = document.querySelectorAll('.buy__description--color > div:nth-child(2) > div > div');
    colors.forEach(function (aColor) {
      aColor.removeAttribute('style');
    });
    colors[index].style.scale = '69%';
  };
});
// Change product color

//Change product number
var removeProduct = document.getElementById('buy__description-button--remove');

var addNumber = document.getElementById('buy__description-button--add');

var productNumber = document.getElementById('buy__description-button--show');

removeProduct.onclick = function () {
  if (Number(productNumber.textContent) <= 1) {
    return;
  } else {
    productNumber.textContent = Number(productNumber.textContent) - 1;
  };
};

addNumber.onclick = function () {
  if (Number(productNumber.textContent) >= 8) {
    return;
  } else {
    productNumber.textContent = Number(productNumber.textContent) + 1;
  };
};
//Change product number

//Add to cart
addingProductOnPage('.buy__all-img div img', '.buy__description--title p', '.buy__description--price', '.buy__description-button--add-to-cart', false, true, productNumber);
//Add to cart