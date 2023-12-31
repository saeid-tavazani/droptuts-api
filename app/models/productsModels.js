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

const deleteHeadline = async (value) => {
  const [rows] = await connection.query(
    "DELETE FROM `headline` WHERE id=?",
    value
  );
  return rows;
};

const updateHeadline = async (value) => {
  const [rows] = await connection.query(
    "UPDATE `headline` SET `products_id`=?,`title`=? WHERE id=?",
    value
  );
  return rows;
};

const newSection = async (value) => {
  const [rows] = await connection.query(
    "INSERT INTO `section`(`headline_id`, `title`, `description`, `time`) VALUES (?,?,?,?)",
    value
  );
  return rows;
};

const selectSection = async (value) => {
  const [rows] = await connection.query(
    "SELECT * FROM `section` WHERE headline_id=?",
    value
  );
  return rows;
};

const updateSection = async (value) => {
  const [rows] = await connection.query(
    "UPDATE `section` SET `title`=?,`description`=?,`time`=? WHERE id=?",
    value
  );
  return rows;
};

const deleteSection = async (value) => {
  const [rows] = await connection.query(
    "DELETE FROM `section` WHERE WHERE id=?",
    value
  );
  return rows;
};

module.exports = {
  newProducts,
  selectProducts,
  deleteProducts,
  updateProducts,
  newHeadline,
  selectHeadline,
  deleteHeadline,
  updateHeadline,
  newSection,
  selectSection,
  updateSection,
  deleteSection,
};
