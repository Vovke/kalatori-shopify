const errorMiddleware = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
};

module.exports = errorMiddleware;
