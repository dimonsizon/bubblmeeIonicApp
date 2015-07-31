// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', [
    'ionic',
    'ngCordova',
    'app.controllers',
    'app.login',
    'app.purchases',
    'app.purchaseDetails',
    'app.settings',
    'app.creditCard',
    'app.coupons',
    'app.map',
    'app.feedback'
])

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
    });
  // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/purchases');
})

.run(['$rootScope', '$http', '$location', '$state', '$filter',
    function ($rootScope, $http, $location, $state, $filter) {
    $rootScope.isLogged = false;
    $rootScope.customer = {};
    $rootScope.purchases = [];
    $rootScope.openPurchase = [];
    $http.get('https://dev-api.bubblmee.com/customer/customer').success(function (data) {
        $rootScope.customer = data;
        $rootScope.isLogged = true;
        $location.path('/app/purchases');
        $rootScope.getPurchases();
        routChangeCallback();
    }).error(function () {
        $rootScope.isLogged = false;
        $location.path('/login');
        //$state.go('app.login');
        routChangeCallback();
    });

    $rootScope.logout = function () {
        $http.post('https://dev-api.bubblmee.com/customer/logout').success(
            function () {
                $rootScope.customer = {};
                $rootScope.isLogged = false;
                $location.path('/login');
            }).error(function () {
                $rootScope.error = "Unexpected error in Logout";
            });
    };
        
    $rootScope.getPurchases = function () {
        $http.get('https://dev-api.bubblmee.com/customer/orders?from=1407013200000&to=1438030800000').success(function (data, status) {
            if (data) {
                for (var i = 0; i < data.length; ++i) {
                    data[i].timestampModel = $filter('date')(data[i].timestamp, 'd MMMM yyyy ');
                }
            }

            $rootScope.purchases = data;
        }).error(function (status) {
            
        });
    };
        
    var routChangeCallback = function () {
        $rootScope.$on('$stateChangeSuccess', function (event) {
            if (!$rootScope.isLogged) {
                $location.path('/login');
            } else {
                //$location.path('/app/purchases');
            }
        });
    };
}]);

