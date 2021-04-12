const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenGen = (user) => {
  const data = {
    user_id: user.rows[0].user_id,
    name: user.rows[0].name,
    email: user.rows[0].email,
  };

  return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1h" });
};

module.exports = tokenGen;
