'use strict';
// Delete product
function removeProduct(deleteButton, secoundPartClass) {
  var deleteProduct = document.querySelectorAll(deleteButton);
  deleteProduct.forEach(function (del, index) {
    del.onclick = function () {
      var comparisonBox = document.querySelectorAll('.products-description > div');
      comparisonBox[index + 1].remove();
      var mobileComparisonBox = document.querySelectorAll(`.products-description__description div:nth-child(${index + 1})`);
      console.log(mobileComparisonBox);

      mobileComparisonBox.forEach(function (box) {
        box.remove();
      });
      var product = document.querySelectorAll(secoundPartClass);
      product[index].parentElement.remove();
      del.parentElement.remove();
      deleteProduct = document.querySelectorAll('.compair-products__product--close');
      removeProduct(deleteButton, secoundPartClass);
    };
  });
};
removeProduct('.compair-products .compair-products__product--close', '.compair-products-mobile .compair-products__product--close');
removeProduct('.compair-products-mobile .compair-products__product--close', '.compair-products .compair-products__product--close');