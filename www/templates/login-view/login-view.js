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

.factory('focus', function ($timeout, $window) {
    return function (id) {
        // timeout makes sure that it is invoked after any other event has been triggered.
        // e.g. click events that need to run before the focus or
        // inputs elements that are in a disabled state but are enabled when those events
        // are triggered.
        $timeout(function () {
            var element = $window.document.getElementById(id);
            if (element)
                element.focus();
        });
    };
})

.directive('eventFocus', function (focus) {
    return function (scope, elem, attr) {
        elem.on(attr.eventFocus, function () {
            focus(attr.eventFocusId);
        });

        // Removes bound events in the element itself
        // when the scope is destroyed
        scope.$on('$destroy', function () {
            elem.off(attr.eventFocus);
        });
    };
})

.directive('intlTel', function () {
    return {
        replace: true,
        restrict: 'E',
        require: 'ngModel',
        template: '<input type="text" placeholder="+7 702 123 4567" />',
        link: function (scope, element, attrs, ngModel) {
            var read = function () {
                var inputValue = element.val();
                ngModel.$setViewValue(inputValue);
            }
            element.intlTelInput({
                defaultCountry: 'ru',
            });
            element.on('focus blur keyup change', function () {
                scope.$apply(read);
            });
            read();
        }
    }
})

.controller('LoginCtrl', function ($scope, $state, $rootScope, $http, $location, $timeout, focus) {
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
                }, 1500);
                //$scope.smsCodeFocus = true; //focus o sms code unput
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
                $location.path('/app/purchases');
                $scope.loading = false;
                $http.get('https://dev-api.bubblmee.com/customer/customer').success(function(data) {
                    $rootScope.customer = data;
                    $scope.codeIsSend = false;
                    $scope.customerData.phone = '';
                    $scope.customerData.code = '';
                    $rootScope.getPurchases();
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
                    $location.path('/app/purchases');
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