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
  updateSection,
  deleteSection,
  newSection,
  updateHeadline,
  deleteHeadline,
  selectHeadline,
  selectSection,
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
  "/",
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
  "/headline/new",
  [
    auth,
    validator([
      customMadeValidator("title").notEmpty(),
      idValidator().notEmpty(),
    ]),
  ],
  newHeadline
);

router.delete(
  "/headline/delete",
  [auth, validator([idValidator().notEmpty()])],
  deleteHeadline
);

router.put(
  "/headline/update",
  [
    auth,
    validator([
      customMadeValidator("title").notEmpty(),
      idValidator().notEmpty(),
    ]),
  ],
  updateHeadline
);

router.get("/headline", [auth], selectHeadline);

router.post(
  "/section/new",
  [
    auth,
    validator([
      customMadeValidator("title").notEmpty(),
      idValidator().notEmpty(),
      customMadeValidator("description").notEmpty(),
      customMadeValidator("time").notEmpty(),
    ]),
  ],
  newSection
);

router.delete(
  "/section/delete",
  [auth, validator([idValidator().notEmpty()])],
  deleteSection
);

router.put(
  "/section/update",
  [
    auth,
    validator([
      customMadeValidator("title").notEmpty(),
      idValidator().notEmpty(),
      customMadeValidator("description").notEmpty(),
      customMadeValidator("time").notEmpty(),
    ]),
  ],
  updateSection
);

router.get("/section", [auth], selectSection);

module.exports = router;
