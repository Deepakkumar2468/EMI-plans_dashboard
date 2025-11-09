const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const productRoutes = require('./src/routes/productRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/api', productRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: '1Fi EMI API is running' });
});

const PORT = 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





// const productRoutes = require('./routes/productRoute');
// app.use('/api', productRoutes);
