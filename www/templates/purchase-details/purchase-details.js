angular.module('app.purchaseDetails', [])
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('app.purchaseDetails', {
            url: "/purchaseDetails",
            views: {
                'menuContent': {
                    templateUrl: "templates/purchase-details/purchase-details.html",
                    controller: 'PurchaseDetailsCtrl'
                }
            }
        });
}])

.controller('PurchaseDetailsCtrl', ['$scope', '$rootScope', '$stateParams', '$http', '$filter',
    function ($scope, $rootScope, $stateParams, $http, $filter) {
        $scope.purchases = []; //проверить используется или нет
        $scope.products = $rootScope.openPurchase.products;
    }]);
