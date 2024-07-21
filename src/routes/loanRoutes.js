const express = require('express');
const { borrowMoney } = require('../controllers/loanController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/borrow', auth, borrowMoney);

module.exports = router;