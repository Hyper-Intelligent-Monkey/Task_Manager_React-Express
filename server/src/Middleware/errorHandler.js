const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (err.name === 'ZodError' || err.issues) {
        statusCode = 400;
        const issues = err.issues || err.errors || [];
        message = issues.length > 0 
            ? issues[0].message 
            : err.message;
    }
    
    res.status(statusCode).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
};

module.exports = errorHandler;