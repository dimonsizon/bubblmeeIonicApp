angular.module('app.home', [])
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('app.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/home-view/home.html",
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('app.machineProducts', {
            url: "/:machineId/products",
            views: {
                'menuContent': {
                    templateUrl: "templates/home-view/machineProducts.html",
                    controller: 'MachineProductsCtrl'
                }
            }
        });
}])

.controller('HomeCtrl', ['$scope', '$stateParams', '$http',
function ($scope, $stateParams, $http) {
    $scope.lastMachines = [];
    $http.get('https://dev-api.bubblmee.com/customer/pos/recent').success(function (data, status) {
        $scope.lastMachines = data;
    }).error(function (status) {
        $scope.error = "Unexpected error";
    });
}])

.controller('MachineProductsCtrl', ['$scope', '$stateParams', '$stateParams', '$http',
function ($scope, $stateParams, $stateParams, $http) {
    $scope.machineProducts = [];
    $http.get('https://dev-api.bubblmee.com/customer/pos/' + $stateParams.machineId + '/products').success(function (data, status) {
        $scope.machineProducts = data;
    }).error(function (status) {
        $scope.error = "Unexpected error";
    });

}]);
