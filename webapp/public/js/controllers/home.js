'use strict';

// var ShoppingListClass = require('objects/shoppingList');

var self = angular.module('shoppingList.home', []);

self.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
})
.controller('dashCtrl', ['$scope', function($scope) {
	$scope.shoppingList = new ShoppingList("list1");

	$scope.postDummyData = function() {
		$scope.shoppingList.addItem("pizza");
		$scope.shoppingList.addItem("tortillas");
		$scope.shoppingList.addItem("drink");
		console.log("I'm being fired up :)");
		console.log("bundle = ", $scope.shoppingList);
		// $.ajax({
			// type : 'POST',
			// url : 'save', 
			// data : {
			// 	'bundle' : JSON.stringify($scope.shoppingList),
				// 'X-CSRFToken' : csrftoken,
			// },
			// beforeSend : function(xhr){
			// 	xhr.setRequestHeader('X-CSRFToken', csrftoken);
			// },
		// });
		$.post('save/', {
			'bundle' : JSON.stringify($scope.shoppingList),
		});
	};


}]);