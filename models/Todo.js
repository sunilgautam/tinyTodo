var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Todo', TodoSchema);