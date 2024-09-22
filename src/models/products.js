const dbPool = require('../config/database');

const listProducts = () => {
    const SQLQuery = 'SELECT * FROM sql12732611.products';

    return dbPool.execute(SQLQuery);
}

const detailProduct = (id) => {
    const SQLQuery = `SELECT * FROM sql12732611.products WHERE id=${id} `;
    return dbPool.execute(SQLQuery);
}


const createProduct = async (body) => {
    const SQLQuery = `
        INSERT INTO sql12732611.products (name, price, stock, sold, created_at, updated_at) 
        VALUES (?, ?, ?, 0, NOW(6), NOW(6))`;

    const [result] = await dbPool.execute(SQLQuery, [body.name, body.price, body.stock]);
    const insertedProduct = {
        id: result.insertId,
        name: body.name,
        price: body.price,
        stock: body.stock,
        sold: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
    return insertedProduct;
}


const updateProduct = async (body, id) => {
    const fieldsToUpdate = [];
    const values = [];

    if (body.name) {
        fieldsToUpdate.push("name = ?");
        values.push(body.name);
    }
    if (body.price) {
        fieldsToUpdate.push("price = ?");
        values.push(body.price);
    }
    if (body.stock) {
        fieldsToUpdate.push("stock = ?");
        values.push(body.stock);
    }

    fieldsToUpdate.push("updated_at = NOW(6)");

    if (fieldsToUpdate.length === 0) {
        throw new Error('No fields to update');
    }

    const SQLQuery = `
        UPDATE sql12732611.products
        SET ${fieldsToUpdate.join(', ')}
        WHERE id = ?`;

    values.push(id);

    await dbPool.execute(SQLQuery, values);

    const [updatedProduct] = await dbPool.execute(`
        SELECT id, name, price, stock, created_at, updated_at 
        FROM sql12732611.products 
        WHERE id = ?`, [id]);

    return updatedProduct;
}

const deleteProduct = async (id) => {
    const [productToDelete] = await dbPool.execute(`
        SELECT id, name, price, stock, sold, created_at, updated_at 
        FROM sql12732611.products 
        WHERE id = ?`, [id]);

    if (productToDelete.length === 0) {
        return null;
    }

    const SQLQuery = `DELETE FROM sql12732611.products WHERE id = ?`;
    await dbPool.execute(SQLQuery, [id]);

    return productToDelete[0];
}


module.exports = {
    listProducts,
    detailProduct,
    createProduct,
    updateProduct,
    deleteProduct
}