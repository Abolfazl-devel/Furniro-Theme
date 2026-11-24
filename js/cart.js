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
    const cartTotalSubtotal = document.getElementById('total--content__subtotal');
    const productPriceElement = document.querySelectorAll('.cart-products__product--specifications-contant div:nth-child(4) span');
    const cartTotalTotal = document.getElementById('total--content__total');
    calculatortotal(productPriceElement);
    cartTotalSubtotal.textContent = `Rs.${totalPrice}.${totalPriceDecimal}`;
    cartTotalTotal.textContent = `Rs.${totalPrice}.${totalPriceDecimal}`;
  };

  function removeItem(index) {
    const productDetails = document.querySelectorAll('.cart-products__product--specifications');
    const mobileProductDetails = document.querySelectorAll('.cart-products__product--specifications-mobile');
    productDetails[index].style.display = 'none';
    mobileProductDetails[index].style.display = 'none';
  };
  
  function setInputEvent(productPrice, ele) {
    const changeProductNumber = document.querySelectorAll('.cart-products__product--specifications-contant input[type="number"]');
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
        const productsSubtotal = document.querySelectorAll('.cart-products__product--specifications-contant div:nth-child(4) span');
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
  const deleteItemBeforeSet = document.querySelectorAll('.product--specifications-contant__delete');
  const mobileDeleteItemBeforeSet = document.querySelectorAll('.product--specifications-contant__delete-mobile');
  setDeleteEvent(deleteItemBeforeSet);
  setDeleteEvent(mobileDeleteItemBeforeSet);

  if (localStorage.getItem('productsName') !== null && localStorage.getItem('productsName') !== '[]') {

    const productImgUrl = JSON.parse(localStorage.getItem('imgUrl'));
    const productName = JSON.parse(localStorage.getItem('productsName'));
    const productPrice = JSON.parse(localStorage.getItem('productPrice'));
    const productNumber = JSON.parse(localStorage.getItem('productNumber'));

    function clearOldProducts(old) {
      old.forEach(function (single) {
        single.remove();
      });
    };

    const products = document.getElementById('cart-products__product');
    const oldProducts = document.querySelectorAll('.cart-products__product--specifications');
    const mobileOldProducts = document.querySelectorAll('.cart-products__product--specifications-mobile');
    clearOldProducts(oldProducts);
    clearOldProducts(mobileOldProducts);


    for (let i = 0; i < productName.length; i++) {
      const productDetail = document.createElement('div');
      productDetail.classList.add('cart-products__product--specifications');
      products.appendChild(productDetail);

      const cartProductImgParent = document.createElement('div');
      cartProductImgParent.classList.add('cart-products__product--specifications--img');
      productDetail.appendChild(cartProductImgParent);
      const cartProductImg = document.createElement('img');
      cartProductImg.src = productImgUrl[i];
      cartProductImgParent.appendChild(cartProductImg);

      const cartProductContent = document.createElement('div');
      cartProductContent.classList.add('cart-products__product--specifications-contant');
      productDetail.appendChild(cartProductContent);

      const productNameParent = document.createElement('div');
      cartProductContent.appendChild(productNameParent);
      const productNameElement = document.createElement('span');
      productNameElement.textContent = productName[i];
      productNameParent.appendChild(productNameElement);

      const productPriceParent = document.createElement('div');
      cartProductContent.appendChild(productPriceParent);
      const newProductPriceElement = document.createElement('span');
      newProductPriceElement.textContent = productPrice[i];
      productPriceParent.appendChild(newProductPriceElement);

      const productNumberParent = document.createElement('div');
      cartProductContent.appendChild(productNumberParent);
      const productNumberElement = document.createElement('input');
      productNumberElement.max = '8';
      productNumberElement.type = 'number';
      productNumberElement.value = productNumber[i];
      productNumberParent.appendChild(productNumberElement);

      const productSubtotalParent = document.createElement('div');
      cartProductContent.appendChild(productSubtotalParent);
      const productSubtotal = document.createElement('span');

      productSubtotal.textContent = `Rs.${calcutionSubtotal}.${calcutionSubtotalStep2}`;
      productSubtotalParent.appendChild(productSubtotal);

      const deleteItemParent = document.createElement('div');
      deleteItemParent.classList.add('product--specifications-contant__delete');
      cartProductContent.appendChild(deleteItemParent);
      const deleteItem = document.createElement('img')
      deleteItem.src = 'img/bin.svg';
      deleteItemParent.appendChild(deleteItem);

      const mobileProductDetail = document.createElement('div');
      mobileProductDetail.classList.add('cart-products__product--specifications-mobile');
      products.appendChild(mobileProductDetail);

      const mobileCartProductImgParent = document.createElement('div');
      mobileCartProductImgParent.classList.add('cart-products__product--specifications--img');
      mobileProductDetail.appendChild(mobileCartProductImgParent);
      const mobileCartProductImg = document.createElement('img');
      mobileCartProductImg.src = productImgUrl[i];
      mobileCartProductImgParent.appendChild(mobileCartProductImg);

      const buttonsAndContentParent = document.createElement('div');
      buttonsAndContentParent.classList.add('cart-products__product--specifications-contant-button');
      mobileProductDetail.appendChild(buttonsAndContentParent);

      const mobileCartProductContent = document.createElement('div');
      mobileCartProductContent.classList.add('cart-products__product--specifications-contant');
      buttonsAndContentParent.appendChild(mobileCartProductContent);

      const mobileProductNameParent = document.createElement('div');
      mobileCartProductContent.appendChild(mobileProductNameParent);
      const mobileProductNameElement = document.createElement('span');
      mobileProductNameElement.textContent = productName[i];
      mobileProductNameParent.appendChild(mobileProductNameElement);

      const mobileProductPriceParent = document.createElement('div');
      mobileCartProductContent.appendChild(mobileProductPriceParent);
      const mobileProductPriceElement = document.createElement('span');
      mobileProductPriceElement.textContent = productPrice[i];
      mobileProductPriceParent.appendChild(mobileProductPriceElement);

      const mobileButtonsParent = document.createElement('div');
      mobileButtonsParent.classList.add('cart-products__product--specifications--button');
      buttonsAndContentParent.appendChild(mobileButtonsParent);

      const mobileProductNumberParent = document.createElement('div');
      mobileButtonsParent.appendChild(mobileProductNumberParent);
      const mobileProductNumberElement = document.createElement('input');
      mobileProductNumberElement.type = 'number';
      mobileProductNumberElement.max = '8';
      mobileProductNumberElement.value = productNumber[i];
      mobileProductNumberParent.appendChild(mobileProductNumberElement);

      const mobileProductSubtotalParent = document.createElement('div');
      mobileButtonsParent.appendChild(mobileProductSubtotalParent);
      const mobileProductSubtotalElement = document.createElement('span');
      subtotalCalculator(productNumber[i], productPrice[i]);
      productSubtotal.textContent = `Rs.${calcutionSubtotal}.${calcutionSubtotalStep2}`;
      mobileProductSubtotalElement.textContent = `Rs.${calcutionSubtotal}.${calcutionSubtotalStep2}`;
      mobileProductSubtotalParent.appendChild(mobileProductSubtotalElement);

      const mobileDeleteItemParent = document.createElement('div');
      mobileDeleteItemParent.classList.add('product--specifications-contant__delete-mobile');
      mobileButtonsParent.appendChild(mobileDeleteItemParent);
      const mobileDeleteItem = document.createElement('img');
      mobileDeleteItem.src = 'img/bin.svg';
      mobileDeleteItemParent.appendChild(mobileDeleteItem);

    };

    const deleteItemAfterShow = document.querySelectorAll('.product--specifications-contant__delete');
    setDeleteEvent(deleteItemAfterShow);
    const mobileDeleteItemAfterShow = document.querySelectorAll('.product--specifications-contant__delete-mobile');
    setDeleteEvent(mobileDeleteItemAfterShow);

    setInputEvent(productPrice);

    changeCartTotalSubtotal();

  } else if (localStorage.getItem('productsName') == '[]') {
    displayEmptyCard('cart-products', 'header__shop-menu--empty--cartpage');
  };
};
getItemsOfLocal();

window.addEventListener('load', function () {
  const removeCardItem = document.querySelectorAll('.shop-menu--products__close');
  removeCardItem.forEach(function (but) {
    but.addEventListener('click', function () {
      getItemsOfLocal();
    });
  });
})