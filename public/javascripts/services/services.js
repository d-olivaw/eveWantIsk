app.factory('eveService', function($http) {
  return {
    grabItems: function(){
      return $http.get('https://crest-tq.eveonline.com/market/prices/')
    }
  }
});
