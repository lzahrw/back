// routes/profileRoutes.js
const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Get user profile
router.get('/', authenticateToken, getProfile);

// Update user profile
router.put('/', authenticateToken, updateProfile);

module.exports = router;
