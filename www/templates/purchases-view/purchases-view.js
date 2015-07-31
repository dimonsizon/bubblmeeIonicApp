angular.module('app.purchases', [])
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('app.purchases', {
            url: "/purchases",
            views: {
                'menuContent': {
                    templateUrl: "templates/purchases-view/purchases.html",
                    controller: 'PurchasesCtrl'
                }
            }
        });
}])

.controller('PurchasesCtrl', ['$scope', '$rootScope', '$stateParams', '$http', '$location', '$filter',
    function ($scope, $rootScope, $stateParams, $http, $location, $filter) {
        //$rootScope.getPurchases();
        //$scope.purchases = $rootScope.purchases;
        //$scope.getPurchases = function() {
            
        //}
        
        $scope.openPurchaseDetails = function (purchase) {
            $rootScope.openPurchase = purchase;
            $location.path('/app/purchaseDetails');
        }

        
    } ]);
