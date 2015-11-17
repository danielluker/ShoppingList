var app = angular.module('shoppingList.index', []);

var passwordRegex = /^[a-z,A-Z,0-9,!@#$%^&*_-]{8,16}$/;
var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/

var flag1 = false;

var valid = {
	email : false,
	new_pass_1 : false,
	new_pass_2 : false,
}

app.directive('password', function() {
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$validators.password = function(modelValue, viewValue) {
                var isValid = passwordRegex.test(viewValue)
                if (viewValue.length > 1 && !valid) {
                    flag1 = true;
                    elem.css("background-color", "rgba(255, 0, 0, 0.3)")                 
                } else {
                    flag1 = false;
                    elem.css("background-color", "white")
                }
                valid[elem.attr('id')] = isValid;
                return (isValid);
            };
        },
    };
});

app.directive('match', [function() {
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$validators.match = function(modelValue, viewValue) {
                if (viewValue != $("#new_pass_1").val() && (!flag1 && viewValue.length > 1)) {
                    elem.css("background-color", "rgba(255, 102, 0, 0.3)");
                    valid[elem.attr('id')] = false;
                }
            }
        }
    }
}]);

app.directive('emailCheck', [function() {
	return {
		require: 'ngModel',
		link: function(scope, elem, attrs, ctrl) {
			ctrl.$validators.emailCheck = function(modelValue, viewValue) {
				if (viewValue.length > 0 && !emailRegex.test(viewValue)) {
					elem.css("background-color", "rgba(255, 0, 0, 0.3)")
					valid.email = false;
				}
				else {
					elem.css("background-color", "white")
					valid.email = true;
				}
			}
		}
	}
}]);

// app.controller(
// 	'indexCrtl', [
// 		function() {

// 		}
// 	]
// );

app.controller(
    'signupCtrl', ['$scope',
        function($scope) {

            $scope.user = {
                email: "",
                password1: "",
                password2: "",
                getPassword: function() {
                    return password1 == password2 ? password1 : null;
                }
            }

            /*
             * These validation functions are, for now, performed by HTML5
             */
            $scope.validate_login = function() {
                // $("#login_form")
                return true;
            }

            $scope.validate_signup = function() {
                // $("#signup_form")
                return true;
            }

            /* 
             * Main password validation function
             */
            $scope.validate_new_password = function(id) {
                // console.log("checking passwords");
                // var name = "#new_pass_" + id;
                // // if(! $(name).value.match('\^[a-z,A-Z,0-9,!@#$%^&*_-]{8,16}$\'))
                // // 	$
                // var other = "#new_pass_" + (id > 1 ? 1 : 2);
                // if($(name).val() != $(other).val()){
                // 	$(name).css("{color : red}");
                // 	$(other).css("{color : red}");
                // 	console.log("Don't match")
                // }
                // else
                // 	console.log("match");
                // console.log($(name).val())
                // console.log($(other).val())
            }

            $scope.validate = function() {
            	for(var a in valid)
            		if(!valid[a])
            			return false;
            	return true
            }

            $scope.printValue = function() {
                console.log("Printing values")
                console.log($scope.user.email)
                console.log($scope.user.password1)
                console.log($scope.user.password2)
                console.log(valid)
            }
        }
    ]
);