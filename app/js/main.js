(function () {

    'use strict';


    angular.module('zooom_app', ['ngRoute', 'ngAnimate'])

        .config([
            '$locationProvider',
            '$routeProvider',
            function($locationProvider, $routeProvider) {
                $locationProvider.hashPrefix('!');
                // routes
                $routeProvider
                    .when("/", {
                        templateUrl: "./partials/partial1.html",
                        controller: "MainController"
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }
        ]);

    //Load controller
    angular.module('zooom_app')

        .controller('MainController', [
            '$scope',
            function($scope) {
                $scope.test = "ddd";
            }
        ]);
 /*   angular.module('zooom_app')
        .controller('MainController', ['$scope', 'productsDataSource', function($scope, $productsDataSource) {
        $scope.title = 'Home';
        $scope.productsDataSource = $productsDataSource;
        $scope.listViewTemplate = '<p>{{ ShipCity }}</p>';
        }]);
    angular.module('zooom_app').factory('productsDataSource', function ($scope) {
        $scope.test = "ddd";
        });*/

}());