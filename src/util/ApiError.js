class ApiError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
  }
}

export const errorMiddleware = (err, req, res, nect) => {
  err.message = err.message || 'Internal server error'
  err.statusCode = err.statusCode || 500
  return res
    .status(err.statusCode)
    .json({ success: false, message: err.message })
}
export default ApiError
