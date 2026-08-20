const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
//const rateLimit = require('express-rate-limit');
const taskRoutes = require('./Routes/taskRoutes');
const errorHandler = require('./Middleware/errorHandler');
require('dotenv').config();

const app = express();

app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(morgan('dev'));

/* Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: "Too many requests, please try again later." }
});
app.use('/api/', limiter);
*/

// for deploying server and client separately
const corsOptions = {
    origin: process.env.CLIENT_URL || true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/tasks', taskRoutes);

if (process.env.NODE_ENV === 'production') {
    const clientPath = path.join(__dirname, '../../client/dist');
    app.use(express.static(clientPath));

    app.get('*any', (req, res) => {
        if (!req.path.startsWith('/api')) {
            res.sendFile(path.join(clientPath, 'index.html'));
        }
    });
}

app.use(errorHandler);

module.exports = app;