'use strict';

function show_login() {
	var cookie = Cookies.get("show_login")
	console.log(cookie)
	if(cookie != null && cookie == "true"){
		console.log("doing this")
		// $("#loginModal").modal("show");
		var modalObj = $("#loginModal").modal();
		modalObj.modal("show");
	}
	console.log("in here");
	Cookies.set("show_login", "false");
}


show_login();