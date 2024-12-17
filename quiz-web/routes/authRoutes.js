// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Protected route example (optional)
const { authenticateToken } = require('../middlewares/authMiddleware'); // Define this middleware as shown below
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Hello, ${req.user.username}! This is a protected route.` });
});

module.exports = router;
