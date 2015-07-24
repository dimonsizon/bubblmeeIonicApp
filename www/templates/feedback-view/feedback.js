angular.module('app.feedback', [])
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('app.feedback', {
            url: "/feedback",
            views: {
                'menuContent': {
                    templateUrl: "templates/feedback-view/feedback.html",
                    controller: 'FeedbackCtrl'
                }
            }
        });
}])

.controller('FeedbackCtrl', ['$scope', '$stateParams', '$http',
function ($scope, $stateParams, $http) {


}]);
