module.exports.convert = convert;

const firstDigit = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen'
];

const secondDigit = [
    '',
    '',
    'twenty',
    'thrity',
    'fourty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety'
];

const ONE = 1;
const TEN = 10;
const HUNDRED = 100;
const THOUSAND = 1000;
const LAKH = 100000;
const CRORE = 10000000;

/**
 * 
 * @param {number} number 
 * @returns {string}
 */
function findSuffix(number) {
    let suffix = '';
    if (number < ONE) {
        suffix = ' and ' + findText(parseInt((number * 100).toFixed(2), 10)) + ' paisa';
        number = 0;
    } else if (number < TEN) {
        suffix = findText(number) + ' rupee ';
        number = Math.floor((number % 1) * 100) / 100
    } else if (number < HUNDRED) {
        const temp = number;
        suffix = findText(temp) + ' rupee ';
        number = number % ONE;
    } else if (number < THOUSAND) {
        const temp = number / HUNDRED;
        suffix = findText(temp) + ' hundred ';
        number = number % HUNDRED;
    } else if (number < LAKH) {
        const temp = number / THOUSAND;
        suffix = findText(temp) + ' thousand ';
        number = number % THOUSAND;
    } else if (number < CRORE) {
        const temp = number / LAKH;
        suffix = findText(temp) + ' lakh ';
        number = number % LAKH;
    } else if (number > CRORE) {
        const temp = number / CRORE;
        suffix = findSuffix(Math.floor(temp)) + ' crore ';
        number = number % CRORE;
    }
    if (number > 0) {
        return suffix + findSuffix(number);
    } else {
        return suffix;
    }
}

/**
 * 
 * @param {number} number 
 * @returns {string}
 */
function findText(number) {
    const noOfDigits = Math.log(number) * Math.LOG10E + 1 | 0;
    const floor = Math.floor(number);
    if (noOfDigits > 1 && floor > 19) {
        return secondDigit[Math.floor(floor / 10)] + ' ' + firstDigit[Math.floor(floor % 10)];
    } else {
        return firstDigit[floor];
    }
}

/**
 * 
 * @param {number|string} number 
 * @returns {string}
 */
function convert(number) {
    if (typeof number === 'string') {
        number = parseFloat(number);
    }
    const words = findSuffix(number).split(' ').filter(e => e);
    const indexes = words.map((e, i) => e == 'rupee' ? i : null).filter(e => e).reverse();
    if (indexes.length > 1) {
        for (let i = 1; i < indexes.length; i++) {
            words.splice(indexes[i], 1);
        }
    }
    return words.join(' ');
}