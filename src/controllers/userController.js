const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validateAge = require('../utils/validateAge');

// Signup controller
exports.signup = async (req, res) => {
  try {
    const { phoneNumber, email, name, dateOfBirth, monthlySalary, password } = req.body;

    // Validate age and salary
    if (!validateAge(dateOfBirth) || monthlySalary < 25000) {
      return res.status(400).json({ message: 'User does not meet age or salary requirements' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      phoneNumber,
      email,
      name,
      dateOfBirth,
      monthlySalary,
      password: hashedPassword,
      status: 'approved',
      purchasePower: monthlySalary * 2
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Get user data controller
exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
};