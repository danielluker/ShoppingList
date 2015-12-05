'use strict';

var app = angular.module('shoppingList.newList', []);


app.config(function($interpolateProvider , $httpProvider) {
	// Change the angular notation on the html to be compatible with Django
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');

    // Changing the CSRF token cookie to be compatible with Django
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
});

app.controller('newListCtrl', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {

	$scope.itemName = ""
	$scope.itemQuantity = ""

	$scope.newList = []
	$scope.newList.name = "New List"

	$scope.addItem = function() {
		$scope.newList.push({name: $scope.itemName, quantity: $scope.itemQuantity});
		$scope.itemName = ""
		$scope.itemQuantity = ""
	}

	$scope.addToList = function(item) {

	}

}]);