module.exports = (err, req, res, next) => {
  err.status = err.status || false
  err.statusCode = err.statusCode || 500
  err.message = err.message || err

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
  })
}
