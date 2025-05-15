const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth');

// Admin routes
router.post('/', authenticateToken, authorizeRoles('admin'), quizController.createQuiz);
router.put('/:id', authenticateToken, authorizeRoles('admin'), quizController.updateQuiz);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), quizController.deleteQuiz);

// User routes
router.get('/', authenticateToken, quizController.listQuizzes);
router.get('/:id', authenticateToken, quizController.getQuizForUser);

module.exports = router;
