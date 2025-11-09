const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  storage: String,
  color: String,
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  mrp: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  variants: [variantSchema],
  category: String,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);