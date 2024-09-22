const ProductModel = require('../models/products');

const listProducts = async (req, res) => {
    try {
        const [data] = await ProductModel.listProducts();
        res.json({
            message: 'Product List',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const detailProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const [data] = await ProductModel.detailProduct(id);

        if (!data || data.length === 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.json({
            message: 'Product Detail',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        });
    }
}


const createProduct = async (req, res) => {
    const { body } = req;
    let validationErrors = {};

    if (!body.name) {
        validationErrors.name = ["The name field is required."];
    }

    if (!body.price) {
        validationErrors.price = ["The price field is required."];
    } else if (isNaN(body.price) || Number(body.price) < 1) {
        validationErrors.price = ["The price field must be a number."];
    }

    if (!body.stock) {
        validationErrors.stock = ["The stock field is required."];
    } else if (isNaN(body.stock) || Number(body.stock) < 0) {
        validationErrors.stock = ["The stock field must be a number."];
    }

    if (Object.keys(validationErrors).length > 0) {
        return res.status(422).json({
            message: 'Validation failed',
            errors: validationErrors
        });
    }

    try {
        const newProduct = await ProductModel.createProduct(body);
        res.status(201).json({
            message: 'Product created successfully',
            data: newProduct
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        });
    }
}


const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    let validationErrors = {};
    if (body.name && typeof body.name !== 'string') {
        validationErrors.name = ["The name field must be a string."];
    }
    if (body.price && (!Number.isInteger(body.price) || body.price < 1)) {
        validationErrors.price = ["The price field must be a number."];
    }
    if (body.stock && (!Number.isInteger(body.stock) || body.stock < 0)) {
        validationErrors.stock = ["The stock field must be a number."];
    }

    if (Object.keys(validationErrors).length > 0) {
        return res.status(422).json({
            message: 'Validation failed',
            errors: validationErrors
        });
    }

    try {
        const [updatedProduct] = await ProductModel.updateProduct(body, id);

        if (!updatedProduct) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.json({
            message: 'UPDATE product success',
            data: updatedProduct
        });
    } catch (error) {
        if (error.message === 'No fields to update') {
            return res.status(400).json({
                message: 'No fields to update'
            });
        }

        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: 'Parameter id is required'
        });
    }

    try {
        const deletedProduct = await ProductModel.deleteProduct(id);

        if (!deletedProduct) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.json({
            message: 'Product deleted successfully',
            data: deletedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        });
    }
}

module.exports = {
    listProducts,
    detailProduct,
    createProduct,
    updateProduct,
    deleteProduct
}