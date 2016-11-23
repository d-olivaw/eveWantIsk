app.factory('eveService', function($http) {
  return {
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
  }
});
