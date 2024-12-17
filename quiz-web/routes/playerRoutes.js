// routes/playerRoutes.js
const express = require('express');
const { answerQuestion, getRandomQuestion, followUser, viewLeaderboard } = require('../controllers/playerController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

// Answer a question in a specific category (only for players)
router.post('/answer', authenticateToken, authorizeRoles('player', 'admin'), answerQuestion);

// Get a random question (only for players)
router.get('/random-question', authenticateToken, authorizeRoles('player', 'admin'), getRandomQuestion);

// Follow a user (only for players)
router.post('/follow', authenticateToken, authorizeRoles('player', 'admin'), followUser);

// View leaderboard (only for players)
router.get('/leaderboard', authenticateToken, authorizeRoles('player', 'admin'), viewLeaderboard);

// Additional player routes can be added here

module.exports = router;
