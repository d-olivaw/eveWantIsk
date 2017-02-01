var app = angular.module('eveApp', ['ngRoute']);
var errors;

app.config(function($routeProvider, $httpProvider){
  $routeProvider
    .when('/', {
      templateUrl: "views/login.html",
      controller: 'eveController'
    })
    .when('/home', {
      templateUrl: "views/home.html",
      controller: 'eveController',
      resolve: {
        check: function($location, $rootScope){
            if($rootScope.user && $rootScope.user.id == 1){
                console.log('you are good');//Do something
            }else{
                $location.path('/');    //redirect user to home.
            }
        }
      }
    })
});

app.run(function($rootScope, $location) {

  if (localStorage.jwt) {
    $rootScope.user = jwt_decode(localStorage.jwt);
  }
});
