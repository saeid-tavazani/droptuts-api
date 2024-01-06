const connection = require("../../database/mysql");

const newComment = async (value) => {
  const [rows] = await connection.query(
    "INSERT INTO `comment`(`user_id`, `products_id`, `description`) VALUES (?,?,?)",
    value
  );
  return rows;
};

const deleteComment = async (value) => {
  const [rows] = await connection.query(
    "DELETE FROM `comment` WHERE id=?",
    value
  );
  return rows;
};

const activeComment = async (value) => {
  const [rows] = await connection.query(
    "UPDATE `comment` SET `status`='active' WHERE id=?",
    value
  );
  return rows;
};

const getComment = async (value) => {
  const [rows] = await connection.query(
    "SELECT * FROM `comment` INNER JOIN `users` ON users.id = comment.user_id INNER JOIN `comment` c ON c.parent_comment = comment.id  WHERE comment.products_id=? GROUP BY comment.id",
    value
  );
  return rows;
};

const addreplyComment = async (value) => {
  const [rows] = await connection.query(
    "INSERT INTO `comment`(`user_id`, `products_id`, `description`, `status`, `parent_comment`) VALUES (?,?,?,'active',?)",
    value
  );
  return rows;
};

module.exports = {
  newComment,
  deleteComment,
  activeComment,
  getComment,
  addreplyComment,
};
