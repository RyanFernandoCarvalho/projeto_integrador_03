const express = require('express')

const E_trashwayController = require('../controllers/E_trashwayController')

const router = express.Router()

router.get('/about', E_trashwayController.aboutPage)

module.exports = router