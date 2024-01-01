const { newOrders, selectOrders } = require("../models/orderModels");
const logger = require("../services/errorLogger");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

exports.newProducts = (req, res, next) => {
  try {
    const { userId, productId } = req.body;
    newOrders([productId, userId])
      .then((row) => {
        if (row.affectedRows) {
          selectOrders([userId]).then((products) => {
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
