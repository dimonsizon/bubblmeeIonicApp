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

.controller('LoginCtrl', function ($scope, $state, $rootScope, $http, $location) {
    $scope.customerData = {};
    $scope.phoneIsSend = false;
    $scope.error = '';
    $scope.loading = false;
    
    $state.go('app.login');
    
    $scope.getPhoneCode = function () {
        $scope.loading = true;
        if (!$scope.phoneIsSend) { // если телефон не отправлен
            $http.post('https://api.bubblmee.com/customer/code', { phone: $scope.customerData.phone }).success(
                function () {
                    $scope.loading = false;
                    $scope.phoneIsSend = true;
                }).error(function() {
                    $scope.error = "Incorect phone";
                    $scope.errorClass = "text-danger";
                });
        } else {
            $http.post('https://api.bubblmee.com/customer/login', { phone: $scope.customerData.phone, code: $scope.customerData.code }).success(
                function () {
                    $scope.loading = false;
                    $location.path('/app/home');
                    $http.get('https://api.bubblmee.com/customer/customer').success(function (data) {
                        $rootScope.customer = data;
                        $rootScope.isLogged = true;

                    }).error(function () {
                        $rootScope.isLogged = false;
                        $location.path('/app/login');
                    });
                }).error(function () {
                    $scope.error = "Incorect code";
                    $scope.errorClass = "text-danger";
                });
        }
    }
    
    $scope.doRefresh = function () {
        $scope.phoneIsSend = false;
        $scope.loading = false;
        $scope.customerData.phone = '';
        $scope.customerData.code = '';
        $scope.error = '';
        $scope.$broadcast('scroll.refreshComplete');
    };
})

.controller('HomeCtrl', function($scope, $stateParams) {
});
