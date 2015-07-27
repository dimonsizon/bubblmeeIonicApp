angular.module('app.orders', [])
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('app.orders', {
            url: "/orders",
            views: {
                'menuContent': {
                    templateUrl: "templates/orders-view/orders.html",
                    controller: 'OrdersCtrl'
                }
            }
        });
}])

.controller('OrdersCtrl', ['$scope', '$rootScope', '$stateParams', '$http', '$location', '$filter',
    function ($scope, $rootScope, $stateParams, $http, $location, $filter) {
        //$rootScope.getOrders();
        //$scope.orders = $rootScope.orders;
        //$scope.getOrders = function() {
            
        //}
        
        $scope.openOrderDetails = function (products) {
            $rootScope.openProducts = products;
            $location.path('/app/orderDetails');
        }

        
    } ]);
