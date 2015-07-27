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
        $scope.orders = [];
        $scope.getOrders = function() {
            $http.get('https://dev-api.bubblmee.com/customer/orders?from=1407013200000&to=1438030800000').success(function (data) {
                if (data) {
                    for (var i = 0; i < data.length; ++i) {
                        data[i].timestampModel = $filter('date')(data[i].timestamp, 'd MMMM yyyy ');
                    }
                }
                
                $scope.error = "No Error";
                $scope.orders = data;
            }).error(function () {
                $scope.error = "Error";
            });
        }
        
        $scope.openOrderDetails = function (products) {
            $rootScope.openProducts = products;
            $location.path('/app/orderDetails');
        }

        $scope.getOrders();
    } ]);
