'use strict';

var gitleworkoutApp = angular.module('gitleworkoutApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  gitleworkoutApp.directive('datepicker', function( $filter) {
    return {
        require: 'ngModel',
        link: function(scope, el, attr, ngModel) {
            $(el).datepicker({
                format: "yyyy-mm-dd"
            }).on('changeDate', function(ev) {
                scope.$apply(function() {
                    var dateText = $filter('date')(ev.date, 'yyyy-MM-dd');
                    ngModel.$setViewValue(dateText);
                });
            });

        }
    };
});
