'use strict';
var sliderItem = document.querySelectorAll('.slider__img');
var slider = document.getElementById('slider__imges');
var rightTranslateX = 0;
var ActiveSliderItem = document.querySelector('.slider__active');
var sliderItemSize = ActiveSliderItem.offsetWidth + 30;

var sliderRightButton = document.getElementById('slider__button');
var sliderLittleBut = document.querySelectorAll('.slider__indicating span');
function MoveSlider(witchIndex, witchIndex2) {
  if (rightTranslateX == -sliderItemSize * 4) {
    setTimeout(() => {
      sliderItem[witchIndex].classList.remove('slider__active');
      sliderItem[0].classList.add('slider__active');
      sliderItem[witchIndex2].classList.add('slider__active');
    }, 500);
    sliderLittleBut.forEach(function (but) {
      but.classList.remove('active');
    });
    sliderLittleBut[0].classList.add('active');
    setTimeout(() => {
      slider.style.transition = 'none';
      sliderItem[witchIndex2].classList.remove('slider__active');
      slider.style.transform = 'translateX(0px)'
      rightTranslateX = 0;
    }, 800);
  } else {
    sliderLittleBut.forEach(function (but) {
      but.classList.remove('active');
    });
    sliderLittleBut[witchIndex2].classList.add('active');
    setTimeout(() => {
      sliderItem[witchIndex2].classList.add('slider__active');
      sliderItem[witchIndex].classList.remove('slider__active');
    }, 500);
  };
};

sliderRightButton.onclick = function () {
  slider.style.transition = 'all ease 0.7s';
  rightTranslateX -= sliderItemSize;
  slider.style.transform = `translateX(${rightTranslateX}px)`;
  var saveActiveIndex = '';
  sliderItem.forEach(function (item, index) {
    if (item.classList.contains('slider__active')) {
      saveActiveIndex = index;
      MoveSlider(index, index + 1);
    };
  });
};

sliderLittleBut.forEach(function (but, index) {
  but.onclick = function () {
    sliderLittleBut.forEach(function (beforeBut) {
      beforeBut.classList.remove('active');
    });
    but.classList.add('active');
    if (rightTranslateX == -sliderItemSize * 3 && index == 0) {
      slider.style.transform = `translateX(${-sliderItemSize * 4}px)`;
      setTimeout(() => {
        sliderItem[3].classList.remove('slider__active');
        sliderItem[0].classList.add('slider__active');
        sliderItem[4].classList.add('slider__active');
      }, 500);
      sliderLittleBut.forEach(function (but) {
        but.classList.remove('active');
      });
      sliderLittleBut[0].classList.add('active');
      setTimeout(() => {
        slider.style.transition = 'none';
        sliderItem[4].classList.remove('slider__active');
        slider.style.transform = 'translateX(0px)'
        rightTranslateX = 0;
      }, 800);
    } else {
      var workOnFirst = '';
      sliderItem.forEach(function (item, itemIndex) {
        if (item.classList.contains('slider__active')) {
          workOnFirst = itemIndex;
        };
      });
      slider.style.transition = 'all ease 0.7s';
      slider.style.transform = `translateX(${-sliderItemSize * index}px)`;
      MoveSlider(workOnFirst, index);
    };
    rightTranslateX = -sliderItemSize * index;
  };
});