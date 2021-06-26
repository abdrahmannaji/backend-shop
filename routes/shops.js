const express = require('express')

const {
    getShops,
    getShop,
    register,
    createShop,
    updateShop,
    getVideosByShopId,
    deleteShop
} = require('../controllers/shops')


const Shop = require('../models/Shop')
// { mergeParams: true }
const router = express.Router()

const advancedResults = require('../middleware/advancedResults')

const { protect, authorize } = require('../middleware/auth')



router.route('/register').post(protect,authorize('admin'),register)
router
    .route('/')
    .get(advancedResults(Shop), getShops)
    .post(createShop)

router.route('/createShop').post(createShop)
router
    .route('/:id')
    .get(getShop)
    .put(updateShop)
    .delete(deleteShop)

router
    .route('/:id/videos')
    .get(getVideosByShopId)


module.exports = router
