// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../data/users'); // Import the in-memory users array

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Check if username already exists
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = {
            id: users.length + 1, // Simple incremental ID
            username,
            password: hashedPassword,
            role,
        };
        users.push(newUser);

        // Generate a JWT token
        const token = jwt.sign(
            { id: newUser.id, username: newUser.username, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = users.find(user => user.username === username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};
