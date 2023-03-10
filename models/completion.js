const mongoose = require('mongoose');

const completionSchema = new mongoose.Schema({
  id: String,
  object: String,
  created: Number,
  model: String,
  usage: {
    prompt_tokens: Number,
    completion_tokens: Number,
    total_tokens: Number
  },
  choices: [{
    message: {
      role: String,
      content: String
    },
    finish_reason: String,
    index: Number
  }]
});

const Completion = mongoose.model('Completion', completionSchema);

module.exports = Completion;
