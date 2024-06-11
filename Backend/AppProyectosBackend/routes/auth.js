const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const router = express.Router();
const users = require('../models/user'); // Importa el modelo de usuarios

require('../config/passport');

// Endpoints
router.post('/register', authController.register);
router.post('/login', passport.authenticate('local'), authController.login);
router.post('/logout', authController.logout);
router.get('/check-auth', authController.checkAuthentication);
router.get('/users', (req, res) => {
    res.json(users);
});

module.exports = router;
