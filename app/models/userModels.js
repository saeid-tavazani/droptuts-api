const connection = require("../../database/mysql");

const selectUser = async (value) => {
  const [rows] = await connection.query(
    "SELECT * FROM `users` WHERE email=? LIMIT 1",
    value
  );
  return rows[0];
};
const newUser = async (value) => {
  const [rows] = await connection.query(
    "INSERT INTO `users`(`full_name`, `email`, `password`) VALUES (?,?,?)",
    value
  );
  return rows[0];
};

module.exports = { selectUser, newUser };
