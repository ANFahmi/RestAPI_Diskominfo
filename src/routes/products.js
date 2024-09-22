const express = require('express');

const ProductsController = require('../controller/products.js');

const router = express.Router();

router.get('/', ProductsController.listProducts);
router.get('/:id', ProductsController.detailProduct);
router.post('/', ProductsController.createProduct);
router.put('/:id', ProductsController.updateProduct);
router.delete('/:id', ProductsController.deleteProduct);

module.exports = router;