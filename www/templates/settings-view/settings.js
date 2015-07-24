angular.module('app.settings', [])
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('app.settings', {
            url: "/settings",
            views: {
                'menuContent': {
                    templateUrl: "templates/settings-view/settings.html",
                    controller: 'SettingsCtrl'
                }
            }
        });
}])

.controller('SettingsCtrl', ['$scope', '$stateParams', '$http',
    function ($scope, $stateParams, $http) {

       
    }]);
