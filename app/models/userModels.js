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
  return rows;
};
const updateUser = async (value) => {
  const [rows] = await connection.query(
    "UPDATE `users` SET `full_name`=?,`email`=?,`password`=? WHERE id=?",
    value
  );
  return rows;
};
const deleteUser = async (value) => {
  const [rows] = await connection.query(
    "DELETE FROM `users` WHERE id=?",
    value
  );
  return rows;
};

module.exports = { selectUser, newUser, updateUser, deleteUser };
