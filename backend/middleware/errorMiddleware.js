const notFound = (req, res, next) => {
  console.log("in not found case");
  const error = new Error(`not found -${req.originalUrl}`);
  res.status(404);
  console.log(error);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.log(err);
  console.log("in createrror middleware");
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
