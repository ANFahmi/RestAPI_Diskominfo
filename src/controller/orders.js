const OrderModels = require('../models/orders');

const listOrder = async (req, res) => {
    try {
        const ordersData = await OrderModels.listOrder();

        const ordersMap = {};

        ordersData.forEach(order => {
            const { order_id, order_created_at, order_updated_at, product_id, quantity, name, price, stock, sold, product_created_at, product_updated_at } = order;

            if (!ordersMap[order_id]) {
                ordersMap[order_id] = {
                    id: order_id,
                    products: [],
                    created_at: order_created_at,
                    updated_at: order_updated_at,
                };
            }

            ordersMap[order_id].products.push({
                id: product_id,
                name: name,
                price: price,
                quantity: quantity,
                stock: stock,
                sold: sold,
                created_at: product_created_at,
                updated_at: product_updated_at,
            });
        });

        // Mengubah map ke array
        const ordersList = Object.values(ordersMap);

        res.json({
            message: 'Order List',
            data: ordersList,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        });
    }
};


const detailOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const orderData = await OrderModels.detailOrder(id);

        if (orderData.length === 0) {
            return res.status(404).json({
                message: 'Order not found',
            });
        }

        const orderDetails = {
            id: orderData[0].order_id,
            products: [],
            created_at: orderData[0].order_created_at,
            updated_at: orderData[0].order_updated_at,
        };

        orderData.forEach(item => {
            const { product_id, quantity, name, price, stock, sold, product_created_at, product_updated_at } = item;

            orderDetails.products.push({
                id: product_id,
                name: name,
                price: price,
                quantity: quantity,
                stock: stock,
                sold: sold,
                created_at: product_created_at,
                updated_at: product_updated_at,
            });
        });

        res.json({
            message: 'Order Details',
            data: orderDetails,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        });
    }
};



const createOrder = async (req, res) => {
    const { body } = req;

    if (!body.products || !Array.isArray(body.products) || body.products.length === 0) {
        return res.status(400).json({
            message: 'Products are required and must be an array.'
        });
    }

    for (const product of body.products) {
        if (!product.id) {
            return res.status(400).json({
                message: 'Product id is required for each product.'
            });
        }
        if (!product.quantity) {
            return res.status(400).json({
                message: 'Quantity is required for each product.'
            });
        }
    }

    try {
        const result = await OrderModels.createOrder(body);

        if (!result.success) {
            return res.status(result.status).json({
                message: result.message
            });
        }

        const { success, ...responseData } = result;

        res.status(201).json({
            message: 'Order created',
            data: responseData
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};

const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await OrderModels.deleteOrder(id);

        if (!result.success) {
            return res.status(result.status).json({
                message: result.message,
            });
        }

        const { success, ...responseData } = result;
        res.json({
            message: 'Order deleted successfully',
            data: responseData
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};


module.exports = {
    listOrder,
    detailOrder,
    createOrder,
    deleteOrder,
}