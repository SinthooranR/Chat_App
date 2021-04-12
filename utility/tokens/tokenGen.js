const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../env");

const tokenGen = (user) => {
  const data = {
    user_id: user.rows[0].user_id,
    name: user.rows[0].name,
    email: user.rows[0].email,
  };

  return jwt.sign(data, SECRET_KEY, { expiresIn: "1h" });
};

module.exports = tokenGen;
