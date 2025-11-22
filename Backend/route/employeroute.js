const express = require('express');
const Employee = require('../model/employee');
const authMiddleware = require('../middleware/authmiddleware');

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// CREATE employee
router.post('/', async (req, res) => {
  try {
    const { name, email, position, department, salary } = req.body;

    if (!name || !email || !position || !department || salary == null) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Employee email already exists' });
    }

    const employee = new Employee({ name, email, position, department, salary });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// READ all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// READ single employee
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE employee
router.put('/:id', async (req, res) => {
  try {
    const { name, email, position, department, salary } = req.body;

    if (!name || !email || !position || !department || salary == null) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, position, department, salary },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE employee
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
