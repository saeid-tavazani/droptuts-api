const express = require("express");
const { auth } = require("../middlewares/auth");
const {
  validator,
  emailValidator,
  passValidator,
  customMadeValidator,
  idValidator,
} = require("../middlewares/validator");
const {
  newUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersControllers");

const router = express.Router();

router.post(
  "/new",
  validator([
    emailValidator().notEmpty(),
    passValidator().notEmpty(),
    customMadeValidator("name").notEmpty(),
  ]),
  newUser
);
router.put(
  "/update",
  [
    auth,
    validator([
      idValidator().notEmpty(),
      emailValidator().notEmpty(),
      passValidator().notEmpty(),
      customMadeValidator("name").notEmpty(),
    ]),
  ],
  updateUser
);

router.delete(
  "/delete",
  [auth, validator([idValidator().notEmpty()])],
  deleteUser
);

module.exports = router;
