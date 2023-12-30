const sessionRouter = require("./sessions");
const usersRouter = require("./users");

module.exports = (app) => {
  app.use("/app/droptuts/api/v1/session", sessionRouter);
  app.use("/app/droptuts/api/v1/user", usersRouter);
};
