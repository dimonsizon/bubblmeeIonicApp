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

.controller('CreditCardCtrl', ['$scope', '$stateParams', '$http', '$cordovaBarcodeScanner',
function ($scope, $stateParams, $http, $cordovaBarcodeScanner) {
    $scope.barcodeData = [];
    
    $scope.scanQRCode = function() {
        $cordovaBarcodeScanner
          .scan()
          .then(function (barcodeData) {
              $scope.barcodeData = barcodeData;
              alert(barcodeData.text);
              // Success! Barcode data is here
          }, function (error) {
              alert(error);
              // An error occurred
          });
    }
    //document.addEventListener("deviceready", function () {

        //$cordovaBarcodeScanner
        //  .scan()
        //  .then(function (barcodeData) {
        //      $scope.barcodeData = barcodeData;
        //      alert(barcodeData.text);
        //      // Success! Barcode data is here
        //  }, function (error) {
        //      alert(error);
        //      // An error occurred
        //  });


        // NOTE: encoding not functioning yet
    //    $cordovaBarcodeScanner
    //      .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
    //      .then(function (success) {
    //          // Success!
    //      }, function (error) {
    //          // An error occurred
    //      });

    //}, false);


}]);
