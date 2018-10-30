/*
* Functions to test for Homework Assignment #5
*
*/

// Dependencies
const helpers = require("./helpers");
const { URL } = require("url");
const http = require("http");

const lib = {};

lib.getRandomNumber = max => {
  max = typeof max === "number" && max > 0 ? max : 10;
  return Math.floor(Math.random() * max);
};

lib.getRandomCharacter = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const index = lib.getRandomNumber(chars.length);
  return chars.charAt(index);
};

// generate a random string
lib.getRandomString = length => {
  length = typeof length === "number" && length > 0 ? length : 1;
  let string = "";
  for (i = 0; i < length; i++) {
    string += lib.getRandomCharacter();
  }
  return string;
};

lib.createUserObj = (name, phone, age, email, address, tosAgreement, res) => {
  name = typeof "string" && name.trim().length > 0 ? name.trim() : false;
  phone = typeof "string" && phone.trim().length > 0 ? phone.trim() : false;
  age = typeof "number" && age > 0 ? age : false;
  email = helpers.validateEmail(email);
  address =
    typeof "string" && address.trim().length > 0 ? address.trim() : false;
  tosAgreement = typeof "boolean" && true ? true : false;
  if (name && phone && age && email && address && tosAgreement) {
    res({ name, phone, age, email, address, tosAgreement });
  } else {
    userObjectWithValidationErrors = {
      name,
      phone,
      age,
      email,
      address,
      tosAgreement
    };
    for (key in userObjectWithValidationErrors) {
      if (
        userObjectWithValidationErrors.hasOwnProperty(key) &&
        userObjectWithValidationErrors[key] === false
      ) {
        userObjectWithValidationErrors[key] = `${key} is invalid.`;
      }
    }
    res(userObjectWithValidationErrors);
  }
};

lib.calculateCartTotal = (cartArray, tax) => {
  const prices = [];
  cartArray.forEach(item => {
    for (key in item) {
      prices.push(item[key]);
    }
  });
  const cartSubTotal = prices.reduce((acc, cur) => acc + cur);
  const taxAmount = cartSubTotal * tax;
  const cartTotal = (cartSubTotal + taxAmount).toPrecision(3);
  return cartTotal;
};

lib.isPalindrome = str => {
  str =
    typeof str === "string" && str.trim().length > 0
      ? str.trim().toLowerCase()
      : false;
  const reverse = str
    .split("")
    .reverse()
    .join("");
  if (str && str === reverse) {
    return true;
  }
  return false;
};

// Determine if exactly 3 question marks appear between every two numbers that add up to 10.
// Examples:
// "arrb6???4xxbl5???eee5" => true
// "acc?7??sss?3rr1??????5" => true
// "5??aaaaaaaaaaaaaaaaaaa?5?5" => false
// "9???1???9???1???9" => true
// "aa6?9" => false
lib.questionMarksAndTen = str => {
  const pattern = /\d[a-z]*?\?{3}[a-z]*?\d/g;
  matches = [];
  while ((resultArray = pattern.exec(str)) !== null) {
    pattern.lastIndex--;
    matches.push(resultArray[0]);
  }
  let test = false;
  if (matches.length > 0) {
    matches.forEach(match => {
      test = parseInt(match[0]) + parseInt(match[match.length - 1]) === 10;
    });
  }
  return test;
};

module.exports = lib;
