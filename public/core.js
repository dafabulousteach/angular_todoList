var todoList = angular.module('todoList', []);

function mainController($scope, $http){
  $scope.formData = {};

  // this will render all the todos from database and display them 
  $http.get('/api/todos')
    .success(function(data){
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data){
      console.log('Error: ' + data);
    });

  // when submitting a todo, send the text to the node API
  $scope.createTodo = function(){
    $http.post('/api/todos', $scope.formData)
      .success(function(data){
        $scope.formData = {}; // clears the form
        $scope.todos = data;
        console.log(data);
      })
      .error(function(dadta){
        console.log('Error: ' + data);
      });
  };

  // delete a todo after it is checked
  $scope.deleteTodo = function(id){
    $http.delete('/api/todos' + id)
      .success(function(data){
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };

};