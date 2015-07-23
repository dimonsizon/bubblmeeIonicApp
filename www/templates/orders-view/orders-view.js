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

.controller('OrdersCtrl', ['$scope', '$stateParams', '$http', '$filter',
    function ($scope, $stateParams, $http, $filter) {
    
        $scope.getOrders = function() {
            $http.get('https://api.bubblmee.com/merchant/pos/a19ed734-947c-4b4a-8fa8-1296e0fc9fc9/orderReport?from=1407618000000&to=1437685200000').success(function (data) {
                
                if (data.orders) {
                    for (var i = 0; i < data.orders.length; ++i) {
                        data.orders[i].timestampModel = $filter('date')(data.orders[i].timestamp, 'd MMMM yyyy ');
                    }
                }
                $scope.orders = data;
            });
        }

        $scope.getOrders();
    } ]);
