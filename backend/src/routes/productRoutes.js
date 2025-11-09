const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductBySlug);
router.get('/emi-plans/:productId', productController.getEMIPlans);

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');

// router.get('/products', productController.getAllProducts);
// router.get('/products/:id', productController.getProductById);
// router.get('/emi-plans/:productId', productController.getEMIPlans);

// module.exports = router;



