angular.module('app.coupons', [])
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('app.coupons', {
            url: "/coupons",
            views: {
                'menuContent': {
                    templateUrl: "templates/coupons-view/coupons.html",
                    controller: 'CouponsCtrl'
                }
            }
        });
}])

.controller('CouponsCtrl', ['$scope', '$stateParams', '$http',
function ($scope, $stateParams, $http) {


}]);
