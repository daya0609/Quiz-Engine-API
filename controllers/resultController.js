// Result controller for submitting and tracking quiz results
const Result = require('../models/Result');
const Quiz = require('../models/Quiz');

exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    let score = 0;
    const answerDetails = quiz.questions.map((q, idx) => {
      const selected = answers[idx];
      const correct = selected === q.correct_option_index;
      if (correct) score++;
      return {
        question: q.question_text,
        selected,
        correct
      };
    });
    const result = new Result({
      user: req.user.id,
      quiz: quizId,
      score,
      total: quiz.questions.length,
      answers: answerDetails
    });
    await result.save();
    res.json({ score, total: quiz.questions.length, answers: answerDetails });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id }).populate('quiz', 'title');
    res.json(results.map(r => ({
      quiz: r.quiz.title,
      score: r.score,
      total: r.total,
      takenAt: r.takenAt
    })));
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
