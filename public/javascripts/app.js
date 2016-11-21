var app = angular.module('eveApp', ['ngRoute'])

app.config(function($routeProvider, $httpProvider){
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
