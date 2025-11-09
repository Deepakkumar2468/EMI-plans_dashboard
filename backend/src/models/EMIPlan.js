const mongoose = require('mongoose');

const emiPlanSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  monthlyPayment: { type: Number, required: true },
  tenure: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  cashback: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('EMIPlan', emiPlanSchema);