'use strict';

// var ShoppingListClass = require('objects/shoppingList');

var app = angular.module('shoppingList.home', []);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

// app.controller('dashCtrl', ['$scope', function($scope) {
// 	$scope.shoppingList = new ShoppingList("list1");

// 	$scope.postDummyData = function() {
// 		$scope.shoppingList.addItem("pizza");
// 		$scope.shoppingList.addItem("tortillas");
// 		$scope.shoppingList.addItem("drink");
// 		$.post('save/', {
// 			'bundle' : JSON.stringify($scope.shoppingList),
// 		});
// 	};
// }]);

app.controller('sidebarCtrl', ['$scope', function($scope) {

	$scope.controls = [
		{
			name: 'Test 1',
			link: '#',
		},
		{
			name: 'Test 2',
			link: '#',
			subcontrols: [
				{
					name: 'test1',
					link: '#',
				},
				{
					name: 'test2',
					link: '#',
				}
			]
		},
		{
			name: 'Test 3',
			link: '#',
		},
	]
}]);

app.controller('messagesCtrl', ['$scope', function($scope) { 

	console.log("instantiating messagesCtrl controller")

	$scope.messages = [
		{
			from: 'John Smith', 
			date: 'Yesterday', 
			content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
			'Libero laboriosam dolor perspiciatis omnis exercitationem.',
		},
		{
			from: 'Maria Gonzalez',
			date: 'Tuesday',
			content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
			'Libero laboriosam dolor perspiciatis omnis exercitationem.',
		},
		{
			from: 'Daniel Perez',
			date: '11/13/2015',
			content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
			'Libero laboriosam dolor perspiciatis omnis exercitationem.',
		},
	];
}]);

app.controller('tasksCtrl', ['$scope', function($scope) {
}]);

app.controller('alertsCtrl', ['$scope', function($scope) {
}]);