var app = angular.module('HTMLApp', ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  //dynamic config from json array
  $.getJSON("/assets/json/menu.json", function (data) {
    angular.forEach(data, function (ele, index) {
      $routeProvider
        .when(ele.link, {
          templateUrl: ele.templateUrl,
          controller: ele.controller
        });
    });
  }).fail(function (error) {
    console.log(error);
  });

  $routeProvider


    // for first loading app
    .when('/loading', {
      templateUrl: '/pages/_loading.html',
      controller: 'LoadingCtrl'
    })

    // for dynamic config from json
    .when('/', {
      redirectTo: '/loading'
    })
    .when('/:for', {
      redirectTo: '/loading'
    })
    .otherwise({
      controller: 'ErrorCtrl'
    });

  $locationProvider
    .html5Mode(false)
    .hashPrefix('!');

}]);

app.controller('ErrorCtrl', ['$route', '$routeParams', '$location',
  function ($route, $routeParams, $location) {
  }]);

app.controller('LoadingCtrl', ['$route', '$routeParams', '$location', '$scope', '$rootScope', '$templateCache', '$window',
  function ($route, $routeParams, $location, $scope, $rootScope, $templateCache, $window) {
    $scope.$on('$viewContentLoaded', function () {
      // remove standard code
      var path = '/:for';
      var tmplUrl = $route.routes[path].templateUrl;
      $templateCache.remove(tmplUrl);
      delete ($route.routes[path]);
      delete ($route.routes[path + '/']);
      $window.location.href = "#!/" + ($routeParams.for == undefined ? "" : $routeParams.for);
    });
  }]);

app.controller('HomeCtrl', ['$route', '$routeParams', '$location',
  function ($route, $routeParams, $location) {
    console.log("home");
  }]);

app.controller('ProductsCtrl', ['$route', '$routeParams', '$location',
  function ($route, $routeParams, $location) {
    console.log("list-pro");
  }]);

app.run(['$rootScope', '$location', '$timeout', '$http', '$route', '$templateCache', '$routeParams',
  function ($rootScope, $location, $timeout, $http, $route, $templateCache, $routeParams) {
    // get header
    $.getJSON("/assets/json/menu.json", function (data) {
      $rootScope.ListHeader = data;
    }).fail(function (error) {
      console.log(error);
    });

    //$location.path($location.url());
    $location.path($location.url());

    $rootScope.$on('$routeChangeStart', function (next, current) {
    });
    $rootScope.$on('$routeChangeSuccess', function (next, current) {
    });
    $rootScope.$on('$routeChangeError', function (next, current) {
    });
    $rootScope.$on('$viewContentLoaded', function () {
      $rootScope.$on('finishedRenderHeaderSelected', function (event) {
        $("a").each(function () {
          if ($(this).attr("href").indexOf("#!") < 0) {
            $(this).attr("href", "#!/" + $(this).attr("href").replace(/\//g, ""));
          }
        });
      });
    });
  }
]);

app.directive('onFinishRender', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      if (scope.$last === true) {
        $timeout(function () {
          scope.$emit(attr.onFinishRender);
        });
      }
    }
  }
});


angular.bootstrap(document, ['HTMLApp']);