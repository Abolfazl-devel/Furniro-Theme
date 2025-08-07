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
// Delete product

// Choose product
var chooseProductBut = document.querySelectorAll('.chooseProductBut');
var chooseProductSelection = document.querySelectorAll('.compair-products__add-product--menu');

chooseProductBut.forEach(function (but) {
  but.onclick = function (event) {
    event.stopPropagation();
    chooseProductSelection.forEach(function (selection) {
      if (selection.style.display == 'none') {
        selection.style.display = 'block';
      } else {
        selection.style.display = 'none';
      };
    });
  };
});

window.addEventListener('click', function () {
  chooseProductSelection.forEach(function (selection) {
    selection.style.display = 'none';
  });
});

var chooseProductSelectionOption = document.querySelectorAll('.compair-products__add-product--menu p');
chooseProductSelectionOption.forEach(function (option) {
  option.onclick = function () {
    function addProduct(html, productClass) {
      var product = document.querySelectorAll(productClass);
      product[product.length - 1].insertAdjacentHTML("afterend", html);

    };
    function addProductsDetails(descriptionHtml, detail0, detail1, detail2, detail3, detail4, detail5, detail6, detail7, detail8, detail9, detail10, detail11, detail12, detail13, detail14, detail15, detail16, detail17, detail18, detail19, detail20, detail21) {
      var allDetails = [detail0, detail1, detail2, detail3, detail4, detail5, detail6, detail7, detail8, detail9, detail10, detail11, detail12, detail13, detail14, detail15, detail16, detail17, detail18, detail19, detail20, detail21];
      var comparisonBox = document.querySelectorAll('.products-description > div');
      comparisonBox[comparisonBox.length - 1].insertAdjacentHTML("afterend", descriptionHtml);
      var descriptionBox = document.querySelectorAll('.products-description__description');
      for (var i = 0; i < descriptionBox.length; i++) {
        var productDetailParent = document.createElement('div');
        descriptionBox[i].appendChild(productDetailParent);
        var productDetail = document.createElement('p');
        productDetail.textContent = allDetails[i];
        productDetailParent.appendChild(productDetail);
      };
    }

    if (option.textContent == '  Asgaard sofa  ') {

      function runAddProduct1(productClass) {
        addProduct(`<div class="compair-products__product">

            <div class="compair-products__product--close">
              <img src="img/Close2.svg" alt="">
            </div>

            <div class="compair-products__product--img">

              <img src="img/sofa5-medium.png">

            </div>

            <div class="compair-products__product--name">

              <h6> Asgaard sofa </h6>

            </div>

            <div class="compair-products__product--price">

              <p> Rs.250,000.00 </p>

            </div>

            <div class="compair-products__product--score">

              <div>

                <span> 4.7 </span>

                <img src="img/star.svg">

                <img src="img/star.svg">

                <img src="img/star.svg">

                <img src="img/star.svg">

                <img src="img/half-star.svg">

              </div>

              <div>

                <span> 204 Review </span>

              </div>

            </div>

          </div>`, productClass);
      };

      runAddProduct1('.compair-products .compair-products__product');
      runAddProduct1('.compair-products-mobile .compair-products__product');
      addProductsDetails(`<div>

          <div>

            <p> 1 sectional sofa </p>

            <p> TFCBLIGRBL6SRHS </p>

            <p> Solid Wood </p>

            <p> L-shaped </p>

            <p> Fabric + Cotton </p>

            <p> Bright Gray & Lion </p>

          </div>

          <div>

            <p> Foam </p>

            <p> Bright Gray & Lion </p>

            <p> No </p>

            <p> 280 KG </p>

            <p> India </p>

          </div>

          <div>

            <p> 265.32 cm </p>

            <p> 76 cm </p>

            <p> 167.76 cm </p>

            <p> 45 KG </p>

            <p> 41.52 cm </p>

            <p> 5.46 cm </p>

          </div>

          <div>

            <p> 1 Year Manufacturing Warranty </p>

            <p> For Warranty Claims or Any Product Related Issues Please Email at operations@trevifurnitu <br> re.com

            </p>

            <p> Warranty Against Manufacturing Defect </p>

            <p> The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear

              In The Natural Course Of Product Usage. </p>

            <p> 1 Year </p>

            <button> Add To Cart </button>

          </div>

        </div>`, '1 sectional sofa', 'TFCBLIGRBL6SRHS', ' Solid Wood ', ' L-shaped ', ' Fabric + Cotton ', ' Bright Gray & Lion ', 'Foam', ' Bright Gray & Lion ', ' No ', ' 280 KG ', 'India', ' 265.32 cm ', ' 76 cm ', ' 167.76 cm ', ' 45 KG ', ' 41.52 cm ', ' 5.46 cm ', ' 1 Year Manufacturing Warranty ', `For Warranty Claims or Any Product Related Issues Please Email at operations@trevifurnitu
re.com `, ' Warranty Against Manufacturing Defect ', ' The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage. ', ' 1 Year ');

    } else {
      function runAddProduct2(productClass) {
        addProduct(`<div class="compair-products__product">

            <div class="compair-products__product--close">
              <img src="img/Close2.svg" alt="">
            </div>

            <div class="compair-products__product--img">

              <img src="img/sofa9.png">

            </div>

            <div class="compair-products__product--name">

              <h6> Outdoor sofa set </h6>

            </div>

            <div class="compair products__product--price">

              <p> Rs.224,000.00 </p>

            </div>

            <div class="compair-products__product--score">

              <div>

                <span> 4.2 </span>

                <img src="img/star.svg">

                <img src="img/star.svg">

                <img src="img/star.svg">

                <img src="img/star.svg">

                <img src="img/half-star.svg">

              </div>

              <div>

                <span> 145 Review </span>

              </div>

            </div>

          </div>`, productClass);
      };
      runAddProduct2('.compair-products .compair-products__product');
      runAddProduct2('.compair-products-mobile .compair-products__product');
      addProductsDetails(`<div>

          <div>

            <p> 1 Three Seater,2 Single Seater </p>

            <p> DTUBLIGRBL568 </p>

            <p> Solid Wood </p>

            <p> L-shaped </p>

            <p> Fabric + Cotton </p>

            <p> Bright Gray & Lion </p>

          </div>

          <div>

            <p> Matte </p>

            <p> Bright Gray & Lion </p>

            <p> yes </p>

            <p> 300 KG </p>

            <p> India </p>

          </div>

          <div>

            <p> 265.32 cm </p>

            <p> 76 cm </p>

            <p> 167.76 cm </p>

            <p> 65 KG </p>

            <p> 41.52 cm </p>

            <p> 5.46 cm </p>

          </div>

          <div>

            <p> 1.2 Year Manufacturing Warranty</p>

            <p> For Warranty Claims or Any Product Related Issues Please Email at support@xyz.com </p>

            <p> Warranty of the product is limited to manufacturing defect only. </p>

            <p> The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear &

              Course Of Product Usage. </p>

            <p> 3 Months </p>

            <button> Add to Cart </button>

          </div>

        </div>`, ' 1 Three Seater,2 Single Seater ', 'DTUBLIGRBL568', ' Solid Wood ', ' L-shaped ', ' Fabric + Cotton ', ' Bright Gray & Lion ', 'Matte', ' Bright Gray & Lion ', ' yes ', ' 300 KG ', ' India ', ' 265.32 cm ', ' 76 cm ', ' 167.76 cm ', ' 65 KG ', ' 41.52 cm ', ' 5.46 cm ', ' 1.2 Year Manufacturing Warranty', ' For Warranty Claims or Any Product Related Issues Please Email at support@xyz.com ', ' Warranty of the product is limited to manufacturing defect only. ', ' The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Course Of Product Usage. ', ' 3 Months ');
    };
    function removeAndAddSelection(displayType) { }
    chooseProductBut.forEach(function (selection) {
      selection.parentElement.style.display = displayType;
    });

    if (document.querySelectorAll('.compair-products .compair-products__product').length >= 3) {
      removeAndAddSelection('none');
    };

    removeProduct('.compair-products .compair-products__product--close', '.compair-products-mobile .compair-products__product--close');
    removeProduct('.compair-products-mobile .compair-products__product--close', '.compair-products .compair-products__product--close');
  };
});