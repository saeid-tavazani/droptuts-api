const sessionRouter = require("./sessions");
const usersRouter = require("./users");
const productsRouter = require("./products");
const orderRouter = require("./order");
const commentRouter = require("./comment");

module.exports = (app) => {
  app.use("/app/droptuts/api/v1/session", sessionRouter);
  app.use("/app/droptuts/api/v1/user", usersRouter);
  app.use("/app/droptuts/api/v1/product", productsRouter);
  app.use("/app/droptuts/api/v1/order", orderRouter);
  app.use("/app/droptuts/api/v1/comment", commentRouter);
};
