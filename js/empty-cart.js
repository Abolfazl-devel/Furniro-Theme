'use strict';
function displayEmptyCard(parent, emptyDiv) {
  if (localStorage.getItem('productsName') == '[]') {
    var productsParent = document.getElementById(parent);
    productsParent.style.display = 'none';
    var emptyCard = document.getElementById(emptyDiv);
    emptyCard.style.display = 'flex';
  };
};
export { displayEmptyCard };