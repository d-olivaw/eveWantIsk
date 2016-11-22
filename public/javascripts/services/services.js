app.factory('eveService', function($http) {
  return {
    grabItemsById: function(){
      return $http.get('https://crest-tq.eveonline.com/market/prices/')
    },
    grabSell: function(regionId, itemId){
      return $http.get('https://crest-tq.eveonline.com/market/'+ regionId + '/orders/sell/?type=https://crest-tq.eveonline.com/inventory/types/' + itemId + '/')
    },
    grabBuy: function(regionId, itemId){
      return $http.get('https://crest-tq.eveonline.com/market/'+ regionId + '/orders/buy/?type=https://crest-tq.eveonline.com/inventory/types/' + itemId + '/')
    },
  }
});
