require('dotenv').config()
const PORT = process.env.PORT;
const express = require('express');

const usersRoutes = require('./routes/users');

const middlewareLogRequest = require('./middleware/logs');

const app = express();

app.use(middlewareLogRequest);
app.use(express.json());

app.use('/users', usersRoutes);

app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})

app.listen(PORT, () => {
    console.log(`it's alive on http://localhost:${PORT}`);
})
