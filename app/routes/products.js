const express = require("express");
const { auth } = require("../middlewares/auth");
const {
  validator,
  emailValidator,
  passValidator,
} = require("../middlewares/validator");
const {
  newSession,
  verifyToken,
} = require("../controllers/sessionsController");

const router = express.Router();

router.post("/new", [auth], verifyToken);

module.exports = router;
