const express = require("express");
const { auth } = require("../middlewares/auth");
const {
  validator,
  customMadeValidator,
  idValidator,
} = require("../middlewares/validator");
const {
  newProducts,
  getProducts,
  deleteProducts,
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

router.delete(
  "/",
  [auth, validator([idValidator().notEmpty()])],
  deleteProducts
);

module.exports = router;
