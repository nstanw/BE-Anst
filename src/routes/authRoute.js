const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

// router.get('/login', authController.getLogin);

// router.get('/signup', authController.getSignup);

router.post('/sign-in', authController.postLogin);

router.post('/sign-up', authController.postSignup);

router.get('/logout', authController.postLogout);

module.exports = router;