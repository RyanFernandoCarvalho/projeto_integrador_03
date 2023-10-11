const express = require('express')

const AuthController = require('../controllers/AuthController')

const router = express.Router()

router.post('/register', AuthController.registerUserSave)

module.exports = router