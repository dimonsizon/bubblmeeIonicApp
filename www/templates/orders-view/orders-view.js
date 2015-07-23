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

.controller('OrdersCtrl', function ($scope, $stateParams) {
});
