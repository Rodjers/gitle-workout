'use strict';

angular.module('gitleworkoutApp')
  .controller('MainCtrl', function ($scope, $firebase) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    

        var url = 'https://gitleworkout.firebaseio.com/log/workout/';
        var ref = new Firebase(url);
        $scope.entries = $firebase(ref);

    
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
