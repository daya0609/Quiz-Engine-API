// Result model for tracking user quiz results
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  answers: [
    {
      question: { type: String },
      selected: { type: Number },
      correct: { type: Boolean },
    },
  ],
  takenAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Result', resultSchema);
