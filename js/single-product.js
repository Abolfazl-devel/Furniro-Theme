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