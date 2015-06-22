var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Todo', TodoSchema);