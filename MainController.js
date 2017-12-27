// Code goes here
(function() {

  var app = angular.module("githubViewer");

  var MainCtrl = function($scope,$interval,$location) {

    var decrementCountdown = function(){
      $scope.countDown -= 1
      if($scope.countDown < 1){
        $scope.search($scope.username);
      }
      
    };

    var countdownInterval = null;
    var startCountDown = function(){
      countdownInterval = $interval(decrementCountdown,1000,$scope.countDown);
    };

    $scope.search = function(username) {
        if(countdownInterval){
          $interval.cancel();
          $scope.countDown =null;
        }
        $location.path("/user/"+username)

    };

    
    
    $scope.username="angular";
    $scope.countDown = 5;
    startCountDown();

  };

  app.controller("MainCtrl", MainCtrl);
}());