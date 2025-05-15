// Quiz model for quiz and question management
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question_text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correct_option_index: { type: Number, required: true },
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
});

module.exports = mongoose.model('Quiz', quizSchema);
