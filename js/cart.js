'use strict';
// import set local host item and calculator total
import { setItemToLocalhost, calculatortotal, totalPrice, totalPriceDecimal } from "./header.js";
// import set local host item and calculator total

//import subtotal calculator
import { subtotalCalculator, calcutionSubtotal, calcutionSubtotalStep2 } from "./subtotal-calculator.js";
//import subtotal calculator

//import show the empty cart function
import { displayEmptyCard } from "./empty-cart.js";
//import show the empty cart function

function getItemsOfLocal() {

  function setLocalhostItemAfterChange() {
    setItemToLocalhost('.cart-products__product--specifications .cart-products__product--specifications--img img', 'imgUrl');
    setItemToLocalhost('.cart-products__product--specifications .cart-products__product--specifications-contant div:first-child span', 'productsName');
    setItemToLocalhost('.cart-products__product--specifications .cart-products__product--specifications-contant div:nth-child(2) span', 'productPrice');
    setItemToLocalhost('.cart-products__product--specifications .cart-products__product--specifications-contant input[type="number"]', 'productNumber', 'is');
  };

  function changeCartTotalSubtotal() {
    var cartTotalSubtotal = document.getElementById('total--content__subtotal');
    var productPriceElement = document.querySelectorAll('.cart-products__product--specifications-contant div:nth-child(4) span');
    var cartTotalTotal = document.getElementById('total--content__total');
    calculatortotal(productPriceElement);
    cartTotalSubtotal.textContent = `Rs.${totalPrice}.${totalPriceDecimal}`;
    cartTotalTotal.textContent = `Rs.${totalPrice}.${totalPriceDecimal}`;
  };

  function removeItem(index) {
    var productDetails = document.querySelectorAll('.cart-products__product--specifications');
    var mobileProductDetails = document.querySelectorAll('.cart-products__product--specifications-mobile');
    productDetails[index].style.display = 'none';
    mobileProductDetails[index].style.display = 'none';
  };
  
  function setInputEvent(productPrice, ele) {
    var changeProductNumber = document.querySelectorAll('.cart-products__product--specifications-contant input[type="number"]');
    changeProductNumber.forEach(function (input, index) {
      input.oninput = function () {
        if (ele) {
          subtotalCalculator(input.value, productPrice[index].textContent);
        } else {
          subtotalCalculator(input.value, productPrice[index]);
        };
        if (input.value == 0) {
          removeItem(index);
          input.value = '';
        };
        var productsSubtotal = document.querySelectorAll('.cart-products__product--specifications-contant div:nth-child(4) span');
        productsSubtotal[index].textContent = `Rs.${calcutionSubtotal}.${calcutionSubtotalStep2}`;
        setLocalhostItemAfterChange();
        changeCartTotalSubtotal();
        displayEmptyCard('cart-products', 'header__shop-menu--empty--cartpage');
      };
    });
  };
  var priceSpan = document.querySelectorAll('.cart-products__product--specifications-contant div:nth-child(2) span');
  setInputEvent(priceSpan, true);

  function setDeleteEvent(butt) {
    butt.forEach(function (deleteBut, index) {
      deleteBut.onclick = function () {
        removeItem(index);
        setLocalhostItemAfterChange();
        changeCartTotalSubtotal();
        displayEmptyCard('cart-products', 'header__shop-menu--empty--cartpage');
      };
    });
  };
  var deleteItemBeforeSet = document.querySelectorAll('.product--specifications-contant__delete');
  var mobileDeleteItemBeforeSet = document.querySelectorAll('.product--specifications-contant__delete-mobile');
  setDeleteEvent(deleteItemBeforeSet);
  setDeleteEvent(mobileDeleteItemBeforeSet);

  if (localStorage.getItem('productsName') !== null && localStorage.getItem('productsName') !== '[]') {

    var productImgUrl = JSON.parse(localStorage.getItem('imgUrl'));
    var productName = JSON.parse(localStorage.getItem('productsName'));
    var productPrice = JSON.parse(localStorage.getItem('productPrice'));
    var productNumber = JSON.parse(localStorage.getItem('productNumber'));

    function clearOldProducts(old) {
      old.forEach(function (single) {
        single.remove();
      });
    };

    var products = document.getElementById('cart-products__product');
    var oldProducts = document.querySelectorAll('.cart-products__product--specifications');
    var mobileOldProducts = document.querySelectorAll('.cart-products__product--specifications-mobile');
    clearOldProducts(oldProducts);
    clearOldProducts(mobileOldProducts);


    for (var i = 0; i < productName.length; i++) {
      var productDetail = document.createElement('div');
      productDetail.classList.add('cart-products__product--specifications');
      products.appendChild(productDetail);

      var cartProductImgParent = document.createElement('div');
      cartProductImgParent.classList.add('cart-products__product--specifications--img');
      productDetail.appendChild(cartProductImgParent);
      var cartProductImg = document.createElement('img');
      cartProductImg.src = productImgUrl[i];
      cartProductImgParent.appendChild(cartProductImg);

      var cartProductContent = document.createElement('div');
      cartProductContent.classList.add('cart-products__product--specifications-contant');
      productDetail.appendChild(cartProductContent);

      var productNameParent = document.createElement('div');
      cartProductContent.appendChild(productNameParent);
      var productNameElement = document.createElement('span');
      productNameElement.textContent = productName[i];
      productNameParent.appendChild(productNameElement);

      var productPriceParent = document.createElement('div');
      cartProductContent.appendChild(productPriceParent);
      var newProductPriceElement = document.createElement('span');
      newProductPriceElement.textContent = productPrice[i];
      productPriceParent.appendChild(newProductPriceElement);

      var productNumberParent = document.createElement('div');
      cartProductContent.appendChild(productNumberParent);
      var productNumberElement = document.createElement('input');
      productNumberElement.max = '8';
      productNumberElement.type = 'number';
      productNumberElement.value = productNumber[i];
      productNumberParent.appendChild(productNumberElement);

      var productSubtotalParent = document.createElement('div');
      cartProductContent.appendChild(productSubtotalParent);
      var productSubtotal = document.createElement('span');

      productSubtotal.textContent = `Rs.${calcutionSubtotal}.${calcutionSubtotalStep2}`;
      productSubtotalParent.appendChild(productSubtotal);

      var deleteItemParent = document.createElement('div');
      deleteItemParent.classList.add('product--specifications-contant__delete');
      cartProductContent.appendChild(deleteItemParent);
      var deleteItem = document.createElement('img')
      deleteItem.src = 'img/bin.svg';
      deleteItemParent.appendChild(deleteItem);

      var mobileProductDetail = document.createElement('div');
      mobileProductDetail.classList.add('cart-products__product--specifications-mobile');
      products.appendChild(mobileProductDetail);

      var mobileCartProductImgParent = document.createElement('div');
      mobileCartProductImgParent.classList.add('cart-products__product--specifications--img');
      mobileProductDetail.appendChild(mobileCartProductImgParent);
      var mobileCartProductImg = document.createElement('img');
      mobileCartProductImg.src = productImgUrl[i];
      mobileCartProductImgParent.appendChild(mobileCartProductImg);

      var buttonsAndContentParent = document.createElement('div');
      buttonsAndContentParent.classList.add('cart-products__product--specifications-contant-button');
      mobileProductDetail.appendChild(buttonsAndContentParent);

      var mobileCartProductContent = document.createElement('div');
      mobileCartProductContent.classList.add('cart-products__product--specifications-contant');
      buttonsAndContentParent.appendChild(mobileCartProductContent);

      var mobileProductNameParent = document.createElement('div');
      mobileCartProductContent.appendChild(mobileProductNameParent);
      var mobileProductNameElement = document.createElement('span');
      mobileProductNameElement.textContent = productName[i];
      mobileProductNameParent.appendChild(mobileProductNameElement);

      var mobileProductPriceParent = document.createElement('div');
      mobileCartProductContent.appendChild(mobileProductPriceParent);
      var mobileProductPriceElement = document.createElement('span');
      mobileProductPriceElement.textContent = productPrice[i];
      mobileProductPriceParent.appendChild(mobileProductPriceElement);

      var mobileButtonsParent = document.createElement('div');
      mobileButtonsParent.classList.add('cart-products__product--specifications--button');
      buttonsAndContentParent.appendChild(mobileButtonsParent);

      var mobileProductNumberParent = document.createElement('div');
      mobileButtonsParent.appendChild(mobileProductNumberParent);
      var mobileProductNumberElement = document.createElement('input');
      mobileProductNumberElement.type = 'number';
      mobileProductNumberElement.max = '8';
      mobileProductNumberElement.value = productNumber[i];
      mobileProductNumberParent.appendChild(mobileProductNumberElement);

      var mobileProductSubtotalParent = document.createElement('div');
      mobileButtonsParent.appendChild(mobileProductSubtotalParent);
      var mobileProductSubtotalElement = document.createElement('span');
      subtotalCalculator(productNumber[i], productPrice[i]);
      productSubtotal.textContent = `Rs.${calcutionSubtotal}.${calcutionSubtotalStep2}`;
      mobileProductSubtotalElement.textContent = `Rs.${calcutionSubtotal}.${calcutionSubtotalStep2}`;
      mobileProductSubtotalParent.appendChild(mobileProductSubtotalElement);

      var mobileDeleteItemParent = document.createElement('div');
      mobileDeleteItemParent.classList.add('product--specifications-contant__delete-mobile');
      mobileButtonsParent.appendChild(mobileDeleteItemParent);
      var mobileDeleteItem = document.createElement('img');
      mobileDeleteItem.src = 'img/bin.svg';
      mobileDeleteItemParent.appendChild(mobileDeleteItem);

    };

    var deleteItemAfterShow = document.querySelectorAll('.product--specifications-contant__delete');
    setDeleteEvent(deleteItemAfterShow);
    var mobileDeleteItemAfterShow = document.querySelectorAll('.product--specifications-contant__delete-mobile');
    setDeleteEvent(mobileDeleteItemAfterShow);

    setInputEvent(productPrice);

    changeCartTotalSubtotal();

  } else if (localStorage.getItem('productsName') == '[]') {
    displayEmptyCard('cart-products', 'header__shop-menu--empty--cartpage');
  };
};
getItemsOfLocal();

window.addEventListener('load', function () {
  var removeCardItem = document.querySelectorAll('.shop-menu--products__close');
  removeCardItem.forEach(function (but) {
    but.addEventListener('click', function () {
      getItemsOfLocal();
    });
  });
})