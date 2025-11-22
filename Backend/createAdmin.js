const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('./model/admin');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  try {
    const admin = new Admin({
      name: 'khushal',
      email: 'admin@example.com',
      password: 'khushal1132'
    });
    await admin.save();
    console.log('Admin created successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
});