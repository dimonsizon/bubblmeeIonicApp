angular.module('app.orderDetails', [])
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('app.orderDetails', {
            url: "/orderDetails",
            views: {
                'menuContent': {
                    templateUrl: "templates/order-details/order-details.html",
                    controller: 'OrderDetailsCtrl'
                }
            }
        });
}])

.controller('OrderDetailsCtrl', ['$scope', '$stateParams', '$http', '$filter',
    function ($scope, $stateParams, $http, $filter) {
        $scope.orders = [];
        $scope.getOrderDetails = function () {
            $http.get('https://api.bubblmee.com/merchant/pos/a19ed734-947c-4b4a-8fa8-1296e0fc9fc9/orderReport?from=1407013200000&to=1438030800000').success(function (data) {
                $scope.orders = data.orders;
            }).error(function () {
            });
        }

        $scope.getOrderDetails();
    }]);
