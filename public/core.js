// public/core.js
var KarnageBlog = angular.module('KarnageBlog', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all the posts from mongo and show them
    $http.get('/api/posts')
        .success(function(data) {
            $scope.posts = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createBlogPost = function() {
        $http.post('/api/posts', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                // clear the form so our user is ready to enter another
                $scope.posts = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a post after checking it
    $scope.deleteBlogPost = function(id) {
      $http.delete('/api/posts/' + id)
        .success(function(data) {
          $scope.posts = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

}
