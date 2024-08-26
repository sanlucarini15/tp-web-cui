const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const router = express.Router();

// Rutas de endpoints
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/check-auth', authController.checkAuthentication);
router.get('/users', authController.getUsers);
router.get('/preferences', authController.getPreferences);
router.post('/preferences', authController.addPreference);
router.post('/change-role', authController.changeUserRole);
router.get('/user-role', authController.getAuthenticatedUserRole);

module.exports = router;
