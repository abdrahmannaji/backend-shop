const express = require('express')
const { search } = require('../controllers/search')

const router = express.Router()

router.post('/', search)
// Hello
module.exports = router
