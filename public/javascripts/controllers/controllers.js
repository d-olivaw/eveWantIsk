app.controller("eveController", ["$scope", "eveService", function($scope, eveService){
  $scope.view = {};
  $scope.view.hello = "hello";
  $scope.view.hide = false;
  $scope.view.regionId = 10000002;
  $scope.view.itemId = 5439;
  $scope.view.stationId = 60003760;
  eveService.grabSell($scope.view.regionId, $scope.view.itemId).then(function(data){
    var innest = data['data']['items']
    var newArr = [];
    for (var i = 0; i < innest.length; i++) {
      if(innest[i]['location']['id'] == $scope.view.stationId){
        newArr.push(innest[i]['price'])
      }
    }
    var maxSell = Math.min(...newArr);
    console.log('jita-sell', maxSell);
  });
  eveService.grabBuy($scope.view.regionId, $scope.view.itemId).then(function(data){
    var getinnest = data['data']['items']
    var newArr = [];
    for (var i = 0; i < getinnest.length; i++) {
      if(getinnest[i]['location']['id'] == $scope.view.stationId){
        newArr.push(getinnest[i]['price'])
      }
    }
    var maxBuy = Math.max(...newArr);
    console.log('jita-buy', maxBuy);
  });
  // $scope.view.showMe = function(){
  //   eveService.grabItemsById().then(function(data){
  //     var itemInfo = data['data']['items'];
  //     for (var i = 0; i < itemInfo.length; i++) {
  //       if(itemInfo[i]['type']['id'] == 5439){
  //         console.log(itemInfo[i]);
  //         $scope.view.hide = true;
  //         $scope.view.info = itemInfo[i];
  //       }
  //     }
  //   })
  // }
}])
