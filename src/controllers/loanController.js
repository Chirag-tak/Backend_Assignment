const User = require('../models/User');

// Borrow money controller
exports.borrowMoney = async (req, res) => {
  try {
    const { amount, tenure } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (amount > user.purchasePower) {
      return res.status(400).json({ message: 'Amount exceeds purchase power' });
    }

    const interestRate = 0.08;
    const monthlyRepayment = (amount * (1 + interestRate)) / tenure;
    
    user.purchasePower -= amount;
    await user.save();

    res.json({
      updatedPurchasePower: user.purchasePower,
      monthlyRepayment: Number(monthlyRepayment.toFixed(2))
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing loan', error: error.message });
  }
};