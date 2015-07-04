var express = require('express');
var router = express.Router();
var respond = require('../helpers/responder.js');

var mongoose = require('mongoose');
var Connect = require('../models/Connect.js');

router.use(function(req, res, next) {
  Connect.findOne({ connect_id: req.headers['connect-id'] }, function(err, connect) {
      if (err) return next(err);
      if (connect) {
        next();
      } else {
        Connect.create({ connect_id: req.headers['connect-id'], todos: [] }, function(err, newConnect) {
          if (err) return next(err);
          next();
        });
      }
  });
});

// index
router.get('/', function(req, res, next) {
  Connect.findOne({ connect_id: req.headers['connect-id'] }, null, { sort: { order: 1, updated_at: 1 } }, function (err, connect) {
    if (err) return next(err);
    res.json(connect.todos);
  });
});

// store
router.post('/', function(req, res, next) {
  Connect.findOne({ connect_id: req.headers['connect-id'] }, function(err, connect) {
    if (err) return next(err);

    req.body.order = connect.todos.length;

    var newTodo = {
      title: req.body.title,
      completed: req.body.completed,
      note: req.body.note,
      order: req.body.order
    };

    connect.todos.push(req.body);
    connect.save(function(err) {
      if (err) return next(err);
      res.json(newTodo);
    });
  });
});

// show
router.get('/:id', function(req, res, next) {
  Connect.findOne({ connect_id: req.headers['connect-id'] }, function (err, connect) {
    if (err) return next(err);

    var todo = connect.todos.id(req.params.id);

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
  Connect.findOne({ connect_id: req.headers['connect-id'] }, function (err, connect) {
    if (err) return next(err);

    var todo = connect.todos.id(req.params.id);

    if (todo) {
      todo.title = req.body.title;
      todo.completed = req.body.completed;
      todo.note = req.body.note;
      todo.order = req.body.order;

      connect.save(function(err) {
        if (err) return next(err);
        res.json(todo);
      });
    } else {
      return respond.notFound(next);
    }
  });
});

// delete
router.delete('/:id', function(req, res, next) {
  Connect.findOne({ connect_id: req.headers['connect-id'] }, function (err, connect) {
    if (err) return next(err);

    var todo = connect.todos.id(req.params.id);
    if (todo) {
      todo.remove();
      connect.save(function(err) {
        if (err) return next(err);
        res.json(todo);
      });
    } else {
      return respond.notFound(next);
    }

  });
});

module.exports = router;
