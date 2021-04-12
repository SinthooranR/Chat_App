const validateSignup = (name, email, password, confirmPassword) => {
  // empty errors object
  const errors = {};

  if (name.trim() === "") {
    errors.name = "Name cant be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email cant be empty";
  } else {
    const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regex)) {
      errors.email = "Not an email address";
    }
  }

  if (password === "" || password.length < 6 || password.length > 14) {
    errors.password = "Password must be between 6-14 characters";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords dont Match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  };
};

const validateLogin = (email, password) => {
  // empty errors object
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email cant be empty";
  } else {
    const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regex)) {
      errors.email = "Not an email address";
    }
  }

  if (password === "") {
    errors.password = "Password cant be empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  };
};

module.exports.validateSignup = validateSignup;
module.exports.validateLogin = validateLogin;
