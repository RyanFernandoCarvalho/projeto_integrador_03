const express = require('express')

const AuthController = require('../controllers/AuthController')

const router = express.Router()

router.post('/register', AuthController.registerUserSave)
router.post('/login', AuthController.loginUserSave)

module.exports = router