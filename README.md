# Node.js Master Class Homework Assignment #5

The assignment is to create a library of functions, and write tests to validate them. This library validates the following functions:

- `lib.getRandomNumber(max)` - takes a max value and outputs a random number between zero and the max value
- `lib.getRandomCharacter()` - outputs a random character from a-z or from 0-10.
- `lib.getRandomString(length)` - takes a length and outputs a string of random characters of that length
- `lib.createUserObj(name, phone, age, email, address, tosAgreement, res)` - takes the required variables and calls back a validated user object
- `lib.calculateCartTotal(cartArray, tax)`- takes an array of items containing a key-value pair where the key is an item and the value is a numeric price, as well as a tax percentage (ie 0.15 being 15%) and returns the cart total including tax.
- `lib.isPalindrome(str)` - takes a string and returns a boolean indicating whether the string is a palindrome
- `lib.questionMarksAndTen` - a coding challeng from [Coderbyte](https://medium.com/coderbyte/the-5-hardest-code-challenges-for-beginners-e410da4474b) which takes a string and determines if the sum of every two numbers separated by exactly three "?" in sequence (and any other non-digit character) is 10.
- `helpers.validateEmail` - takes an e-mail and determines if it is a 'valid' e-mail address with characters before and after the @.
