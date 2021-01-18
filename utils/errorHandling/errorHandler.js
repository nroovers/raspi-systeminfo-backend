const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    // err.status = err.status || 'error';

    // if (process.env.NODE_ENV === 'development') {
    //   sendErrorDev(err, res);
    // } else if (process.env.NODE_ENV === 'production') {
    //   sendErrorProd(err, res);
    // }
    res.status(err.statusCode).json({
        error: {
            code: err.statusCode,
            message: err.message,
            // error: err,
            // stack: err.stack
        }
    })
}

module.exports = errorHandler