const TokenService = require("../services/tokenService");
const { verifyPass, generateHashPss } = require("../services/passwordHash");
const { selectUser, newUser, updateUser } = require("../models/userModels");
const { gravatar } = require("../services/gravatar");
const logger = require("../services/errorLogger");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

exports.newUser = (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    selectUser([email])
      .then((user) => {
        if (!user) {
          newUser([name, email, generateHashPss(password)]).then((row) => {
            if (row.affectedRows) {
              res.status(StatusCodes.OK).send({
                success: true,
                message: getReasonPhrase(StatusCodes.OK),
              });
            } else {
              res.status(StatusCodes.NOT_ACCEPTABLE).send({
                success: false,
                message: getReasonPhrase(StatusCodes.NOT_ACCEPTABLE),
              });
            }
          });
        } else {
          res.status(StatusCodes.NOT_ACCEPTABLE).send({
            success: false,
            message: getReasonPhrase(StatusCodes.NOT_ACCEPTABLE),
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

exports.updateUser = (req, res, next) => {
  try {
    const { name, email, password, id } = req.body;
    updateUser([name, email, generateHashPss(password), id])
      .then((row) => {
        if (row.affectedRows) {
          newUser([name, email, generateHashPss(password)]).then((row) => {
            selectUser([email]).then((user) => {
              delete user.password;
              res.status(StatusCodes.OK).send({
                success: true,
                data: user,
                message: getReasonPhrase(StatusCodes.OK),
              });
            });
          });
        } else {
          res.status(StatusCodes.NOT_ACCEPTABLE).send({
            success: false,
            message: getReasonPhrase(StatusCodes.NOT_ACCEPTABLE),
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
