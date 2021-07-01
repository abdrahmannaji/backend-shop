
const router = require('express').Router();
const store = require('../middleware/multer')
const Authtoken = require('../middleware/Authtoken')


const { protect, authorize } = require('../middleware/auth')
const { 
    createProduct,
    getProducts,
    getShopProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/product');
const Product = require('../models/Product')

const advancedResults = require('../middleware/advancedResults')
 
router.post('/',store.array('images', 12),Authtoken,
// protect, authorize('admin'), 
 createProduct);

router.get('/',Authtoken,
  advancedResults(Product),
getProducts);
router.get('/shop/:id',getShopProducts);
router.get('/:id', getProductById);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);

module.exports = router;
