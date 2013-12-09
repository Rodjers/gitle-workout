'use strict';

angular.module('gitleworkoutApp')
  .controller('MainCtrl', function ($scope, angularFire) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // $scope.entries = [
    // {
    // 	'date': '2013-12-08',
    // 		'exercises': [
    // 		{
    // 			'name': 'Push-ups',
    // 			'sets':[
    // 			{'reps': 10},
    // 			{'reps': 17},
    // 			{'reps': 11},
    // 			{'reps': 20}]
    // 		},
    // 		{
    // 			'name': 'Sit-ups',
    // 			'sets':[
    // 			{'reps': 13},
    // 			{'reps': 14},
    // 			{'reps': 5},
    // 			{'reps': 20}]
    // 		}]
    // },
    // {
    // 	'date': '2013-12-09',
    // 		'exercises': [
    // 		{
    // 			'name': 'Push-ups',
    // 			'sets':[
    // 			{'reps': 13},
    // 			{'reps': 14},
    // 			{'reps': 17},
    // 			{'reps': 20}]
    // 		},
    // 		{
    // 			'name': 'Sit-ups',
    // 			'sets':[
    // 			{'reps': 18},
    // 			{'reps': 13},
    // 			{'reps': 8},
    // 			{'reps': 19}]
    // 		}]
    // }];

    $scope.entries = [];

        var url = 'https://gitleworkout.firebaseio.com/log/workout/';
        var ref = new Firebase(url);
        angularFire(ref, $scope, "entries")

    // $scope.entries = [
    // {
    // 	'datetime': '2013-12-07',
    // 	'exercise': 'Push-ups',
    // 	'sets': 1,
    // 	'reps': 10
    // },
    // {
    // 	'datetime': '2013-12-07',
    // 	'exercise': 'Push-ups',
    // 	'sets': 2,
    // 	'reps': 12
    // }];

    
    $scope.addExercise = function(exercise, index){
    	
    	var tmpExercise = {};

		tmpExercise.name = exercise.name
		tmpExercise.sets = [];

		for (var i = 0; i < exercise.sets.length; i++){
			tmpExercise.sets.splice(i,0,exercise.sets[i])
		}
		if (!$scope.entries[index].exercises){
			$scope.entries[index].exercises = [];
		}
    	$scope.entries[index].exercises.splice(0,0,tmpExercise);
    }
    $scope.addSet = function(exercise){

    	var set = {'reps': null};
    	exercise.sets.splice(exercise.sets.length,0,set);
    }

    $scope.removeWorkout = function(index){
    	$scope.entries.splice(index,1);
    }
    $scope.removeExercise = function(exercises,index){
    	exercises.splice(index,1);
    }
    $scope.addWorkout = function(workout){
    	var tmpWorkout = {};

    	tmpWorkout.date = workout.date;
    	tmpWorkout.name = workout.name;
    	tmpWorkout.exercises = [{}];

    	$scope.entries.splice(0,0,tmpWorkout)
    }
  });
