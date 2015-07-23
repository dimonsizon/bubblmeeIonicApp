angular.module('app.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $http, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});


    //$ionicModal.fromTemplateUrl('templates/login.html', {
    //    scope: $scope
    //}).then(function(modal) {
    //    $scope.modal = modal;
    //});

    //$scope.closeLogin = function() {
    //    $scope.modal.hide();
    //};

    //$scope.login = function() {
    //    $scope.modal.show();
    //};


    //$scope.doLogin = function() {
    //    console.log('Doing login', $scope.loginData);

    //    // Simulate a login delay. Remove this and replace with your login
    //    // code if using a login system
    //    $timeout(function() {
    //        $scope.closeLogin();
    //    }, 1000);
    //};
});

