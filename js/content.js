'use strict';
// Import check email and invalid errors
import { checkEmail, invaildError, checkEmailFn, checkName, checkFirstName } from "./check-email-name.js";
// Import check email and invalid errors

var sendEmailForm = document.getElementById('send-email');

sendEmailForm.onsubmit = function (event) {
  event.preventDefault();

  checkName();

  checkEmailFn('send-email__email', 1);

  var description = document.getElementById('send-email__description');
  var checkDescription = false;
  if (description.value.length < 25) {
    invaildError[2].style.display = 'block';
  } else {
    invaildError[2].style.display = 'none';
    checkDescription = true;
  };
  if (checkEmail && checkFirstName && checkDescription) {
    var smallLoading = document.getElementById('send-email__loading');
    smallLoading.style.display = 'flex';
    setTimeout(() => {
      suceess.style.display = 'flex';
      var suceessGif = suceess.querySelector('img');
      suceessGif.src = 'img/check.gif';
    }, 2000);
    var suceess = document.getElementById('loading');
    setTimeout(() => {
      suceess.style.display = 'none';
      smallLoading.style.display = 'none';
      sendEmailForm.reset();
    }, 5000);
  };
};