const express = require("express");
const { auth } = require("../middlewares/auth");
const { validator, customMadeValidator } = require("../middlewares/validator");
const {
  newProducts,
  getProducts,
} = require("../controllers/productsController");

const router = express.Router();

router.post(
  "/new",
  [
    auth,
    validator([
      customMadeValidator("title").notEmpty(),
      customMadeValidator("description").notEmpty(),
      customMadeValidator("poster").notEmpty(),
      customMadeValidator("price").optional().isInt(),
      customMadeValidator("discount").optional().isInt(),
    ]),
  ],
  newProducts
);
router.get("/", getProducts);

module.exports = router;
