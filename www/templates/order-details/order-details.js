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

.controller('OrderDetailsCtrl', ['$scope', '$rootScope', '$stateParams', '$http', '$filter',
    function ($scope, $rootScope, $stateParams, $http, $filter) {
        $scope.orders = []; //проверить используется или нет
        $scope.products = $rootScope.openOrder.products;
    }]);
