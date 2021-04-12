const pool = require("../../db");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server-errors");
const tokenGen = require("../../utility/tokens/tokenGen");
const {
  validateSignup,
  validateLogin,
} = require("../../utility/validators/userValidate");

module.exports = {
  Query: {},

  Mutation: {
    async signup(_, { name, email, password, confirmPassword }) {
      const { errors, isValid } = validateSignup(
        name,
        email,
        password,
        confirmPassword
      );

      if (!isValid) {
        throw new UserInputError("Errors", { errors });
      }

      const checkUserExist = await pool.query(
        "SELECT * FROM account WHERE email = $1",
        [email]
      );

      if (checkUserExist.rows.length > 0) {
        throw new UserInputError("Email is used already");
      }

      password = await bcrypt.hash(password, 12);

      const newUser = await pool.query(
        "INSERT INTO account (name, email, password) VALUES($1, $2, $3) RETURNING *",
        [name, email, password]
      );

      // Generates json token
      const token = tokenGen(newUser);

      return {
        ...newUser.rows[0],
        token,
      };
    },

    async login(_, { email, password }) {
      const { errors, isValid } = validateLogin(email, password);

      if (!isValid) {
        throw new UserInputError("Errors", { errors });
      }

      let checkUser = await pool.query(
        "SELECT * FROM account WHERE email = $1",
        [email]
      );

      if (checkUser.rows.length === 0) {
        throw new UserInputError("Email doesnt exist, Please Sign Up first");
      }

      const passwordCompare = await bcrypt.compare(
        password,
        checkUser.rows[0].password
      );

      if (!passwordCompare) {
        throw new UserInputError("Password is Incorrect");
      }

      const token = tokenGen(checkUser);

      return {
        ...checkUser.rows[0],
        token,
      };
    },
  },
};
