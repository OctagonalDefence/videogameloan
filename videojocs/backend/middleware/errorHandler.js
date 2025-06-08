const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status && err.status >= 500 && err.status < 600 ? err.status : 500;
  res.status(status).json({ error: 'An unexpected error occurred' });
};

export default errorHandler;
  