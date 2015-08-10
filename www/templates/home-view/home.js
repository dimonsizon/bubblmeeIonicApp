angular.module('app.home', ['uiGmapgoogle-maps'])
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('app.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/home-view/home.html",
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('app.machineProducts', {
            url: "/:machineId/products",
            views: {
                'menuContent': {
                    templateUrl: "templates/home-view/machineProducts.html",
                    controller: 'MachineProductsCtrl'
                }
            }
        });
}])

.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApiProviders) {
    GoogleMapApiProviders.configure({
            china: true
        });
    }]
)

.controller('HomeCtrl', ['$scope', '$stateParams', '$http',
function ($scope, $stateParams, $http) {
    $scope.lastMachines = [];
    $http.get('https://dev-api.bubblmee.com/customer/pos/recent').success(function (data, status) {
        $scope.lastMachines = data;
    }).error(function (status) {
        $scope.error = "Unexpected error";
    });
}])

.controller('MachineProductsCtrl', ['$scope', '$stateParams', '$stateParams', '$http',
function ($scope, $stateParams, $stateParams, $http) {
    $scope.machineProducts = [];
    $scope.machine = [];
    $scope.map = [];
    $scope.mapIsOpen = false;
    
    $http.get('https://dev-api.bubblmee.com/customer/pos/' + $stateParams.machineId + '/products').success(function (data, status) {
        $scope.machineProducts = data;
    }).error(function (status) {
        $scope.error = "Unexpected error";
    });
    $http.get('https://dev-api.bubblmee.com/customer/pos/' + $stateParams.machineId).success(function (data, status) {
        $scope.machine = data;
        
    }).error(function (status) {
        $scope.error = "Unexpected error";
    });
    
    $scope.openMap = function () {
        $scope.mapIsOpen = !$scope.mapIsOpen;
        $scope.map = { center: { latitude: $scope.machine.locationLat, longitude: $scope.machine.locationLong }, zoom: 15 };
        $scope.marker = {
            id: 0,
            coords: {
                latitude: $scope.machine.locationLat,
                longitude: $scope.machine.locationLong
            },
            options: { draggable: true },
            events: {
                dragend: function (marker, eventName, args) {
                    $log.log('marker dragend');
                    var lat = marker.getPosition().lat();
                    var lon = marker.getPosition().lng();
                    $log.log(lat);
                    $log.log(lon);

                    $scope.marker.options = {
                        draggable: true,
                        labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                    };
                }
            }
        };
    }

}]);
