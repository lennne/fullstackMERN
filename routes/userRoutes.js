const express = require('express')

const router = express.Router()

//all '/users' arrive in this router, meaning '/users/'
router.route('/')
    .get()
    .post()
    .patch()
    .delete()

module.exports = router