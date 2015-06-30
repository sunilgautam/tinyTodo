var express = require('express');
var router = express.Router();
var respond = require('../helpers/responder.js');

var mongoose = require('mongoose');
var Todo = require('../models/Todo.js');

// index
router.get('/', function(req, res, next) {
  Todo.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

// store
router.post('/', function(req, res, next) {
  Todo.create(req.body, function(err, newTodo) {
    if (err) return next(err);
    res.json(newTodo);
  });
});

// show
router.get('/:id', function(req, res, next) {
  Todo.findById(req.params.id, function (err, todo) {
    if (err) return next(err);
    if (todo) {
      res.json(todo);
    } else {
      return respond.notFound(next);
    }
  });
});

// update
router.put('/:id', function(req, res, next) {
  delete req.body._id;
  Todo.findByIdAndUpdate(req.params.id, req.body, function (err, todo) {
    if (err) return next(err);
    if (todo) {
      res.json(todo);
    } else {
      return respond.notFound(next);
    }
  });
});

// delete
router.delete('/:id', function(req, res, next) {
  Todo.findByIdAndRemove(req.params.id, req.body, function (err, todo) {
    if (err) return next(err);
    if (todo) {
      res.json(todo);
    } else {
      return respond.notFound(next);
    }
  });
});

module.exports = router;
