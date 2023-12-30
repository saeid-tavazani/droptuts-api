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
    "UPDATE `products` SET `title`=?,`description`=?,`poster`=?,`price`=?,`discount`=? WHERE id=?",
    value
  );
  return rows;
};

const newHeadline = async (value) => {
  const [rows] = await connection.query(
    "INSERT INTO `headline`(`products_id`, `title`) VALUES (?,?)",
    value
  );
  return rows;
};

const selectHeadline = async (value) => {
  const [rows] = await connection.query("SELECT * FROM `headline`", value);
  return rows;
};

module.exports = {
  newProducts,
  selectProducts,
  deleteProducts,
  updateProducts,
  newHeadline,
  selectHeadline,
};
