const connection = require("../../database/mysql");

const newOrders = async (value) => {
  const [rows] = await connection.query(
    "INSERT INTO `orders`(`products_id`, `user_id`) VALUES (?,?)",
    value
  );
  return rows;
};

const selectOrders = async (value) => {
  const [rows] = await connection.query(
    "SELECT orders.id, users.full_name, users.email, products.* FROM `orders` INNER JOIN products ON orders.products_id = products.id INNER JOIN users ON users.id = orders.user_id WHERE users.id=1 GROUP BY users.id ,products.id",
    value
  );
  return rows;
};

const deleteOrders = async (value) => {
  const [rows] = await connection.query(
    "DELETE FROM `orders` WHERE id=?",
    value
  );
  return rows;
};

module.exports = {
  newOrders,
  selectOrders,
  deleteOrders,
};
