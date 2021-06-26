
const express = require('express')

const ProdauctItem = require('../models/prodauctitem')
const multer = require('multer');
const path = require('path')

const {
    getProductItems,
    addProductItems,
    uploadLogophone,
    getnamephone
} = require('../controllers/productItem')

const router = express.Router()

router.put('/:id', uploadLogophone)
router.post('/add', addProductItems)
// 
// router.route('/add').post(upload.single('image'), addProductItems)
router
    .route('/')
    .get(getProductItems)
    router
    .route('/getnamephone')
    .get(getnamephone)

module.exports = router


