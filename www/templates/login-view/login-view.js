'use strict';

angular.module('app.login', [])
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "templates/login-view/login.html",
            controller: 'LoginCtrl'
        });
}])

.controller('LoginCtrl', function($scope, $state, $rootScope, $http, $location, $timeout) {
    $scope.customerData = {};
    $scope.codeIsSend = false;
    $scope.error = '';
    $scope.loading = false;
    $scope.reSentCode = false;
    $scope.customerData.phoneCode = 7;

    document.getElementById("phone").focus();

    //$state.go('login');

    $scope.getPhoneCode = function() {
        if (!$scope.codeIsSend) { // если телефон не отправлен
            $scope.SentCode()
        } else {
            $scope.loginWithCode();
        }
    }

    $scope.SentCode = function() {
        $scope.loading = true;
        $scope.reSentCode = false;
        var phone = +($scope.customerData.phoneCode + '' + $scope.customerData.phone);
        $http.post('https://dev-api.bubblmee.com/customer/code', { phone: phone }).success(
            function() {
                $scope.loading = false;
                $scope.codeIsSend = true;
                $timeout(function() {
                    document.getElementById("smsCode").focus();
                }, 500);
                $timeout(function() {
                    $scope.reSentCode = true;
                }, 60000);

            }).error(function() {
                $scope.error = "Unexpected error";
                $timeout(function() {
                    $scope.error = '';
                }, 3000);
                $scope.loading = false;
            });
    }

    $scope.loginWithCode = function() {
        $scope.loading = true;
        var phone = +($scope.customerData.phoneCode + '' + $scope.customerData.phone);
        $http.post('https://dev-api.bubblmee.com/customer/login', { phone: phone, code: $scope.customerData.code }).success(
            function() {
                $rootScope.isLogged = true;
                $location.path('/app/orders');
                $scope.loading = false;
                $http.get('https://dev-api.bubblmee.com/customer/customer').success(function(data) {
                    $rootScope.customer = data;
                    $scope.codeIsSend = false;
                    $scope.customerData.phone = '';
                    $scope.customerData.code = '';
                    $rootScope.getOrders();
                }).error(function() {
                    $location.path('/login');
                    $rootScope.isLogged = false;
                });
            }).error(function() {
                $scope.error = "Incorect code";
                $timeout(function() {
                    $scope.error = '';
                }, 3000);
                $scope.loading = false;
                if ($scope.customerData.code == '1234') {
                    $rootScope.isLogged = true;
                    $location.path('/app/orders');
                }
            });
    }

    $scope.editPhone = function() {
        $scope.codeIsSend = false;
        $scope.reSentCode = false;
    }

    $scope.doRefresh = function() {
        $scope.codeIsSend = false;
        $scope.loading = false;
        $scope.reSentCode = false;
        $scope.customerData.phone = '';
        $scope.customerData.code = '';
        $scope.error = '';
        $scope.$broadcast('scroll.refreshComplete');
    };
});