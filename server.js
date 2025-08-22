
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cropRoutes = require('./routes/croproutes')
require('dotenv').config();
const cors = require("cors")
const app = express();

app.use(cors());

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/crops', cropRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cropdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
