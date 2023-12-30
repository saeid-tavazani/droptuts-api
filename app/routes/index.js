const sessionRouter = require("./sessions");

module.exports = (app) => {
  app.use("/app/droptuts/api/v1/session", sessionRouter);
};
