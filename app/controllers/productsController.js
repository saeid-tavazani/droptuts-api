const { newProducts, selectProducts } = require("../models/productsModels");
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
