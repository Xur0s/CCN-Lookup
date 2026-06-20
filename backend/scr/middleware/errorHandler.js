function errorHandler(err, req, res, next) {
  // Log any error that passes only once
  console.error(err);

  const status = err.status || 500;
  const body = {
    error: {
      message: status === 500 ? "Internal Server Error" : err.message,
      // cause: err.cause?.message ?? undefined,
    },
  };

  res.status(status).json(body);
}

export default errorHandler;
