const sessionRouter = require("./sessions");
const usersRouter = require("./users");
const productsRouter = require("./products");

module.exports = (app) => {
  app.use("/app/droptuts/api/v1/session", sessionRouter);
  app.use("/app/droptuts/api/v1/user", usersRouter);
  app.use("/app/droptuts/api/v1/product", productsRouter);
};
