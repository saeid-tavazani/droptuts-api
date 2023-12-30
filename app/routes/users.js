const express = require("express");
const { auth } = require("../middlewares/auth");
const {
  validator,
  emailValidator,
  passValidator,
  customMadeValidator,
} = require("../middlewares/validator");
const { newUser } = require("../controllers/usersControllers");

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
// router.get("/verify", [auth], verifyToken);

module.exports = router;
