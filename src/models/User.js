const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dateOfRegistration: { type: Date, default: Date.now },
  dateOfBirth: { type: Date, required: true },
  monthlySalary: { type: Number, required: true },
  status: { type: String, enum: ['approved', 'rejected', 'pending'], default: 'pending' },
  purchasePower: { type: Number, default: 0 },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);