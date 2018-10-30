/*
* Lib tests
*
*/

// Dependencies
const assert = require("assert");
const lib = require("../app/lib");
const helpers = require("../app/helpers");

// Application Logic
const _app = {};

// Containers for test
_app.tests = {};
_app.tests.lib = {};
_app.tests.helpers = {};

// Count number of tests
_app.countTests = () => {
  let counter = 0;
  for (test in _app.tests) {
    if (_app.tests.hasOwnProperty(test)) {
      let subTests = _app.tests[test];
      for (subTest in subTests) {
        if (subTests.hasOwnProperty(subTest)) {
          counter++;
        }
      }
    }
  }
  return counter;
};

// Lib Tests
_app.tests.lib["lib.getRandomNumber should return a number"] = done => {
  const val = lib.getRandomNumber();
  assert.equal(typeof val, "number");
  done();
};

_app.tests.lib[
  "lib.getRandomCharacter should return a random character"
] = done => {
  const val = lib.getRandomCharacter();
  assert.equal(typeof val, "string");
  done();
};

_app.tests.lib["lib.getRandomString should return a string"] = done => {
  const val = lib.getRandomString();
  assert.equal(typeof val, "string");
  done();
};

_app.tests.lib[
  "lib.createUserObj('John Doe', '0938396003', 34, 'johndoe.com', '32 Doe Place', true) should return a user object with 'email is invalid' as the value of 'email'"
] = done => {
  lib.createUserObj(
    "John Doe",
    "0938396003",
    34,
    "johndoe.com",
    "32 Doe Place",
    true,
    res => {
      assert.equal(res.email, "email is invalid.");
      done();
    }
  );
};

_app.tests.lib[
  "lib.calculateCartTotal([{coke: 1.50},{water: 1.00}], 0.10) should return '2.75'"
] = done => {
  const total = lib.calculateCartTotal([{ coke: 1.5 }, { water: 1.0 }], 0.1);
  assert.equal(total, 2.75);
  done();
};

_app.tests.lib['lib.isPalindrome("fizz") should return FALSE.'] = done => {
  assert.equal(lib.isPalindrome("fizz"), false);
  done();
};
_app.tests.lib[
  'lib.isPalindrome("Tattarrattat") should return TRUE.'
] = done => {
  assert.equal(lib.isPalindrome("Tattarrattat"), true);
  done();
};

_app.tests.lib[
  'lib.questionMarksAndTen("arrb6???4xxbl5???eee5") should return TRUE.'
] = done => {
  const val = lib.questionMarksAndTen("arrb6???4xxbl5???eee5");
  assert.equal(val, true);
  done();
};
_app.tests.lib[
  'lib.questionMarksAndTen("acc?7??sss?3rr1??????5") should return FALSE.'
] = done => {
  const val = lib.questionMarksAndTen("acc?7??sss?3rr1??????5");
  assert.equal(val, false);
  done();
};
_app.tests.lib[
  'lib.questionMarksAndTen("5??aaaaaaaaaaaaaaaaaaa?5?5") should return FALSE.'
] = done => {
  const val = lib.questionMarksAndTen("5??aaaaaaaaaaaaaaaaaaa?5?5");
  assert.equal(val, false);
  done();
};
_app.tests.lib[
  'lib.questionMarksAndTen("9???1???9???1???9") should return TRUE.'
] = done => {
  const val = lib.questionMarksAndTen("9???1???9???1???9");
  assert.equal(val, true);
  done();
};
_app.tests.lib[
  'lib.questionMarksAndTen("aa6?9") should return FALSE.'
] = done => {
  const val = lib.questionMarksAndTen("aa6?9");
  assert.equal(val, false);
  done();
};
_app.tests.lib[
  'lib.questionMarksAndTen("aa1???9") should return TRUE.'
] = done => {
  const val = lib.questionMarksAndTen("aa1???9");
  assert.equal(val, true);
  done();
};

// Helpers Tests
_app.tests.helpers[
  "helpers.validateEmail(joe@email.com) should return TRUE."
] = done => {
  const emailIsValid = helpers.validateEmail("joe@email.com");
  assert.ok(emailIsValid);
  done();
};
_app.tests.helpers[
  "helpers.validateEmail(joe.email.com) should return FALSE."
] = done => {
  const emailIsValid = helpers.validateEmail("joe.email.com");
  assert.ok(!emailIsValid);
  done();
};

_app.produceTestReport = (limit, successes, errors) => {
  console.log("");
  console.log("------------------ BEGIN TEST REPORT --------------------");
  console.log("");
  console.log("Total tests:", limit);
  console.log("Passes:", successes);
  console.log("Errors:", errors.length);
  console.log("");
  if (errors.length > 0) {
    console.log("------------------ BEGIN ERROR DETAILS ------------------");
    console.log("");
    errors.forEach(testError => {
      console.log("\x1b[31m%s\x1b[0m", testError.name);
      console.log(testError.error);
      console.log("");
    });
    console.log("------------------ END ERROR DETAILS --------------------");
  }
  console.log("");
  console.log("------------------ END TEST REPORT ----------------------");
  process.exit(0);
};

// App Test Function
_app.runTests = () => {
  console.log("");
  console.log("-------------------- BEGIN TESTS ------------------------");
  const errors = [];
  let successes = 0;
  let counter = 0;
  const limit = _app.countTests();
  for (testKey in _app.tests) {
    if (_app.tests.hasOwnProperty(testKey)) {
      const subTests = _app.tests[testKey];
      for (testName in subTests) {
        if (subTests.hasOwnProperty(testName)) {
          (() => {
            const tmpTestName = testName;
            const testValue = subTests[testName];
            try {
              testValue(() => {
                // If it calls back without throwing then it succeeded.
                console.log("\x1b[32m%s\x1b[0m", tmpTestName);
                counter++;
                successes++;
                if (counter === limit) {
                  console.log(
                    "--------------------- END TESTS -------------------------"
                  );
                  _app.produceTestReport(limit, successes, errors);
                }
              });
            } catch (e) {
              errors.push({
                name: testName,
                error: e
              });
              console.log("\x1b[31m%s\x1b[0m", tmpTestName);
              counter++;
              if (counter === limit) {
                console.log(
                  "--------------------- END TESTS -------------------------"
                );
                _app.produceTestReport(limit, successes, errors);
              }
            }
          })();
        }
      }
    }
  }
  console.log("");
};

// Run the tests.
_app.runTests();
