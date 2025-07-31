'use strict';

function changePageEvent(con, checkShopPage, filterParent) {
  var changingPage = document.querySelectorAll('.product-box__indicating > button');

  changingPage.forEach(function (but) {
    but.onclick = function () {
      console.log(con);
      function removeActive() {
        changingPage.forEach(function (numBut) {
          numBut.removeAttribute('class');
          numBut.disabled = false;
        });
      };

      var index = '';
      function getActiveButtonIndex() {
        changingPage.forEach(function (numBut, i) {
          if (numBut.classList.contains('product-box__indicating--active')) {
            index = i;
          };
        });
      };


      function loading() {
        var loadFiles = document.getElementById('fileLoading');
        console.log(con);
        con.style.display = 'none';
        if (!checkShopPage) {
          var loadingParent = document.getElementById('loadingParent');
          loadingParent.style.display = 'flex';
        };
        loadFiles.style.display = 'block';
        var divceSize = window.innerWidth;
        setTimeout(() => {
          if (!checkShopPage) {
            var loadingParent = document.getElementById('loadingParent');
            loadingParent.style.display = 'none';
            if (divceSize <= 1100) {
              con.style.display = 'flex';
              loadingParent.style.width = '100%';
            } else {
              con.style.display = 'block';
              loadingParent.style.width = '75%';
            };
          } else {
            con.style.display = 'block';
          };
          loadFiles.style.display = 'none';
        }, 2000);
      };

      var pageChangingParent = document.getElementById('product-box__indicating');

      function showlastOrFirstPage(notNumberButtClass, butTXT, removingBut, insertBeforeDiv, lastOrFirst) {
        var notNumberButt = document.querySelector(notNumberButtClass);
        notNumberButt.style.display = 'flex';
        lastOrFirst.style.display = 'none';
        var createNewButton = document.createElement('button');
        createNewButton.textContent = butTXT;
        pageChangingParent.appendChild(createNewButton);
        pageChangingParent.insertBefore(createNewButton, insertBeforeDiv);
        removingBut.remove();
        changingPage = document.querySelectorAll('.product-box__indicating > button');
      };

      function visiableNotNumberButton(activeBut, condition, notNumberButtClass, butTXT, removingBut, insertBeforeDiv) {
        activeBut.classList.add('product-box__indicating--active');
        activeBut.disabled = true;
        if (condition == undefined) {
          showlastOrFirstPage(notNumberButtClass, butTXT, removingBut, insertBeforeDiv, but);
          changePageEvent(con);
        };
      };
      switch (but.textContent) {
        case ' Next ':
          getActiveButtonIndex();
          removeActive();
          visiableNotNumberButton(changingPage[index + 1], changingPage[index + 3], '.product-box__indicating > button:first-child', Number(changingPage[changingPage.length - 2].textContent) + 1, changingPage[(changingPage.length - changingPage.length) + 1], but);
          loading();
          break;

        case ' Previous ':
          getActiveButtonIndex();
          removeActive();
          visiableNotNumberButton(changingPage[index - 1], changingPage[index - 4], '.product-box__indicating > button:last-child', Number(changingPage[(changingPage.length - changingPage.length) + 2].textContent) - 2, changingPage[changingPage.length - 2], document.querySelector('.product-box__indicating > button:nth-child(2)'));
          loading();
          break;

        default:
          removeActive();
          but.classList.add('product-box__indicating--active');
          getActiveButtonIndex();
          if (changingPage[index + 2] == undefined) {
            showlastOrFirstPage('.product-box__indicating > button:first-child', Number(changingPage[changingPage.length - 2].textContent) + 1, changingPage[(changingPage.length - changingPage.length) + 1], document.querySelector('.product-box__indicating > button:last-child'), document.querySelector('.product-box__indicating > button:last-child'));
          } else if (changingPage[index - 2] == undefined) {
            showlastOrFirstPage('.product-box__indicating > button:last-child', Number(changingPage[(changingPage.length - changingPage.length) + 2].textContent) - 2, changingPage[changingPage.length - 2], document.querySelector('.product-box__indicating > button:nth-child(2)'), document.querySelector('.product-box__indicating > button:first-child'));
          };
          but.disabled = true;
          loading();
          break;
      };
      if (checkShopPage) {
        localStorage.setItem('applyFilterOnProduct', con.innerHTML);
        localStorage.setItem('whatFilterUse', filterParent.innerHTML);
      };
      var productParentPositionToScroll = con.getBoundingClientRect();
      window.scrollTo(productParentPositionToScroll.top, 0);
    };
  });
};
export { changePageEvent };