var ngApp = angular.module('tinyTodo', ['ngResource']);

ngApp.factory('Todo', ['$resource', function($resource) {
    return $resource('todos/:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    });
}]);

ngApp.controller('TodoController', ['$scope', 'Todo', function($scope, Todo) {
    $scope.todos = [];

    $scope.getTodos = function() {
        Todo.query(function(results) {
            $scope.todos = results;
        });
    };

    $scope.addTodo = function(form) {
        if (form && form.$valid) {

            var todo = new Todo();
            todo.title = $scope.title;
            todo.note = '';
            todo.completed = false;

            todo.$save(function(result) {
                $scope.todos.push(result);
                $scope.title = '';

                form.$setPristine();
                form.$setUntouched();
            });
        }
    };

    $scope.toggleCompleted = function(todo) {
        todo.$update(function() {
            $scope.getTodos.call();
        });
    };

    $scope.deleteTodo = function(todo) {
        todo.$update(function() {
            $scope.getTodos.call();
        });
    };

    // Load todos
    $scope.getTodos.call();
}]);