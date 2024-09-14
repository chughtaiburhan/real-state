const errorHandler = (statusCode, message) => (err, req, res, next) => {
    res.status(statusCode).json({ error: message });
  };
  
  export default errorHandler;