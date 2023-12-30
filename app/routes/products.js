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
  updateProducts,
  newHeadline,
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

router.put(
  "/new",
  [
    auth,
    validator([
      customMadeValidator("title").notEmpty(),
      customMadeValidator("description").notEmpty(),
      customMadeValidator("poster").notEmpty(),
      customMadeValidator("price").optional().isInt(),
      customMadeValidator("discount").optional().isInt(),
      idValidator().notEmpty(),
    ]),
  ],
  updateProducts
);

router.post(
  "/new/headline",
  [
    auth,
    validator([
      customMadeValidator("title").notEmpty(),
      idValidator().notEmpty(),
    ]),
  ],
  newHeadline
);

module.exports = router;
