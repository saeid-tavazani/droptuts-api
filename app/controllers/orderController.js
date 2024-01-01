const { newOrders, selectOrders } = require("../models/orderModels");
const logger = require("../services/errorLogger");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

exports.newOrders = (req, res, next) => {
  try {
    const { userId, productId } = req.body;
    newOrders([productId, userId])
      .then((row) => {
        if (row.affectedRows) {
          selectOrders([userId]).then((order) => {
            res.status(StatusCodes.OK).send({
              success: true,
              data: order,
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

exports.getOrders = (req, res, next) => {
  try {
    const { id } = req.body;
    selectOrders([id])
      .then((order) => {
        res.status(StatusCodes.OK).send({
          success: true,
          data: order,
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
