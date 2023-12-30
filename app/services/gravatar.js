const gravatar = require("gravatar");
exports.gravatar = (email) => {
  const picture = "https" + gravatar.url(email, { d: "mm" });
  return { picture };
};
