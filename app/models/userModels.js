const connection = require("../../database/mysql");

const selectUserActive = async (value) => {
  const [rows] = await connection.query(
    "SELECT * FROM `users` WHERE email=? LIMIT 1",
    value
  );
  return rows[0];
};

module.exports = { selectUserActive };
