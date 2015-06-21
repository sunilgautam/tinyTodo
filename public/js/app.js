var ngApp = angular.module('tinyTodo', []);

ngApp.controller('TodoController', function($scope) {
    $scope.todos = [{title: 'First entry'}];

    $scope.addTodo = function(form) {
        if (form && form.$valid) {
            $scope.todos.push({ title: $scope.title });
            $scope.title = '';

            form.$setPristine();
            form.$setUntouched();
        }
    };
});