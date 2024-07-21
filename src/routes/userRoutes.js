const express = require('express');
const { signup, login, getUserData } = require('../controllers/userController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', auth, getUserData);

module.exports = router;