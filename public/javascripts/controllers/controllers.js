app.controller("eveController", ["$scope", "eveService", '$location', "$window", function($scope, eveService, $location, $window){
  $scope.view = {};
  $scope.view.hello = "hello";
  $scope.view.hide = false;
  $scope.view.itemArr = [5439, 8529]
    //  4025,20345,12056,35656,497,8785,10678,485,12066,439,6003,9129,490,488,11297,491,21480,5975,5971,434,2921,3573,493,561,31298,5399,498,26929,9213,19952,11293,31790,12058,438,2048,5945,35662,12344,9133,11299,484,570,35660,19927,35658,12054,486,492,8905,20347,8817,6001,6001,9211,3090,12346,4471,7251,12052,8819,9417,2032,16469,10690,28668,9367,11343,574,11341,1236,21478,3098,3841,9207,2905,6005,10692,2881,31322,31370,4405,30987,12356,9413,487,8177,31598,2961,448,2865,12354,440,8815,2993,2977,35659,2897,7291,2303,20349,2969,12084,2889,8759,22291,20351,19937,7249,31009,11279,28213,11370,12068,10680,14276,11295,31111,20353,2873,7253,2364,2605,25565,519,10688,565,3074,2205,3244,2547,8865,23073,1447,2913,9137,8821,28215,2929,2553,9127,7373,8869,3831,8787,5973,32006,1952,14284,11325,23079,11351,9497,8789,9139,11309,23071,2456,31608,9453,9209,12076,1541,7289,9411,7371,32772,2281,3082,7369,14274,20452,7293,8909,9632,7247,7447,2488,14272,31274,31870,9135,7287,5955,35657,31105,31372,9457,496,9451,11311,33824,25715,9131,35661,9495,2185,7449,31538,8907,7453,11317,7367,14282,7783,9491,33076,9415,9329,14280,7451,16521,11105,9333,9493,9141,11319,8903,9327,31788,11327,9455,8867,11349,31718,31358,9331,14278,9369,9371,9377,8863,14286,10694];
  $scope.view.wrapArr = [];
  $scope.view.regionId = 10000002;
  $scope.view.doDixieId = 10000032;
  $scope.view.AmarrId = 10000043;
  $scope.view.stationId = 60003760;
  $scope.view.doDixieStation = 60011866;
  $scope.view.AmarrStation = 60008494;

  if($location.path() == '/home'){
    for (var i = 0; i < $scope.view.itemArr.length; i++) {
      let itemObj = {};
      let itemIdinArr = $scope.view.itemArr[i]
      eveService.grabSell($scope.view.regionId, itemIdinArr).then(function(data){
        var innest = data['data']['items'];
        var accumVolSell = 0;
        var newArr = [];
        for (var i = 0; i < innest.length; i++) {
          if(innest[i]['location']['id'] == $scope.view.stationId){
            newArr.push(innest[i]['price']);
            accumVolSell += innest[i]['volume'];
          }
        }
        var minSell = Math.min(...newArr);
        itemObj.volumeSell = accumVolSell;
        itemObj.sell = minSell;
        itemObj.name = innest[0]['type']['name'];
        itemObj.id = itemIdinArr;
      }).then(function(data){
        eveService.grabBuy($scope.view.regionId, itemIdinArr).then(function(data){
          var getinnest = data['data']['items']
          var newArr = [];
          for (var i = 0; i < getinnest.length; i++) {
            if(getinnest[i]['location']['id'] == $scope.view.stationId){
              newArr.push(getinnest[i]['price'])
            }
          }
          var maxBuy = Math.max(...newArr);
          itemObj.buy = maxBuy;
          itemObj.markup = 0.0
          if (itemObj.buy != 0) {
            itemObj.markup = (itemObj.sell / itemObj.buy) - 1;
          }
        });
      }).then(function(data){
        eveService.grab7Day($scope.view.regionId, itemIdinArr).then(function(data){
          var getinnest = data['data']['items']
          var average = 0;
          var nDay = 7;
          for (var i = 0; i < nDay; i++) {
            var idx = getinnest.length - i - 1;
            var volI = getinnest[i]['volume'];
            average += volI;
          }
          average /= nDay;
          itemObj.histAvg = average;
          // Calculate the potential profit
          itemObj.profitPotential = calcProfitPotential(itemObj);
          $scope.view.wrapArr.push(itemObj);
        })
      }).catch(function(err){
        console.log(err);
      })
    }
    console.log($scope.view.wrapArr);
  }
  $scope.view.login = function(){
    eveService.login($scope.view.username, $scope.view.password).then(function(res){
      if(res.data.errors){
        $scope.view.error = res.data.errors;
      }
      else{
        localStorage.jwt = res.data.token;
        $location.path('/home');
        $window.location.reload();
      }
    })
  }
  $scope.view.logout = function() {
    localStorage.clear();
    $location.path('/');
    $window.location.reload();
  }
}])

function calcProfitPotential(item) {

  var sellFactor = Math.min(item.sell/100000,2);

  var brokerTaxFee = 0.03
  var markupFactor = 1.0E-40;
  if (item.markup > brokerTaxFee) {
    markupFactor = 1.0 + item.markup*5
  }
  markupFactor = Math.min(markupFactor, 2);

  var histFactor = 0;
  if(item.volumeSell != 0){
    histFactor = Math.min(2.0*item.histAvg/item.volumeSell, 2);
  }
  var profitPotential = Math.log2(4.0*sellFactor*markupFactor*histFactor)/5.0;

  return Math.max(profitPotential, 0);
}
