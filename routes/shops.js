const express = require('express')

const {
    getShops,
    getShop,
    register,
    createShop,
    updateShop,

    deleteShop
} = require('../controllers/shops')


const Shop = require('../models/Shop')
// { mergeParams: true }
const router = express.Router()

const advancedResults = require('../middleware/advancedResults')

const { protect, authorize } = require('../middleware/auth')



// router.route('/register').post(protect,authorize('admin'),register)
router
    .route('/')
    // .get(advancedResults(Shop), getShops)
    .post(createShop)

router.route('/createShop').post(createShop)
router
    .route('/getShop')
    .get(protect,authorize('admin'),getShop)
router
    .route('/:id')
    .put(updateShop)
    .delete(deleteShop)



module.exports = router
