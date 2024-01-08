const express = require("express");
const { auth } = require("../middlewares/auth");
const {
  validator,
  idValidator,
  customMadeValidator,
} = require("../middlewares/validator");
const {
  activeComment,
  deleteComment,
  addreplyComment,
  getComment,
  newComment,
} = require("../controllers/commentController");

const router = express.Router();

router.post(
  "/new",
  [
    auth,
    validator([
      idValidator("body", "userId").notEmpty(),
      idValidator("body", "productId").notEmpty(),
      customMadeValidator("description"),
    ]),
  ],
  newComment
);

router.get("/", [auth, validator([idValidator().notEmpty()])], getComment);

router.delete(
  "/",
  [auth, validator([idValidator().notEmpty()])],
  deleteComment
);
router.put("/", [auth, validator([idValidator().notEmpty()])], activeComment);

router.post(
  "/reply",
  [
    auth,
    validator([
      idValidator("body", "userId").notEmpty(),
      idValidator("body", "productId").notEmpty(),
      idValidator("body", "commentId").notEmpty(),
      customMadeValidator("description"),
    ]),
  ],
  addreplyComment
);

module.exports = router;
