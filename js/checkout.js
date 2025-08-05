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

// Import checkname
import { checkEmailFn, invaildError, checkEmail, checkName, checkFirstName } from "./check-email-name.js";
// Import checkname

//Getting data of local storage 
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

// checking data

var billingForm = document.getElementById('billing');
async function submitForm(event) {
  var billingLoading = document.getElementById('loading');
  billingLoading.style.display = 'flex';
  event.preventDefault();
  invaildError.forEach(function (inError) {
    inError.style.display = 'none';
  });
  checkName();

  var lastName = document.getElementById('lastName');
  var checkLastName = true;
  if (!/^[A-Za-z]{3,}$/.test(lastName.value)) {
    invaildError[1].style.display = 'block';
    checkLastName = false;
  };

  var streetAddress = document.getElementById('streetAddress');
  var checkStreetAddress = true;
  var accessToken = 'pk.1f5c1326519fc0f8051e5f272d925692';
  var countriescode = {
    'The United States': 'us',
    'The United kingdom': 'gb',
    'Canada': 'ca',
    'France': 'fr'
  };
  var countryNameToCode = countriescode[selectedItem[0].textContent.toString().trim()];
  if (checkSelectCountry) {
    var fetchStreetAddress = await fetch(`https://us1.locationiq.com/v1/search.php?key=${accessToken}&q=${encodeURIComponent(streetAddress.value)}&countrycodes=${countryNameToCode}&format=json`);
    var gettingStreetAddress = await fetchStreetAddress.json();
    if (!gettingStreetAddress || gettingStreetAddress.length < 0) {
      invaildError[3].style.display = 'block';
      checkStreetAddress = false;
    };
  } else {
    invaildError[3].style.display = 'block';
    checkStreetAddress = false;
  };

  if (checkSelectCountry) {
    var checkCity = false;
    var fetchCity = await fetch(`https://us1.locationiq.com/v1/search.php?key=${accessToken}&q=${encodeURIComponent(cityName.value)}&countrycodes=${countryNameToCode}&format=json`);
    var getCity = await fetchCity.json();
    if (getCity && getCity.length > 0) {
      var getDisplay_name = getCity[0].display_name.split(',');
      var whichPlace = getDisplay_name[0].trim();
      console.log(whichPlace);
      if (whichPlace?.toLowerCase() == cityName.value.trim().toLowerCase()) {
        checkCity = true;
      } else {
        invaildError[4].style.display = 'block';
      }
    } else {
      invaildError[4].style.display = 'block';
    };
  } else {
    invaildError[4].style.display = 'block';
  };

  function delay() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  };
  await delay();
  if (checkStreetAddress) {
    var zipCode = document.getElementById('ZIP');
    var checkZipCode = true;
    var fullAddress = `${streetAddress.value}, ${zipCode.value}, ${selectedItem[0]}`
    var fetchZipCode = await fetch(`https://us1.locationiq.com/v1/search.php?key=${accessToken}&q=${encodeURIComponent(fullAddress)}&format=json`);
    var gettingZipCodeJson = await fetchZipCode.json();
    if (gettingZipCodeJson.length > 0) {
      var getDisplay_name = gettingZipCodeJson[0].display_name.split(',');
      var getZipCode = getDisplay_name[7].trim();
      console.log(getZipCode !== zipCode.value.trim());
      if (getZipCode !== zipCode.value.trim()) {
        checkZipCode = false;
        invaildError[6].style.display = 'block';
      };
    } else {
      invaildError[6].style.display = 'block';
      checkZipCode = false;
    };
  } else {
    invaildError[6].style.display = 'block';
    checkZipCode = false;
  };

  var phoneNumber = document.getElementById('phoneNumber');
  var checkPhoneNumber = true;
  if (!/^\+?[\d\s\-()]{7,20}$/.test(phoneNumber.value)) {
    invaildError[7].style.display = 'block';
    checkPhoneNumber = false;
  };
  checkEmailFn('billingEmail', 8);
  if (!checkSelectCountry) {
    invaildError[2].style.display = 'block';
  };

  if (!checkSelectProvince) {
    invaildError[5].style.display = 'block';
  };

  if (checkFirstName && checkLastName && checkStreetAddress && checkCity && checkZipCode && checkPhoneNumber && checkEmail && checkSelectCountry && checkSelectProvince) {
    var allProductsPrice = document.getElementById('bill__product-price');
    var allProductsPriceOnPage = document.getElementById('total__price--total');
    allProductsPrice.textContent = allProductsPriceOnPage.textContent;
    var billingLoadingImg = document.querySelector('#loading > img');
    billingLoadingImg.src = 'img/check.gif';
    var paymentStatus = document.getElementById('bill-parent');
    setTimeout(() => {
      billingLoading.style.display = 'none';
      paymentStatus.style.display = 'flex';
    }, 3300);
    var billDate = document.getElementById('bill__info--date');
    const allDate = new Date();
    const date = [allDate.getDay(), allDate.getMonth(), allDate.getFullYear()].join('-');
    const time = [allDate.getHours(), allDate.getMinutes(), allDate.getSeconds()].join(':');
    billDate.textContent = date + ',' + time;

    var paymentMethodName = document.getElementById('bill__info--payment-methode');
    paymentMethodName.textContent = selectedMethodes.textContent;

    var total = document.getElementById('bill__total--total');
    total.textContent = allProductsPriceOnPage.textContent;
    setTimeout(() => {
      paymentStatus.style.display = 'none';
      billingForm.reset();
      selectInput[0].textContent = 'Select a country';
      selectInput[1].textContent = 'Select a province';
      selectBox[1].innerHTML = '';
      var noOptionToSelectParent = document.createElement('div');
      selectBox[1].appendChild(noOptionToSelectParent);
      var noOptionToSelect = document.createElement('p');
      noOptionToSelect.textContent = 'Select a city or town first';
    }, 5000);
  }else {
  billingLoading.style.display = 'none';
  }
};
billingForm.addEventListener('submit', submitForm);

var selectInput = document.querySelectorAll('.selectInput');
var selectBox = document.querySelectorAll('.selectBox');
function selectionEvent(event, index) {
  if (selectBox[index].style.display == 'none') {
    event.stopPropagation();
    closeSelections();
    selectBox[index].style.display = 'block';
  };
};
var saveFunctions = [];

function addSelectEvent(index) {
  return function (event) {
    selectionEvent(event, index);
  };
};

function addingSelectionEvent() {
  selectInput.forEach(function (selection, index) {
    var e = addSelectEvent(index);
    saveFunctions[index] = e;
    selection.addEventListener('click', e);
  });
};
addingSelectionEvent();

function closeSelections() {
  selectBox.forEach(function (box) {
    box.style.display = 'none';
    var allOptionsInPage = document.querySelectorAll('.billing > div > div div div');
    allOptionsInPage.forEach(function (item) {
      item.style.removeProperty('border');
    });
    isSelect = '';
  });
};

window.addEventListener('click', function () {
  closeSelections();
});

var selectedItem = document.querySelectorAll('.selectedItem');

var provinceItem = document.querySelectorAll('.provinceItem');
var checkSelectProvince = false;
function clickEventForProvinceItem() {
  provinceItem.forEach(function (item) {
    item.onclick = function () {
      selectedItem[1].textContent = item.textContent;
      checkSelectProvince = true;
    };
  });
};
clickEventForProvinceItem();

var countriesItem = document.querySelectorAll('.countryItem');
var checkSelectCountry = false;
countriesItem.forEach(function (item) {
  item.onclick = function () {
    selectedItem[0].textContent = item.textContent;
    localStorage.setItem('countryName', item.textContent)
    checkSelectCountry = true;
  };
});

var isSelect = '';
document.addEventListener('keydown', function (press) {
  var key = press.key.toLowerCase();
  selectBox.forEach(function (box, index) {
    if (box.style.display == 'block') {
      function selectItem(option) {
        Array.from(option).forEach(function (item) {
          item.style.removeProperty('border');
        });
        var matchedItem = Array.from(option).filter(item =>
          item.textContent.trim().toLowerCase().startsWith(key)
        );
        if (matchedItem.length == 0) {
          return;
        };
        var selectNow = matchedItem.findIndex(item =>
          item.style.border == '2px solid rgb(184, 141, 46)'
        );

        var nextSelect = (selectNow + 1) % matchedItem.length;

        isSelect = matchedItem[nextSelect];
        changeBorder(matchedItem, nextSelect);
      };

      function changeBorder(item, index) {
        isSelect = item[index];
        item[index].style.transition = 'none';
        item[index].style.border = '2px solid #B88D2E';
        setTimeout(() => {
          item[index].style.transition = 'all ease 0.3s';
        }, 100);
        item[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      };

      function arrowKeys(option) {
        var optionArray = Array.from(option);
        var activeItem = optionArray.findIndex(item =>
          item.style.border === '2px solid rgb(184, 141, 46)'
        );
        if (press.key == 'ArrowDown') {
          press.preventDefault();
          if (activeItem !== -1) {
            option[activeItem].style.removeProperty('border');
            var nextSelect = (activeItem + 1) % option.length;
            changeBorder(option, nextSelect);
          } else {
            changeBorder(option, 0);
          };
        } else if (press.key == 'ArrowUp') {
          press.preventDefault();
          if (activeItem !== -1) {
            option[activeItem].style.removeProperty('border');
            var nextSelect = (activeItem - 1 + option.length) % option.length;
            changeBorder(option, nextSelect);
          } else {
            changeBorder(option, option.length - 1);
          };
        };
      };

      function workingKey(whichItems, selectIndex) {
        var checkAlphabets = /^[a-z]$/i;
        if (checkAlphabets.test(press.key)) {
          selectItem(whichItems);
        };
        arrowKeys(whichItems);
        console.log(isSelect);
        console.log(press.key);
        if (press.key == 'Enter' && isSelect !== '') {
          selectedItem[selectIndex].textContent = isSelect.textContent;
          closeSelections();
        };
      };

      if (index == 0) {
        workingKey(countriesItem, 0);
      } else {
        workingKey(provinceItem, 1);
      };
    };
  });
});

var cityName = document.getElementById('city-town');

function requestTimeouting() {
  var saveTimeout;
  return function (...args) {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      getProvince.apply(this, args);
    }, 1000);
  };
};

function getProvince() {
  invaildError[4].style.display = 'none';
  var correction = cityName.value.trim().toLowerCase().split(' ');
  for (var t = 0; t < correction.length; t++) {
    correction[t] = correction[t].charAt(0).toUpperCase() + correction[t].substring(1);
  };
  correction = correction.join(' ');
  correction = correction.toString();

  var overpassQuery = `
[out:json][timeout:25];
area["name"="${correction}"]["admin_level"="4"]->.searchArea;
relation["admin_level"="6"](area.searchArea);
out body;
`;
  var provinceLoading = document.getElementById('provinceLoading');
  selectBox[1].style.display = 'none';
  provinceLoading.src = 'img/loading.gif';
  provinceLoading.style.width = '30px';
  provinceLoading.style.height = '30px';
  selectInput[1].removeEventListener('click', saveFunctions[1]);

  fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: overpassQuery,
  })
    .then(res => res.json())
    .then(data => {
      if (data && data.elements.length > 0) {
        var places = data.elements
          .filter(el => el.tags && el.tags.name)
          .map(el => el.tags.name);
        selectBox[1].innerHTML = '';
        for (var i = 0; i < places.length - 1; i++) {
          var optionParent = document.createElement('div');
          optionParent.classList.add('provinceItem');
          selectBox[1].appendChild(optionParent);
          var option = document.createElement('p');
          option.textContent = places[i];
          optionParent.appendChild(option);
        };
        provinceItem = document.querySelectorAll('.provinceItem');
        clickEventForProvinceItem();
      } else if (data.elements.length <= 0) {
        selectBox[1].innerHTML = '';
        var optionParent = document.createElement('div');
        selectBox[1].appendChild(optionParent);
        var option = document.createElement('p');
        option.textContent = 'Select a city or town first';
        optionParent.appendChild(option);
      } else {
        invaildError[4].style.display = 'block';
      };
      provinceLoading.src = 'img/down-arrow1.svg';
      provinceLoading.removeAttribute('style');
      addingSelectionEvent();
    })
    .catch(err => {
      invaildError[4].style.display = 'block';
    });
};

var fetchCityOrTownName = requestTimeouting();
cityName.addEventListener('input', fetchCityOrTownName);

window.addEventListener('load', function () {
  if (cityName.value !== '') {
    fetchCityOrTownName()
  };
});
// checking data

//Changing payment method
var paymentMethods = document.querySelectorAll('.total__payment--n-active button');
var selectedMethodes = document.getElementById('payment--active');
paymentMethods.forEach(function (but, index) {
  but.onclick = function () {
    var buttonsTxt = document.querySelectorAll('.total__payment--n-active button>span:last-child');
    selectedMethodes.textContent = buttonsTxt[index].textContent;
    var methodDescription = document.getElementById('payment--active__description');
    if (index == 0) {
      methodDescription.textContent = 'Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped the funds have cleared in our account.'
    } else {
      methodDescription.textContent = 'Give cash to the postman when your products arrive.';
    }
  };
});