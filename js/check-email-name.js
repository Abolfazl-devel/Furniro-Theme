'use strict';
var invaildError = document.querySelectorAll('.form-error');

var checkEmail = true;
function checkEmailFn(emailId, index) {
  var email = document.getElementById(emailId);
  if (!/^[a-zA-Z][a-zA-Z0-9._%+-]*@(gmail\.com|yahoo\.com|outlook\.com|protonmail\.com|zoho\.com|icloud\.com|mail\.com|gmx\.com|aol\.com|yandex\.com|yandex\.ru|tutanota\.com|fastmail\.com|posteo\.de|mailfence\.com|hotmail\.com|ymail\.com)$/.test(email.value)) {
    invaildError[index].style.display = 'block';
    checkEmail = false;
  } else {
    checkEmail = true;
  };
};

var checkFirstName = true;
function checkName() {
  var firstName = document.getElementById('firstName');
  if (!/^[A-Za-z]{3,}$/.test(firstName.value)) {
    invaildError[0].style.display = 'block';
    checkFirstName = false;
  } else {
    checkFirstName = true;
  };
};

export { checkEmailFn, checkEmail, invaildError, checkName, checkFirstName };