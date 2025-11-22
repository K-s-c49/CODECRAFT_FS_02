const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../model/admin');

const router = express.Router();


const validateAdminData = (data) => {
  const { name, email, password } = data;

  if (!name || !name.trim()) {
    return { valid: false, message: 'Name is required' };
  }

  if (!email || !email.trim()) {
    return { valid: false, message: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Invalid email format' };
  }

  if (!password || password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }

  return { valid: true };
};


router.post('/register', async (req, res) => {
  try {
    const validation = validateAdminData(req.body);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res.status(400).json({ message: 'This email is already registered' });
    }

    // Create new admin
    const admin = new Admin({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    });

    await admin.save();

    res.status(201).json({
      message: 'Admin registered successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (err) {
    console.error('Register admin error:', err);
    res.status(500).json({ message: 'Failed to register admin' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});

module.exports = router;
