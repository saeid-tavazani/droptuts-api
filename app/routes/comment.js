const express = require("express");
const { auth } = require("../middlewares/auth");
const { validator, idValidator } = require("../middlewares/validator");
const { newOrders, getOrders } = require("../controllers/orderController");

const router = express.Router();

router.post(
  "/new",
  [
    auth,
    validator([
      idValidator("body", "userId").notEmpty(),
      idValidator("body", "productId").notEmpty(),
    ]),
  ],
  newOrders
);

router.get("/", [auth, validator([idValidator().notEmpty()])], getOrders);
router.delete("/", [auth, validator([idValidator().notEmpty()])], getOrders);

module.exports = router;
