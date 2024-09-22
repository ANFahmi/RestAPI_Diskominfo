require('dotenv').config()
const PORT = process.env.PORT;
const express = require('express');

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const middlewareLogRequest = require('./middleware/logs');

const app = express();

app.use(middlewareLogRequest);
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})
