'use strict';

function show_login() {
	var cookie = Cookies.get("show_login")
	if(cookie != null && cookie == "true"){
		var modalObj = $("#loginModal").modal();
		modalObj.modal("show");
	}
	Cookies.set("show_login", "false");
}


show_login();