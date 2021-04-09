const validateChat = (name, description) => {
  // empty errors object
  const errors = {};
  if (name.trim() === "") {
    errors.name = "Chat Name cant be empty";
  }
  if (description === "") {
    errors.description = "Description cant be empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  };
};

const validateMessage = (message) => {
  // empty errors object
  const errors = {};
  if (message === "") {
    errors.message = "Message cant be empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  };
};

module.exports.validateChat = validateChat;
module.exports.validateMessage = validateMessage;
