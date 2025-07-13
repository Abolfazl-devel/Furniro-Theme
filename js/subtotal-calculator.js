'use strict';

var calcutionSubtotal = '';
var calcutionSubtotalStep2 = '';

function subtotalCalculator(num, price) {
    var numericPrice = price.replace(/\D+/g, '');

    var subtotal = Number(numericPrice) * Number(num);
    calcutionSubtotal = subtotal.toString().replace('00', '');
    var subtotalFixed = Number(calcutionSubtotal).toFixed(2);

    var parts = subtotalFixed.split('.');    
    var integerPart = parts[0];
    var decimalPart = parts[1];
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    calcutionSubtotal = integerPart;
    calcutionSubtotalStep2 = [decimalPart];
};

export { calcutionSubtotal, subtotalCalculator, calcutionSubtotalStep2 };
