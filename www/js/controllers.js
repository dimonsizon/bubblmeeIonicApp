angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $http, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };
    
  


  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('LoginCtrl', function ($scope, $state, $rootScope, $http, $location, $timeout) {
    $scope.customerData = {};
    $scope.codeIsSend = false;
    $scope.error = '';
    $scope.loading = false;
    $scope.reSentCode = false;
    
    //$state.go('login');
    
    $scope.getPhoneCode = function () {
        if (!$scope.codeIsSend) { // если телефон не отправлен
            $scope.SentCode()
        } else {
            $scope.loginWithCode();
        }
    }
    
    $scope.SentCode = function () {
        $scope.loading = true;
        $scope.reSentCode = false;
        $http.post('https://api.bubblmee.com/customer/code', { phone: $scope.customerData.phone }).success(
            function () {
                $scope.loading = false;
                $scope.codeIsSend = true;
                $timeout(function() {
                    $scope.reSentCode = true;
                }, 60000);
            }).error(function () {
                $scope.error = "Unexpected error";
                $timeout(function() {
                    $scope.error = '';
                }, 3000);
                $scope.loading = false;
            });
    }
    
    $scope.loginWithCode = function () {
        $scope.loading = true;
        $http.post('https://api.bubblmee.com/customer/login', { phone: $scope.customerData.phone, code: $scope.customerData.code }).success(
            function () {
                $rootScope.isLogged = true;
                $location.path('/app/home');
                $scope.loading = false;
                $http.get('https://api.bubblmee.com/customer/customer').success(function (data) {
                    $rootScope.customer = data;
                    $scope.codeIsSend = false;
                    $scope.customerData.phone = '';
                    $scope.customerData.code = '';
                }).error(function () {
                    $location.path('/login');
                    $rootScope.isLogged = false;
                });
            }).error(function () {
                $scope.error = "Incorect code";
                $timeout(function () {
                    $scope.error = '';
                }, 3000);
                $scope.loading = false;
            });
    }
    
    $scope.editPhone = function() {
        $scope.codeIsSend = false;
        $scope.reSentCode = false;
    }
    
    $scope.doRefresh = function () {
        $scope.codeIsSend = false;
        $scope.loading = false;
        $scope.reSentCode = false;
        $scope.customerData.phone = '';
        $scope.customerData.code = '';
        $scope.error = '';
        $scope.$broadcast('scroll.refreshComplete');
    };
})

.controller('HomeCtrl', function($scope, $stateParams) {
});
