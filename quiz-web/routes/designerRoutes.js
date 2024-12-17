// routes/designerRoutes.js
const express = require('express');
const { createCategory, createQuestion } = require('../controllers/designerController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new category (only for designers)
router.post('/categories', authenticateToken, authorizeRoles('designer', 'admin'), createCategory);

// Create a new question (only for designers)
router.post('/questions', authenticateToken, authorizeRoles('designer', 'admin'), createQuestion);

// Additional designer routes can be added here

module.exports = router;
