const mongoose = require('mongoose');
const Product = require('../models/Product');
const EMIPlan = require('../models/EMIPlan');
require('dotenv').config();

const products = [
  {
    name: 'iPhone 17 Pro',
    slug: 'iphone-17-pro',
    description: 'Latest iPhone with A18 Pro chip',
    mrp: 134900,
    price: 129900,
    image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=500',
    category: 'Smartphone',
    variants: [
      { name: '256GB Natural Titanium', storage: '256GB', color: 'Natural Titanium' },
      { name: '512GB Desert Titanium', storage: '512GB', color: 'Desert Titanium' },
      { name: '1TB White Titanium', storage: '1TB', color: 'White Titanium' },
    ]
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-s24-ultra',
    description: 'Premium Samsung flagship with S Pen',
    mrp: 129999,
    price: 119999,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
    category: 'Smartphone',
    variants: [
      { name: '256GB Titanium Gray', storage: '256GB', color: 'Titanium Gray' },
      { name: '512GB Titanium Black', storage: '512GB', color: 'Titanium Black' },
      { name: '512GB Titanium Violet', storage: '512GB', color: 'Titanium Violet' },
    ]
  },
  {
    name: 'Google Pixel 9 Pro',
    slug: 'google-pixel-9-pro',
    description: 'AI-powered photography beast',
    mrp: 109999,
    price: 99999,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500',
    category: 'Smartphone',
    variants: [
      { name: '128GB Obsidian', storage: '128GB', color: 'Obsidian' },
      { name: '256GB Porcelain', storage: '256GB', color: 'Porcelain' },
      { name: '512GB Bay', storage: '512GB', color: 'Bay' },
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    await Product.deleteMany({});
    await EMIPlan.deleteMany({});
    console.log('Cleared existing data');

    const createdProducts = await Product.insertMany(products);
    console.log('Products seeded');

    // Create EMI plans for each product
    for (const product of createdProducts) {
      const emiPlans = [
        {
          productId: product._id,
          monthlyPayment: Math.round(product.price / 3),
          tenure: 3,
          interestRate: 0,
          cashback: 2000,
          totalAmount: product.price
        },
        {
          productId: product._id,
          monthlyPayment: Math.round(product.price / 6),
          tenure: 6,
          interestRate: 0,
          cashback: 1500,
          totalAmount: product.price
        },
        {
          productId: product._id,
          monthlyPayment: Math.round((product.price * 1.105) / 12),
          tenure: 12,
          interestRate: 10.5,
          cashback: 0,
          totalAmount: Math.round(product.price * 1.105)
        },
        {
          productId: product._id,
          monthlyPayment: Math.round((product.price * 1.18) / 24),
          tenure: 24,
          interestRate: 18,
          cashback: 0,
          totalAmount: Math.round(product.price * 1.18)
        }
      ];

      await EMIPlan.insertMany(emiPlans);
    }

    console.log('EMI Plans seeded');
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();