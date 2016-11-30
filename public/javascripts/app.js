var app = angular.module('eveApp', ['ngRoute'])

app.config(function($routeProvider, $httpProvider){
  $httpProvider.interceptors.push('eveInterceptor');
  $routeProvider
    .when('/', {
      templateUrl: "views/login.html",
      controller: 'eveController'
    })
    .when('/home', {
      templateUrl: "views/home.html",
      controller: 'eveController'
    })
});

app.run(function($rootScope, $location) {

  if (localStorage.jwt) {
    $rootScope.user = jwt_decode(localStorage.jwt);
    console.log("USER: " + $rootScope.user);
  }
});
