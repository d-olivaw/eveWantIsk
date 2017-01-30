app.factory('eveService', function($http) {
  return {
    login: function(username, pass){
      var user = {};
      user.username = username;
      user.pass = pass;
      return $http.post('/login', user)
    },
    dbAdd: function(obj){
      return $http.post('/api/database', obj)
    },
    grabData: function(){
      return $http.get('/api/data')
    },
    grabItemsById: function(){
      //we're not using this for now. could get average value
      return $http.get('https://crest-tq.eveonline.com/market/prices/')
    },
    grabSell: function(regionId, itemId){
      //grab sell prices for item at correct regionId
      return $http.get('https://crest-tq.eveonline.com/market/'+ regionId + '/orders/sell/?type=https://crest-tq.eveonline.com/inventory/types/' + itemId + '/')
    },
    grabBuy: function(regionId, itemId){
      //grab buy prices for item at correct regionid
      return $http.get('https://crest-tq.eveonline.com/market/'+ regionId + '/orders/buy/?type=https://crest-tq.eveonline.com/inventory/types/' + itemId + '/')
    },
    grab7Day: function(regionId, itemId){
      return $http.get('https://crest-tq.eveonline.com/market/' + regionId + '/history/?type=https://crest-tq.eveonline.com/inventory/types/' + itemId + '/')
    }
  }
});

// app.factory("eveInterceptor", function eveInterceptor($location) {
//   return {
//     request: function(config){
//       // console.log(localStorage.jwt);
//       if (localStorage.jwt && $location.path() == '/home') {
//         //do something here?
//       }
//       else if (localStorage.jwt) {
//         config.headers.Auhorization = 'Bearer ' + localStorage.jwt;
//       }
//       return config;
//     }
//   }
// })
