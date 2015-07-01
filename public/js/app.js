var ngApp = angular.module('tinyTodo', ['ngResource']);

ngApp.factory('Todo', ['$resource', function($resource) {
    return $resource('todos/:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    });
}]);

ngApp.directive('todoItem', function() {
    return {
        restrict: 'E',
        templateUrl: 'list-item.html',
        link: function (scope, element, attr) {
            var prevText, newText;

            angular.element(element[0].querySelector('.todo-move')).on('mousedown', function(e) {

            });

            angular.element(element[0].querySelector('.todo-title')).on('focus', function(e) {
                prevText = e.target.textContent || e.target.innerText;
            });

            angular.element(element[0].querySelector('.todo-title')).on('blur', function(e) {
                newText = e.target.textContent || e.target.innerText;

                // if content changed
                if (newText != prevText) {
                    textSubmitted.call(this, e);
                }

                // Clean up
                prevText = newText = '';
            });

            angular.element(element[0].querySelector('.todo-title')).on('keypress', function(e) {
                var code = e.keyCode || e.which;
                if(code == 13) {
                    e.target.blur();
                    e.preventDefault();
                }
            });

            function textSubmitted(e) {
                scope.todo.title = newText;
                scope.updateTodo.apply(null, [scope.todo]);
            }

            // element.on('mousedown', function(event) {
            //     // Prevent default dragging of selected content
            //     event.preventDefault();
            //     startX = event.pageX - x;
            //     startY = event.pageY - y;
            //     $document.on('mousemove', mousemove);
            //     $document.on('mouseup', mouseup);
            // });
        }
    };
});

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

    $scope.updateTodo = function(todo) {
        todo.$update(function() {
            $scope.getTodos.call();
        });
    };

    $scope.toggleCompleted = function(todo) {
        todo.$update(function() {
            $scope.getTodos.call();
        });
    };

    $scope.deleteTodo = function(e, todo) {
        e.preventDefault();
        todo.$delete(function() {
            $scope.getTodos.call();
        });
    };

    // Load todos
    $scope.getTodos.call();
}]);