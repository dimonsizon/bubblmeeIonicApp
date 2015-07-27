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

    }]);
