// controllers/designerController.js
const questions = require('../data/questions');
const categories = require('../data/categories');
const followers = require('../data/followers');

// Create a new category
exports.createCategory = (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name is required' });

    // Check if category already exists
    const existingCategory = categories.find(cat => cat.name.toLowerCase() === name.toLowerCase());
    if (existingCategory) {
        return res.status(400).json({ message: 'Category already exists' });
    }

    const newCategory = {
        id: categories.length + 1,
        name,
    };
    categories.push(newCategory);
    res.status(201).json({ message: 'Category created', category: newCategory });
};

// Create a new question
exports.createQuestion = (req, res) => {
    const { text, options, correctAnswer, categoryId, difficulty } = req.body;
    if (!text || !options || !correctAnswer || !categoryId || !difficulty) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return res.status(400).json({ message: 'Invalid category' });

    const newQuestion = {
        id: questions.length + 1,
        text,
        options,
        correctAnswer,
        categoryId,
        difficulty,
        createdBy: req.user.id,
    };
    questions.push(newQuestion);
    res.status(201).json({ message: 'Question created', question: newQuestion });
};

// Additional designer functionalities can be added here
