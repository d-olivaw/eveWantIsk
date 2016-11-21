app.controller("eveController", ["$scope", "eveService", function($scope, eveService){
  $scope.view = {};
  $scope.view.hello = "hello";
  $scope.view.hide = false;
  $scope.view.showMe = function(){
    eveService.grabItems().then(function(data){
      console.log(data['data']['items'][0]);
      $scope.view.hide = true;
      $scope.view.info = data['items'][0];
    })
  }
}])
