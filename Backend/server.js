const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./route/authroute');
const employeeRoutes = require('./route/employeroute');

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== ROUTES =====
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// ===== ERROR HANDLING MIDDLEWARE =====
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
});

// ===== 404 HANDLER =====
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ===== DATABASE CONNECTION & SERVER START =====
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(' MongoDB connected successfully');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
      console.log(` API available at http://localhost:${PORT}/api`);
    });
  })
  .catch((err) => {
    console.error(' MongoDB connection error:', err.message);
    process.exit(1);
  });
