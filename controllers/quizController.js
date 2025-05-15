// Quiz controller for admin quiz management and user quiz taking
const Quiz = require('../models/Quiz');

// Admin: Create a quiz with multiple-choice questions
exports.createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;
    // Validate each question
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Quiz must have at least one question' });
    }
    for (const q of questions) {
      if (
        typeof q.question_text !== 'string' ||
        !Array.isArray(q.options) ||
        q.options.length < 2 ||
        typeof q.correct_option_index !== 'number' ||
        q.correct_option_index < 0 ||
        q.correct_option_index >= q.options.length
      ) {
        return res.status(400).json({ message: 'Each question must have question_text, options (min 2), and a valid correct_option_index' });
      }
    }
    const quiz = new Quiz({ title, questions });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Update a quiz and its questions
exports.updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, questions } = req.body;
    // Validate questions if provided
    if (questions) {
      if (!Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ message: 'Quiz must have at least one question' });
      }
      for (const q of questions) {
        if (
          typeof q.question_text !== 'string' ||
          !Array.isArray(q.options) ||
          q.options.length < 2 ||
          typeof q.correct_option_index !== 'number' ||
          q.correct_option_index < 0 ||
          q.correct_option_index >= q.options.length
        ) {
          return res.status(400).json({ message: 'Each question must have question_text, options (min 2), and a valid correct_option_index' });
        }
      }
    }
    const quiz = await Quiz.findByIdAndUpdate(id, { title, questions }, { new: true });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Delete a quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json({ message: 'Quiz deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// User: List available quizzes (titles only)
exports.listQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, 'title');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// User: Get quiz for taking (no correct answers)
exports.getQuizForUser = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    // Hide correct_option_index
    const questions = quiz.questions.map(q => ({
      question_text: q.question_text,
      options: q.options
    }));
    res.json({ _id: quiz._id, title: quiz.title, questions });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
