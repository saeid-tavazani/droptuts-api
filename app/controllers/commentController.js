const {
  activeComment,
  addreplyComment,
  deleteComment,
  getComment,
  newComment,
} = require("../models/commentModels");
const logger = require("../services/errorLogger");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

exports.newComment = (req, res, next) => {
  try {
    const { userId, productId, description } = req.body;
    newComment([userId, productId, description])
      .then((row) => {
        if (row.affectedRows) {
          getComment([productId]).then((comment) => {
            res.status(StatusCodes.OK).send({
              success: true,
              data: comment,
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

exports.getComment = (req, res, next) => {
  try {
    const { id } = req.body;
    getComment([id])
      .then((comment) => {
        res.status(StatusCodes.OK).send({
          success: true,
          data: comment,
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

exports.deleteComment = (req, res, next) => {
  try {
    const { id } = req.body;
    deleteComment([id])
      .then((comment) => {
        res.status(StatusCodes.OK).send({
          success: true,
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

exports.activeComment = (req, res, next) => {
  try {
    const { id } = req.body;
    activeComment([id])
      .then((comment) => {
        res.status(StatusCodes.OK).send({
          success: true,
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

exports.addreplyComment = (req, res, next) => {
  try {
    const { userId, productId, description, commentId } = req.body;
    addreplyComment([userId, productId, description, commentId])
      .then((row) => {
        if (row.affectedRows) {
          getComment([productId]).then((comment) => {
            res.status(StatusCodes.OK).send({
              success: true,
              data: comment,
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
