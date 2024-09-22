const express = require('express');

const orderController = require('../controller/orders.js');

const router = express.Router();

router.get('/', orderController.listOrder);
router.post('/', orderController.createOrder);
router.get('/:id', orderController.detailOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;