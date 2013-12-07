'use strict';

angular.module('gitleworkoutApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.entries = [
    {
    	'datetime': '2013-12-07',
    	'exercise': 'Push-ups',
    	'sets': 1,
    	'reps': 10
    },
    {
    	'datetime': '2013-12-07',
    	'exercise': 'Push-ups',
    	'sets': 2,
    	'reps': 12
    }];

    $scope.addEntry = function(entry){
    	
    	var tmpEntry = {};

		tmpEntry.datetime = entry.datetime
		tmpEntry.exercise = entry.exercise
		tmpEntry.sets = entry.sets
		tmpEntry.reps = entry.reps

    	$scope.entries.splice(0,0,tmpEntry);
    }
  });
