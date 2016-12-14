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
    .when('/greg', {
      templateUrl: "views/test.html",
      controller: 'eveController',
      resolve: {
        check: function($location, $rootScope){
            if($rootScope.user.id == 1){
                console.log('you are good');//Do something
            }else{
                $location.path('/kitty');    //redirect user to home.
                console.log("Nice try");
            }
        }
      }
    })
    .when('/kitty', {
      templateUrl: "views/wrong.html",
      controller: 'eveController',
      resolve: {
        check: function($location, $rootScope){
            if($rootScope.user.id != 1){
                console.log('you are good');//Do something
            }else{
                $location.path('/');    //redirect user to home.
                console.log("Nice try");
            }
        }
      }
    })
});

app.run(function($rootScope, $location) {

  if (localStorage.jwt) {
    console.log(localStorage.jwt);
    $rootScope.user = jwt_decode(localStorage.jwt);
    console.log("USER: " + $rootScope.user);
  }
});
