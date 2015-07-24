angular.module('app.creditCard', [])
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('app.creditcard', {
            url: "/creditcard",
            views: {
                'menuContent': {
                    templateUrl: "templates/credit-card-view/credit-card.html",
                    controller: 'CreditCardCtrl'
                }
            }
        });
}])

.controller('CreditCardCtrl', ['$scope', '$stateParams', '$http',
function ($scope, $stateParams, $http) {


}]);
