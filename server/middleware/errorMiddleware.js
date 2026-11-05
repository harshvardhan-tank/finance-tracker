// Handles requests to routes that don't exist
export const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

// Central error handler: turns errors into clean JSON responses
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || "Server error";

  // Mongoose validation errors (e.g. missing field)
  if (err.name === "ValidationError") {
    status = 400;
    message = Object.values(err.errors).map((e) => e.message).join(", ");
  }
  // Invalid MongoDB id
  if (err.name === "CastError") {
    status = 400;
    message = "Invalid ID";
  }
  // Duplicate key (e.g. email already used)
  if (err.code === 11000) {
    status = 400;
    message = "This email is already registered";
  }

  if (status === 500) console.error(err);
  res.status(status).json({ message });
};
