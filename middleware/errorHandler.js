const { constants } = require('../constants');


const errorHandler = (err, req, res, next) => {
    // Get the status code from the response or default to 500 (Internal Server Error)
    const statusCode = res.statusCode ? res.statusCode : 500;
  
    // Handle different error cases based on the status code
    switch (statusCode) {
      case constants.NOT_FOUND:
        res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
        break;
      case constants.VALIDATION_ERROR:
        res.json({ title: "Validation Failed", message: err.message, stackTrace: err.stack });
        break;
      case constants.FORBIDDEN:
        res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
        break;
      case constants.UNAUTHORIZED:
        res.json({ title: "Unauthorized", message: err.message, stackTrace: err.stack });
        break;
      default:
        // For any other status code, respond with a generic error message
        res.status(statusCode).json({ title: "Error", message: err.message, stackTrace: err.stack });
        break;
    }
  };
  
  module.exports = errorHandler;
