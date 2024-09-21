const express = require('express');

const UserController = require('../controller/users.js');

const router = express.Router();

router.post('/', UserController.createNewUser);
router.get('/', UserController.getAllUsers);
router.get('/:idUser', UserController.getSpesificUsers);
router.patch('/:idUser', UserController.updateUser);
router.delete('/:idUser', UserController.deleteUser);



module.exports = router;