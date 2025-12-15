const express = require('express')

const router = express.Router()

const usersController  = require('../controllers/usersController')

//all '/users' arrive in this router, meaning '/users/'
router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUsers)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router