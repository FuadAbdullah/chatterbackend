// Define error handling middleware function
module.exports = function (err, req, res, next) {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const error = { message };

  if (statusCode >= 500) {
    error.stack = err.stack;
  }

  res.status(statusCode).json({ error });
};
