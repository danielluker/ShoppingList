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

app.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {

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
	];

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

	$scope.populateList = function(list) {
		// First, query the database for the new list
		$scope.getList(list.name);
		// Then, place it in $scope.currentList
	}

	$scope.getList = function(name) {
		var queryString = 'list_name=' + name
		$http.post('get_list/', queryString).then(function(result) {
			var res = JSON.parse(result.data.list)
			$scope.currentList = []
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

	$scope.logout = function() {
		$.get('/logout', function(result) {

		}).done(function(result) {
			console.log(result)
			window.location.href = result['next']
		})
	}

	$scope.openMessages = function() {
		// window.location.href = "messages/"
	}

	$scope.show_message_centre = false;

	$scope.toggleMessageCentre = function() {
		$scope.show_message_centre = !$scope.show_message_centre;
	}

	$scope.currentList = [];
	$scope.itemName = "";
	$scope.itemQuantity = "";
	$scope.itemPrice = "$";

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

	$scope.removeItem = function(item) {
		console.log("in here", item)
		var iter = 0;
		for (var i = 0; i < $scope.currentList.length; i++) {
			if($scope.currentList[i].hashkey == item.hashkey){
				console.log("about to splice from " + iter + " to " + (iter + 1) );
				$scope.currentList.splice(iter, 1);
				return;
			}
			iter++;
		}
	};

	$scope.getList('Groceries');

}]);

