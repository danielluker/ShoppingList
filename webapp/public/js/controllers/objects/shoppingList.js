'use strict';

/*
 * Class definition for shopping cart
 */
function ShoppingList(name) {

	// Will contain the name
	this.name = name

	// Will contain all items in the cart
	this.contents = {};

	// Total items in the cart
	this.numberOfItems = 0;

	// Safe method to add item
	this.addItem = function(item) {
		if(item == null || item == "")
			return;
		if(!(item in this.contents)) 
			this.contents[item] = 0;
		else
			this.contents[item]++;
		console.log(this.contents);
		this.numberOfItems++;
	};

	// Safe method to remove an item. Throws error if item is not in cart
	this.removeItem = function(item) {
		if(item in this.contents){
			this.contents[item] = this.contents[item] > 1 ? this.contents[item] - 1 : 0;
			this.numberOfItems--;
		}
		else
			throw 'Item not in cart';
	};

	// Clears the contents of the cart
	this.clearItems = function() {
		this.contents = {};
		this.numberOfItems = 0;
	};

	// Returns the total item count
	this.numItems = function() {
		return this.numberOfItems;
	};

};