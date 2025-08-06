'use strict';
// Delete product
var deleteProduct = document.querySelectorAll('.compair-products__product--close');
function removeProduct() {
  deleteProduct.forEach(function (del, index) {
    del.onclick = function () {
      var comparisonBox = document.querySelectorAll('.products-description > div');
      comparisonBox[index + 1].remove();
      var mobileComparisonBox = document.querySelectorAll(`.products-description__description div:nth-child(${index + 1})`);
      console.log(mobileComparisonBox);

      mobileComparisonBox.forEach(function (box) {
        box.remove();
      });
      var product = document.querySelectorAll('.compair-products__product');
      product[deleteProduct.length].remove();
      del.parentElement.remove();
      deleteProduct = document.querySelectorAll('.compair-products__product--close');
      removeProduct();
    };
  });
};
removeProduct();
