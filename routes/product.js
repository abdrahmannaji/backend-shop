
const router = require('express').Router();
const store = require('../middleware/multer')
const controller = require('../controllers/controller');
const { protect, authorize } = require('../middleware/auth')
const { 
    createProduct,
    getProducts,
    getShopProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/product');
router.post('/upload',store.array('images', 12),controller.uploads);
 
router.post('/',store.array('images', 12),  createProduct);

router.get('/', protect,getProducts);
router.get('/shop/:id',getShopProducts);
router.get('/:id', getProductById);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);

module.exports = router;
