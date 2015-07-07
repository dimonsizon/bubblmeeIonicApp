// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {
    $httpProvider.defaults.withCredentials = true;
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })
    
    .state('app.login', {
        url: "/login",
        views: {
            'menuContent': {
                templateUrl: "templates/login.html",
                controller: 'LoginCtrl'
            }
        }
    })

    .state('app.home', {
        url: "/home",
        views: {
            'menuContent': {
                templateUrl: "templates/home.html",
                controller: 'HomeCtrl'
            }
        }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})

.run(['$rootScope', '$http',  '$location', '$state',
    function ($rootScope, $http, $location, $state) {
    $rootScope.isLogged = false;
    $rootScope.customer = { };
    $http.get('https://api.bubblmee.com/customer/customer').success(function (data) {
        $rootScope.customer = data;
        $rootScope.isLogged = true;

    }).error(function () {
        $rootScope.isLogged = false;
        $location.path('/app/login');
        //$state.go('app.login');
    });

    $rootScope.logout = function () {
        $http.post('https://api.bubblmee.com/customer/logout').success(
            function () {
                $rootScope.customer = {};
                $rootScope.isLogged = false;
                $location.path('/app/login');
            }).error(function () {
                $rootScope.error = "Unexpected error in Logout";
            });
    };

    $rootScope.$on('$stateChangeStart', function (event) {
        if (!$rootScope.isLogged) {
            $location.path('/app/login');
        }
    });
}]);
