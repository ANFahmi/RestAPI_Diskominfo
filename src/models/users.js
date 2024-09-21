const dbPool = require('../config/database');

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM sql12732611.users';

    return dbPool.execute(SQLQuery);
}

const getSpesificUsers = (idUser) => {
    const SQLQuery = `SELECT * FROM sql12732611.users WHERE iduser=${idUser} `;

    return dbPool.execute(SQLQuery);
}


const createNewUser = (body) => {
    const SQLQuery = `  INSERT INTO sql12732611.users (name, email, hobby, age) 
                        VALUES ('${body.name}', '${body.email}', '${body.hobby}', '${body.age}')`;

    return dbPool.execute(SQLQuery);
}

const updateUser = (body, idUser) => {
    const SQLQuery = `  UPDATE sql12732611.users 
                        SET name='${body.name}', email='${body.email}', hobby='${body.hobby}', age='${body.age}'
                        WHERE iduser=${idUser}`;

    return dbPool.execute(SQLQuery);
}

const deleteUser = (idUser) => {
    const SQLQuery = `DELETE FROM sql12732611.users WHERE iduser=${idUser}`;

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllUsers,
    getSpesificUsers,
    createNewUser,
    updateUser,
    deleteUser,
}