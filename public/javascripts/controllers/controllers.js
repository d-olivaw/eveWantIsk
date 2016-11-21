app.controller("eveController", ["$scope", "eveService", function($scope, eveService){
  $scope.view = {};
  $scope.view.hello = "hello";
  $scope.view.hide = false;
  $scope.view.showMe = function(){
    eveService.grabItems().then(function(data){
      var itemInfo = data['data']['items'];
      for (var i = 0; i < itemInfo.length; i++) {
        if(itemInfo[i]['type']['id'] == 5439){
          console.log(itemInfo[i]);
          $scope.view.hide = true;
          $scope.view.info = itemInfo[i];
        }
      }
    })
  }
}])
