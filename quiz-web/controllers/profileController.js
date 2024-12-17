// controllers/profileController.js
const users = require('../data/users');
const bcrypt = require('bcryptjs');

// Get user profile
exports.getProfile = (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Exclude password from profile data
    const { password, ...userData } = user;
    res.json({ user: userData });
};

// Update user profile
exports.updateProfile = async (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const { username, password } = req.body;

    if (username) {
        // Check if new username is taken
        const existingUser = users.find(u => u.username === username && u.id !== user.id);
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        user.username = username;
    }

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
    }

    res.json({ message: 'Profile updated successfully', user });
};
