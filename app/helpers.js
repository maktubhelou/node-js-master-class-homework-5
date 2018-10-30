// Container

const helpers = {};

helpers.validateEmail = email => {
  email =
    typeof email === "string" && email.includes("@") && email.trim().length > 4
      ? email.trim()
      : false;
  return email;
};

module.exports = helpers;
