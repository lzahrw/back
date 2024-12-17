// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const designerRoutes = require('./routes/designerRoutes');
const playerRoutes = require('./routes/playerRoutes');
const profileRoutes = require('./routes/profileRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your front-end URL
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/designer', designerRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/profile', profileRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the In-Memory Backend API');
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
