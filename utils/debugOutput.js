require("dotenv").config();

module.exports = function (string, isError = false) {
  if (process.env.BACKEND_MODE === "dev") {
    if (isError) return console.error(string);
    return console.log(string);
  }
};
