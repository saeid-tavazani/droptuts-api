const express = require("express");
const { auth } = require("../middlewares/auth");
const { validator, idValidator } = require("../middlewares/validator");
const { newProducts } = require("../controllers/orderController");

const router = express.Router();

router.post(
  "/new",
  [
    auth,
    validator([
      idValidator("body", "userId"),
      idValidator("body", "productId"),
    ]),
  ],
  newProducts
);
