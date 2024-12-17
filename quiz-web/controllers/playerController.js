// controllers/playerController.js
const questions = require('../data/questions');
const categories = require('../data/categories');
const followers = require('../data/followers');
const users = require('../data/users');

const leaderboards = {}; // { userId: score }

// Answer a question in a specific category
exports.answerQuestion = (req, res) => {
    const { questionId, answer } = req.body;
    const question = questions.find(q => q.id === questionId);
    if (!question) return res.status(400).json({ message: 'Question not found' });

    const isCorrect = question.correctAnswer === answer;
    if (isCorrect) {
        leaderboards[req.user.id] = (leaderboards[req.user.id] || 0) + 1;
    }

    res.json({ isCorrect });
};

// Answer a random question
exports.getRandomQuestion = (req, res) => {
    if (questions.length === 0) {
        return res.status(400).json({ message: 'No questions available' });
    }
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];
    res.json({ question });
};

// Follow a question creator or another player
exports.followUser = (req, res) => {
    const { followingId } = req.body; // ID of the user to follow

    // Check if the user exists
    const userToFollow = users.find(u => u.id === followingId);
    if (!userToFollow) return res.status(400).json({ message: 'User to follow not found' });

    // Check if already following
    const alreadyFollowing = followers.users.find(f => f.followerId === req.user.id && f.followingId === followingId);
    if (alreadyFollowing) {
        return res.status(400).json({ message: 'Already following this user' });
    }

    // Add to followers
    followers.users.push({ followerId: req.user.id, followingId });
    res.json({ message: `Now following ${userToFollow.username}` });
};

// View leaderboards
exports.viewLeaderboard = (req, res) => {
    const leaderboardArray = Object.entries(leaderboards).map(([userId, score]) => {
        const user = users.find(u => u.id === parseInt(userId));
        return { username: user ? user.username : 'Unknown', score };
    }).sort((a, b) => b.score - a.score);

    res.json({ leaderboard: leaderboardArray });
};
