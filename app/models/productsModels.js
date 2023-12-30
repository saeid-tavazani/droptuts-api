const connection = require("../../database/mysql");

const newProducts = async (value) => {
  const [rows] = await connection.query(
    "INSERT INTO `products`(`title`, `description`, `poster`, `price`, `discount`) VALUES (?,?,?,?,?)",
    value
  );
  return rows;
};

const selectProducts = async (value) => {
  const [rows] = await connection.query("SELECT * FROM `products`", value);
  return rows;
};

const deleteProducts = async (value) => {
  const [rows] = await connection.query(
    "DELETE FROM `products` WHERE id=?",
    value
  );
  return rows;
};

const updateProducts = async (value) => {
  const [rows] = await connection.query(
    "UPDATE `products` SET `title`=?,`description`=?,`poster`=?,`price`=?,`discount`=? WHERE 1 WHERE id=?",
    value
  );
  return rows;
};

module.exports = {
  newProducts,
  selectProducts,
  deleteProducts,
  updateProducts,
};
