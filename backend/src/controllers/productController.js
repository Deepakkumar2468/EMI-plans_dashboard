const Product = require('../models/Product');
const EMIPlan = require('../models/EMIPlan');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product by slug
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// Get EMI plans for a product
exports.getEMIPlans = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.productId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const emiPlans = await EMIPlan.find({ productId: product._id });
    res.json(emiPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};