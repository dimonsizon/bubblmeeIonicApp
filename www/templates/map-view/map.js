angular.module('app.map', [])
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('app.map', {
            url: "/map",
            views: {
                'menuContent': {
                    templateUrl: "templates/map-view/map.html",
                    controller: 'MapCtrl'
                }
            }
        });
}])

.controller('MapCtrl', ['$scope', '$stateParams', '$http',
function ($scope, $stateParams, $http) {


}]);
