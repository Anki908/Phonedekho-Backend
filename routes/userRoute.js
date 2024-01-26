const express = require('express');
const { signUp, signIn, logout } = require('../controllers/userController');
const router = express.Router();
const validation = require('../middlewares/validation');

router.route('/signup').post(validation.validateSignUp , signUp);

router.route('/signin').post(signIn);

router.route('/logout').post(logout);

module.exports = router;