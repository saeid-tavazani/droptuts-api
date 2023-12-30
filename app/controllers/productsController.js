const {
  newProducts,
  selectProducts,
  deleteProducts,
  updateProducts,
} = require("../models/productsModels");
const logger = require("../services/errorLogger");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

exports.newProducts = (req, res, next) => {
  try {
    const { title, description, poster, price, discount } = req.body;
    newProducts([title, description, poster, price, discount])
      .then((row) => {
        if (row.affectedRows) {
          selectProducts().then((products) => {
            res.status(StatusCodes.OK).send({
              success: true,
              data: products,
              message: getReasonPhrase(StatusCodes.OK),
            });
          });
        } else {
          res
            .status(StatusCodes.NOT_IMPLEMENTED)
            .send({ code: StatusCodes.NOT_IMPLEMENTED, success: false });
        }
      })
      .catch((error) => {
        logger.error(error);
        res
          .status(StatusCodes.NOT_IMPLEMENTED)
          .send({ code: StatusCodes.NOT_IMPLEMENTED, success: false });
      });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.getProducts = (req, res, next) => {
  try {
    selectProducts()
      .then((products) => {
        res.status(StatusCodes.OK).send({
          success: true,
          data: products,
          message: getReasonPhrase(StatusCodes.OK),
        });
      })
      .catch((error) => {
        logger.error(error);
        res
          .status(StatusCodes.NOT_IMPLEMENTED)
          .send({ code: StatusCodes.NOT_IMPLEMENTED, success: false });
      });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.deleteProducts = (req, res, next) => {
  try {
    const { id } = req.body;
    deleteProducts([id])
      .then((row) => {
        if (row.affectedRows) {
          selectProducts().then((products) => {
            res.status(StatusCodes.OK).send({
              success: true,
              data: products,
              message: getReasonPhrase(StatusCodes.OK),
            });
          });
        } else {
          res.status(StatusCodes.UPGRADE_REQUIRED).send({
            success: false,
            message: getReasonPhrase(StatusCodes.UPGRADE_REQUIRED),
          });
        }
      })
      .catch((error) => {
        logger.error(error);
        res
          .status(StatusCodes.NOT_IMPLEMENTED)
          .send({ code: StatusCodes.NOT_IMPLEMENTED, success: false });
      });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.updateProducts = (req, res, next) => {
  try {
    const { title, description, poster, price, discount, id } = req.body;
    updateProducts([title, description, poster, price, discount, id])
      .then((row) => {
        if (row.affectedRows) {
          selectProducts().then((products) => {
            res.status(StatusCodes.OK).send({
              success: true,
              data: products,
              message: getReasonPhrase(StatusCodes.OK),
            });
          });
        } else {
          res.status(StatusCodes.UPGRADE_REQUIRED).send({
            success: false,
            message: getReasonPhrase(StatusCodes.UPGRADE_REQUIRED),
          });
        }
      })
      .catch((error) => {
        logger.error(error);
        res
          .status(StatusCodes.NOT_IMPLEMENTED)
          .send({ code: StatusCodes.NOT_IMPLEMENTED, success: false });
      });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
