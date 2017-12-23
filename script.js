// Code goes here
(function() {

  var app = angular.module("githubViewer", []);
  var MainCtrl = function($scope, $http,$interval,$log) {

    var onUserComplete = function(response) {

      $scope.user = response.data;
      $http.get($scope.user.repos_url)
        .then(onRepos, onError);

    };

    var onRepos = function(response) {
      $scope.repos = response.data;
    };
    
    $scope.search = function(username) {
      $log.info("Searching for " +username );
      $http.get("https://api.github.com/users/" + username)
        .then(onUserComplete, onError);
        if(countdownInterval){
          $interval.cancel();
          $scope.countDown =null;
        }
    };

    var onError = function(reason) {

      $scope.error = "Sorry, Could not fetch data at this moment"

    };
    var countdownInterval = null;
    var decrementCountdown = function(){
      $scope.countDown -= 1
      if($scope.countDown < 1){
        $scope.search($scope.username);
      }
      
    };
    
    var startCountDown = function(){
      countdownInterval = $interval(decrementCountdown,1000,$scope.countDown);
    };
    
    $scope.username="angular";
    $scope.countDown = 5;
    startCountDown();

  };

  app.controller("MainCtrl", MainCtrl);
}());