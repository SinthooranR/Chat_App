const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
require("dotenv").config();

module.exports = (context) => {
  const header = context.req.headers.authorization;
  if (header) {
    // Bearer ...
    const token = header.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Token either Invalid or Expired");
      }
    }
    throw new Error("Authentication NOT VALID");
  }
  throw new Error("Authentication header NOT PROVIDED");
};
