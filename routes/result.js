const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth');

router.post('/submit', authenticateToken, authorizeRoles('user'), resultController.submitQuiz);
router.get('/history', authenticateToken, authorizeRoles('user'), resultController.getUserResults);

module.exports = router;
