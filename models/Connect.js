var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
  order: { type: Number, default: 0 }
});

var ConnectSchema = new mongoose.Schema({
    connect_id: String,
    created_at: { type: Date, default: Date.now },
    todos: [TodoSchema]
});

module.exports = mongoose.model('Connect', ConnectSchema);