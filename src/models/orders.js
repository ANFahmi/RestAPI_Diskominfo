const dbPool = require('../config/database');

const listOrder = async () => {
    const SQLQuery = `
        SELECT o.id AS order_id, o.created_at AS order_created_at, o.updated_at AS order_updated_at,
               oi.product_id, oi.quantity, p.name, p.price, p.stock, p.sold, p.created_at AS product_created_at, p.updated_at AS product_updated_at
        FROM sql12732611.orders o
        JOIN sql12732611.order_item oi ON o.id = oi.order_id
        JOIN sql12732611.products p ON oi.product_id = p.id`;

    const [data] = await dbPool.execute(SQLQuery);
    return data;
};

const detailOrder = async (id) => {
    const SQLQuery = `
        SELECT o.id AS order_id, o.created_at AS order_created_at, o.updated_at AS order_updated_at,
               oi.product_id, oi.quantity, p.name, p.price, p.stock, p.sold, p.created_at AS product_created_at, p.updated_at AS product_updated_at
        FROM sql12732611.orders o
        JOIN sql12732611.order_item oi ON o.id = oi.order_id
        JOIN sql12732611.products p ON oi.product_id = p.id
        WHERE o.id = ?`;

    const [data] = await dbPool.execute(SQLQuery, [id]);
    return data;
};



const createOrder = async (body) => {
    const orderSQL = `
        INSERT INTO sql12732611.orders (created_at, updated_at)
        VALUES (NOW(6), NOW(6))`;

    const [orderResult] = await dbPool.execute(orderSQL);
    const orderId = orderResult.insertId;

    const orderItems = [];

    for (const product of body.products) {
        const productId = product.id;
        const quantity = product.quantity;

        const [productData] = await dbPool.execute(`
            SELECT id, name, price, stock, sold, created_at
            FROM sql12732611.products 
            WHERE id = ?`, [productId]);

        if (productData.length === 0) {
            return { success: false, status: 404, message: `Product not found` };
        }

        const { name, price, stock, sold, created_at } = productData[0];

        if (quantity > stock) {
            return { success: false, status: 400, message: `Product out of stock` };
        }

        const orderItemSQL = `
            INSERT INTO sql12732611.order_item (order_id, product_id, quantity, created_at, updated_at)
            VALUES (?, ?, ?, NOW(6), NOW(6))`;

        await dbPool.execute(orderItemSQL, [orderId, productId, quantity]);

        const updatedSold = sold + quantity;

        const updateProductSQL = `
            UPDATE sql12732611.products
            SET sold = ?, stock = stock - ?, updated_at = NOW(6)
            WHERE id = ?`;

        await dbPool.execute(updateProductSQL, [updatedSold, quantity, productId]);

        orderItems.push({
            id: productId,
            name: name,
            price: price,
            quantity: quantity,
            stock: stock - quantity,
            sold: updatedSold,
            created_at: created_at,
            updated_at: new Date().toISOString()
        });
    }

    return {
        success: true,
        id: orderId,
        products: orderItems,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
};

const deleteOrder = async (id) => {
    const [orderData] = await dbPool.execute(`
        SELECT created_at FROM sql12732611.orders WHERE id = ?`, [id]);

    if (orderData.length === 0) {
        return { success: false, status: 404, message: 'Order not found' };
    }

    const createdAt = orderData[0].created_at;


    const [orderItems] = await dbPool.execute(`
        SELECT product_id, quantity FROM sql12732611.order_item WHERE order_id = ?`, [id]);


    const productUpdates = [];

    for (const item of orderItems) {
        const { product_id, quantity } = item;

        const [productData] = await dbPool.execute(`
            SELECT name, price, stock, sold, created_at FROM sql12732611.products WHERE id = ?`, [product_id]);

        if (productData.length === 0) {
            return { success: false, status: 404, message: 'Product not found' };
        }

        const { name, price, stock, sold, created_at } = productData[0];

        const updatedStock = stock + quantity;
        const updatedSold = sold - quantity;

        productUpdates.push({
            id: product_id,
            name: name,
            price: price,
            quantity: quantity,
            stock: updatedStock,
            sold: updatedSold,
            created_at: created_at,
            updated_at: new Date().toISOString()
        });

        await dbPool.execute(`
            UPDATE sql12732611.products
            SET stock = ?, sold = ?, updated_at = NOW(6)
            WHERE id = ?`, [updatedStock, updatedSold, product_id]);
    }

    await dbPool.execute(`DELETE FROM sql12732611.order_item WHERE order_id = ?`, [id]);

    await dbPool.execute(`DELETE FROM sql12732611.orders WHERE id = ?`, [id]);

    return {
        success: true,
        id: id,
        products: productUpdates,
        created_at: createdAt,
        updated_at: new Date().toISOString()
    };
};


module.exports = {
    listOrder,
    detailOrder,
    createOrder,
    deleteOrder,
}