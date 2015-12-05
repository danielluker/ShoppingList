'use strict';

// var ShoppingListClass = require('objects/shoppingList');

function hashcode(k) {
	var numKeys = 128; // allowing 128 distinct elements per list 
	return (k * (k+3)) % numKeys;
}

var app = angular.module('shoppingList.home', []);

app.config(function($interpolateProvider , $httpProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
});

app.controller('homeCtrl', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {

	$rootScope.controls = [
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
	];

	$rootScope.messages = [
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

	$scope.timeline = [
		{
			title: "Test1",
			date: 'Yesterday',
			content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
			'Libero laboriosam dolor perspiciatis omnis exercitationem.',
		},
		{
			title: "Test2",
			date: 'Yesterday',
			content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
			'Libero laboriosam dolor perspiciatis omnis exercitationem.',
		},
		{
			title: "Test3",
			date: 'Yesterday',
			content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
			'Libero laboriosam dolor perspiciatis omnis exercitationem.',
		}
	]

	$scope.myLists = [
		{
			name: "Groceries",
			size: 5,
		},
		{
			name: "Christmas",
			size: 12,
		}
	]

	/*
	 * Local Variables 
	 */
	$scope.show_message_centre = false;
	$scope.currentList = [];
	$scope.currentList.name = "";
	$scope.itemName = "";
	$scope.itemQuantity = "";
	$scope.itemPrice = "$";


	/*
	 * Functions
	 */

	/***
	 * Fetches the list from the database, and fills the "current list" 
	 * panel with the contents
	 * 
	 * @param list: the name of the list to fetch
	 * 
	 * TODO: Generalize this to accept a query string
	 */
	$scope.populateList = function(list) {
		// First, query the database for the new list
		$scope.getList(list.name);
		// Then, place it in $scope.currentList
	}

	/***
	 * Fetches the function by name from the database, and assigns it
	 * to the $scope variable "currentList"
	 *
	 * @param name: name of the list to fetch
	 *
	 * TODO define an error handler
	 * TODO Generalize this to accept a query string 
	 */
	$scope.getList = function(name) {
		var queryString = 'list_name=' + name
		$http.post('get_list/', queryString).then(function(result) {
			var res = JSON.parse(result.data.list)
			$scope.currentList = []
			$scope.currentList.name = res.name
			for(var el in res.contents){
				$scope.currentList.push({
					name: el,
					quantity: res.contents[el],
				})
			}
		}, function(error){

			}
		);
	}


	/***
	 * Performs a logout of the current user, and redirects to
	 * the next page, as defined by the server (logout/goodbye page, or homepage)
	 */
	$scope.logout = function() {
		$http.get('/logout').then(function(result) {
			window.location.href = result['next']
		});
	}


	/***
	 * Toggles the bar at the bottom of the screen which provides IM/messaging
	 * capabilities
	 */
	$scope.toggleMessageCentre = function() {
		$scope.show_message_centre = !$scope.show_message_centre;
	}


	/***
	 * Adds an item from the bottom row in the "current list" panel to the 
	 * "currentList" variable. Performs input validation as well.
	 */
	$scope.addItem = function() {
		if($scope.itemName.trim().length < 1){
			$('#itemName').css("background-color", "rgba(255, 0, 0, 0.3)");
			return;
		}
		$('#itemName').css("background-color", "white");
		$scope.currentList.push({
			name: $scope.itemName,
			price: $scope.itemPrice,
			quantity: $scope.itemQuantity,
			hashkey: hashcode($scope.currentList.length),
		});
		$scope.itemName = "";
		$scope.itemQuantity = "";
		$scope.itemPrice = "$";
	};


	/***
	 * Removes an item from the "currentList" scope variable.
	 */
	$scope.removeItem = function(item) {
		var iter = 0;
		for (var i = 0; i < $scope.currentList.length; i++) {
			if($scope.currentList[i].hashkey == item.hashkey){
				$scope.currentList.splice(iter, 1);
				return;
			}
			iter++;
		}
	};


	/***
	 *
	 */


	/***
	 * Initialization
	 */

	/*
	 * Ideally, we want to initialize to the 'default' list for the current user.
	 */

	var DEFAULT_LIST = 'Groceries';
	$scope.getList(DEFAULT_LIST);

}]);

