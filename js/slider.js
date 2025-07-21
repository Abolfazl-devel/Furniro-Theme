'use strict';
var sliderItem = document.querySelectorAll('.slider__img');
var slider = document.getElementById('slider__imges');
var rightTranslateX = 0;
var ActiveSliderItem = document.querySelector('.slider__active');
var sliderItemSize = ActiveSliderItem.offsetWidth +30;

var sliderRightButton = document.getElementById('slider__button');
var sliderLittleBut = document.querySelectorAll('.slider__indicating span');

sliderRightButton.onclick = function () {
  slider.style.transition = 'all ease 0.7s';
  rightTranslateX -= sliderItemSize;
  slider.style.transform = `translateX(${rightTranslateX}px)`;
  console.log(slider.clientWidth);

  var saveActiveIndex = '';
  sliderItem.forEach(function (item, index) {
    if (item.classList.contains('slider__active')) {
      saveActiveIndex = index;
    };
  });
  console.log(rightTranslateX);
  console.log(sliderItemSize * 4);

  if (rightTranslateX == -sliderItemSize * 4) {
    setTimeout(() => {
      sliderItem[saveActiveIndex].classList.remove('slider__active');
      sliderItem[0].classList.add('slider__active');
      sliderItem[saveActiveIndex + 1].classList.add('slider__active');
    }, 500);
    sliderLittleBut.forEach(function (but) {
      but.classList.remove('active');
    });
    sliderLittleBut[0].classList.add('active');
    setTimeout(() => {
      slider.style.transition = 'none';
      sliderItem[saveActiveIndex + 1].classList.remove('slider__active');
      slider.style.transform = 'translateX(0px)'
      saveActiveIndex = 0;
      rightTranslateX = 0;
    }, 800);
  } else {
    sliderLittleBut.forEach(function (but) {
      but.classList.remove('active');
    });
    sliderLittleBut[saveActiveIndex + 1].classList.add('active');
    setTimeout(() => {
      console.log(slider.clientWidth);
      sliderItem[saveActiveIndex + 1].classList.add('slider__active');
      sliderItem[saveActiveIndex].classList.remove('slider__active');
    }, 500);
  };
};
