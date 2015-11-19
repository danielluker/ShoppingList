var app = angular.module('shoppingList.index', []);

var passwordRegex = /^[a-z,A-Z,0-9,!@#$%^&*_-]{8,16}$/;
var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/

var flag1 = false;

var valid = {
    new_email: false,
    old_email: false,
    password: false,
    password1: false,
    password2: false,
}

var data = {

}

app.directive('password', function() {
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$validators.password = function(modelValue, viewValue) {
                var isValid = passwordRegex.test(viewValue)
                if(viewValue == undefined)
                	return false;
                if (viewValue.length > 0 && !isValid) {
                    flag1 = true;
                    elem.css("background-color", "rgba(255, 0, 0, 0.3)")
                } else {
                    flag1 = false;
                    elem.css("background-color", "white")
                }
                valid[elem.attr('id')] = isValid;
                // ugly fix
                data[elem.attr('id')] = viewValue
                //
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
                if (viewValue != $("#password1").val() && (!flag1 && viewValue.length > 1)) {
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
                    valid[elem.attr('id')] = false;
                } else {
                    elem.css("background-color", "white")
                    valid[elem.attr('id')] = true;
                }
                // ugly fix
                data[elem.attr('id')] = viewValue
                //
            }
        }
    }
}]);

app.directive('usernameCheck', [function() {
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$asyncValidators.usernameCheck = function(modelValue, viewValue) {
                console.log("yo")
                var inputEmail = viewValue;
                return $.post("/email", {
                        'email': inputEmail,
                    }, function() {
                        // on success
                    })
                    .done(function() {
                        // second on success
                    })
                    .fail(function() {
                        return $q.reject("email already exists")
                    })
                    .always(function() {
                        // finished
                    })
            }
        }
    }
}])

app.controller(
    'loginCtrl', ['$scope',
        function($scope) {
            $scope.user = {
                email: "",
                password: "",
            }
            $scope.usernameCheck = function() {
                var user_exists = false; // stub for now
                // if(user_exists) {
                // $('#new_email')
                // }
                return user_exists
            }
            $scope.validate = function() {
                return valid.password && valid.old_email;
            }
            $scope.login = function() {
            	$scope.user.email = data.old_email;
            	$scope.user.password = data.password;
            	// data = {}
            	$.post(
            		'login/',
            		{ user: JSON.stringify($scope.user) },
            		function(result) {
            			if(result.valid)
            				window.location.replace(result['next'])
            		}
            	)
            }
        }
    ]
);

app.controller(
    'signupCtrl', ['$scope',
        function($scope) {
            $scope.user = {
                email: "",
                password1: "",
                password2: "",
                getPassword: function() {
                    return $scope.user.password1 == $scope.user.password2 ? $scope.user.password1 : null;
                }
            }
            $scope.apply = function() {
            	$
            }
            $scope.validate = function() {
                return valid.new_email && valid.password1 && valid.password2;
            }
            $scope.usernameCheck = function() {
                var user_exists = false;
                // if(!user_exists) {
                // }
                return !user_exists
            }
            $scope.register = function() {
            	$scope.user.email = data.new_email;
            	$scope.user.password1 = data.password1;
            	$scope.user.password2 = data.password2;
            	// data = {}
                $.post(
                    'register/', 
                    { 
                    	user: JSON.stringify({
                            email: $scope.user.email,
                            password: $scope.user.getPassword(),
                        }),
                    },
                    function(result) {
                    	if(result.valid)
                    		window.location.replace(result['next'])
                    }
                )
            }
        }
    ]
);