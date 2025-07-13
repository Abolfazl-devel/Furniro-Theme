'use strict';

//import subtotal calculator
import { subtotalCalculator, calcutionSubtotal, calcutionSubtotalStep2 } from "./subtotal-calculator.js";
//import subtotal calculator

// import set local host item and calculator total
import { calculatortotal, totalPrice, totalPriceDecimal } from "./header.js";
// import set local host item and calculator total


//import show the empty cart function
import { displayEmptyCard } from "./empty-cart.js";
//import show the empty cart function

if (localStorage.getItem('productsName') !== null && localStorage.getItem('productsName') !== '[]') {
  var productName = JSON.parse(localStorage.getItem('productsName'));
  var productPrice = JSON.parse(localStorage.getItem('productPrice'));
  var productNumber = JSON.parse(localStorage.getItem('productNumber'));

  var checkProductBeforeAdd = document.querySelectorAll('.total__price--product');
  checkProductBeforeAdd.forEach(function (div) {
    div.remove();
  });
  for (var i = 0; i < productName.length; i++) {
    var totalCart = document.getElementById('total__price');
    var productDetail = document.createElement('div');
    totalCart.appendChild(productDetail);
    checkProductBeforeAdd = document.querySelectorAll('.total__price--product');
    if (checkProductBeforeAdd.length !== 0) {
      checkProductBeforeAdd[checkProductBeforeAdd.length - 1].parentNode.insertBefore(productDetail, checkProductBeforeAdd[checkProductBeforeAdd.length - 1].nextSibling);
    } else {
      var subtotalParent = document.getElementById('total__price--subtotal');
      subtotalParent.parentNode.insertBefore(productDetail, subtotalParent);
    };
    productDetail.classList.add('total__price--product');

    var productNumberAndPriceParent = document.createElement('div');
    productDetail.appendChild(productNumberAndPriceParent);

    var productNameElement = document.createElement('span');
    productNameElement.textContent = productName[i];
    productNumberAndPriceParent.appendChild(productNameElement);

    var productNumberElement = document.createElement('span');
    productNumberElement.innerHTML = `&nbsp; x${productNumber[i]}`;
    productNumberAndPriceParent.appendChild(productNumberElement);

    var productPriceParent = document.createElement('div');
    productDetail.appendChild(productPriceParent);

    var newProductPriceElement = document.createElement('span');
    subtotalCalculator(productNumber[i], productPrice[i])
    newProductPriceElement.textContent = `Rs.${calcutionSubtotal}.${calcutionSubtotalStep2}`;
    productPriceParent.appendChild(newProductPriceElement);
  };
  var productPriceElement = document.querySelectorAll('.total__price--product>div:last-child span');
  calculatortotal(productPriceElement);
  var subtotal = document.getElementById('price--subtotal__txt');
  var totalProduct = document.getElementById('total__price--total');
  subtotal.textContent = `Rs.${totalPrice}.${totalPriceDecimal}`;
  totalProduct.textContent = `Rs.${totalPrice}.${totalPriceDecimal}`;
} else if (localStorage.getItem('productsName') == '[]') {
  displayEmptyCard('billing-total', 'header__shop-menu--empty--checkout');
};