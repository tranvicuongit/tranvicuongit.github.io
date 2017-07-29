var app = angular.module('HTMLApp', ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/_home.html',
      controller: 'HomeCtrl'
    })
    .when('/danh-sach-san-pham', {
      templateUrl: 'pages/products/_product.list.html',
      controller: 'ProductsCtrl'
    });

  //$locationProvider.html5Mode(false, base: false);
  $locationProvider
    .html5Mode(false)
    .hashPrefix('!');
}]);

app.controller('HomeCtrl', ['$route', '$routeParams', '$location',
  function HomeCtrl($route, $routeParams, $location) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
  }]);

app.controller('ProductsCtrl', ['$route', '$routeParams', '$location',
  function ProductsCtrl($route, $routeParams, $location) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;


  }]);

app.run(['$rootScope', '$location', '$timeout', '$http', 'ToolService',
  function ($rootScope, $location, $timeout, $http, toolService) {
    
  }
]);


angular.bootstrap(document, ['HTMLApp']);