var ngApp = angular.module('tinyTodo', ['ngResource']);

ngApp.factory('Todo', ['$resource', function($resource) {
    return $resource('todos');
}]);

ngApp.controller('TodoController', ['$scope', 'Todo', function($scope, Todo) {
    $scope.todos = [];

    Todo.query(function(results) {
        $scope.todos = results;
    });

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
}]);