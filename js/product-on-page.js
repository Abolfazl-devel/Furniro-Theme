'use strict';
function addingProductOnPage(selectImg, selectName, selectPrice, selectButton, checkWhite, checkBeNumber, number) {
  var addToCart = document.querySelectorAll(selectButton);
  addToCart.forEach(function (but, mainIndex) {
    but.onclick = function () {
      but.disabled = true;
      but.textContent = '';
      var successAddAnimation = document.createElement('img');
      if (checkWhite) {
        successAddAnimation.setAttribute('src', 'img/white-check.gif');
      } else {
        successAddAnimation.setAttribute('src', 'img/check.gif');
      };
      successAddAnimation.setAttribute('alt', 'successful');
      but.appendChild(successAddAnimation);
      if (localStorage.getItem('productsName') !== null) {
        var productImgUrl = JSON.parse(localStorage.getItem('imgUrl'));
        var productName = JSON.parse(localStorage.getItem('productsName'));
        var productPrice = JSON.parse(localStorage.getItem('productPrice'));
        var productNumber = JSON.parse(localStorage.getItem('productNumber'));

        function addItemToLocalstorageItem(select, specialArray, localItemName) {
          var x = document.querySelectorAll(select);
          if (!x.length) return;

          var value = (localItemName === 'imgUrl') ? x[mainIndex].src : x[mainIndex].textContent;
          console.log(value);

          var index = specialArray.indexOf(value);
          var isDuplicate = index !== -1;

          if (localItemName === 'productsName') {
            if (isDuplicate) {
              if (checkBeNumber) {
                productNumber[productNumber.length - 1] = (Number(productNumber[productNumber.length - 1]) + Number(number.textContent)).toString();
              } else {
                productNumber[productNumber.length - 1] = (Number(productNumber[productNumber.length - 1]) + 1).toString();
              };
            } else {
              specialArray.push(value);
              productNumber.push('1');
              localStorage.setItem(localItemName, JSON.stringify(specialArray));
            };
            return;
          };

          if (localItemName === 'imgUrl') {
            if (!isDuplicate) {
              specialArray.push(x[mainIndex].src);
              localStorage.setItem(localItemName, JSON.stringify(specialArray));
            };
            return;
          };

          if (localItemName === 'productNumber') {
            specialArray.push('1');
          } else {
            specialArray.push(x[mainIndex].textContent + '.00');
          };

          if (localItemName !== 'productsName') {
            localStorage.setItem(localItemName, JSON.stringify(specialArray));
          };
        };

        addItemToLocalstorageItem(selectImg, productImgUrl, 'imgUrl');
        addItemToLocalstorageItem(selectName, productName, 'productsName');
        addItemToLocalstorageItem(selectPrice, productPrice, 'productPrice');
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
        function setLocalstorageItem(select, localItemName) {
          if (localItemName == 'productNumber') {
            if (checkBeNumber) {
              localStorage.setItem(localItemName, JSON.stringify((number.textContent).split()));

            } else {
              localStorage.setItem(localItemName, JSON.stringify(('1').split()));
            };
          } else {
            var element = document.querySelectorAll(select);

            if (localItemName == 'imgUrl') {
              localStorage.setItem(localItemName, JSON.stringify(element[mainIndex].src.split()));
              console.log(element[mainIndex].src);
            } else if (localItemName == 'productPrice') {
              localStorage.setItem(localItemName, JSON.stringify((element[mainIndex].textContent + '.00').split()));
            } else {
              localStorage.setItem(localItemName, JSON.stringify(element[mainIndex].textContent.split()));
              console.log(element[mainIndex].textContent);
            };
          };
        };
        setLocalstorageItem(selectImg, 'imgUrl');
        setLocalstorageItem(selectName, 'productsName');
        setLocalstorageItem(selectPrice, 'productPrice');
        setLocalstorageItem('', 'productNumber');

      };
      window.postMessage('cart Changed');
      setTimeout(() => {
        successAddAnimation.remove();
        but.textContent = 'Add to cart';
        but.disabled = false;
      }, 3300);
    };
  });
};
addingProductOnPage();
export { addingProductOnPage };