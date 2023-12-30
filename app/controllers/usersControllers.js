const TokenService = require("../services/tokenService");
const { verifyPass, generateHashPss } = require("../services/passwordHash");
const { selectUser, newUser } = require("../models/userModels");
const { gravatar } = require("../services/gravatar");
const logger = require("../services/errorLogger");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

exports.newUser = (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    selectUser([email])
      .then((user) => {
        if (!user) {
          newUser([name, email, generateHashPss(password)]);
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
