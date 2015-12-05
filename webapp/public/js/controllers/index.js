var app = angular.module('shoppingList.index', []);

var passwordRegex = /^[a-zA-Z0-9,.!@#$%^&*_-]{8,16}$/;
var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/

var flag1 = false;

var valid = {
    new_email: false,
    old_email: false,
    password: false,
    password1: false,
    password2: false,
}

var email_registered = {
    new_email: true,
    old_email: false,
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
                if(viewValue.length == 0 && scope.meta != "loginCtrl") {
                    scope.email_registered = false;
                }
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

app.config(function($interpolateProvider , $httpProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
});

app.controller(
    'loginCtrl', ['$scope', '$http',
        function($scope, $http) {
            $scope.meta = "loginCtrl"
            $scope.user = {
                email: "",
                password: "",
            }

            /*
             * This flag is to toggle the warning message
             */
            $scope.email_registered = true;

            /* 
             * This flag is to prevent the login button from becoming 
             * valid if the AJAX call to check the existence of the 
             * email in the database takes too long
             */
            $scope.email_registered_flag = false;

            $scope.usernameCheck = function(mode) {
                var inputEmail = $('#old_email').val()
                var queryString = 'email=' + inputEmail
                $http.post('/email/', queryString).then(function(result) {
                    $scope.email_registered = $scope.email_registered_flag = result.data.exists;
                    console.log("email_registered", $scope.email_registered)
                    console.log("email_registered_flag", $scope.email_registered_flag)
                });
            }
            $scope.validate = function() {
                return valid.password && valid.old_email && $scope.email_registered && $scope.email_registered_flag;
            }
            $scope.login = function() {
            	$scope.user.email = data.old_email;
            	$scope.user.password = data.password;
            	$.post(
            		'login/',
            		{ user: JSON.stringify($scope.user) },
            		function(result) {
            			if(result.valid)
            				window.location.href = result['next']
            		}
            	)
            }
        }
    ]
);

app.controller(
    'signupCtrl', ['$scope', '$http',
        function($scope, $http) {
            $scope.meta = "signupCtrl"
            $scope.user = {
                email: "",
                password1: "",
                password2: "",
                getPassword: function() {
                    return $scope.user.password1 == $scope.user.password2 ? $scope.user.password1 : null;
                }
            }
            $scope.email_registered = false;

            /* This flag is to prevent the login button from becoming 
             * valid if the AJAX call to check the existence of the 
             * email in the database takes too long
             */
            $scope.email_registered_flag = true;
            $scope.validate = function() {
                return valid.new_email && valid.password1 && valid.password2 && (!$scope.email_registered) && (!scope.email_registered_flag);
            }
            $scope.usernameCheck = function(mode) {
                var inputEmail = $('#new_email').val()
                var queryString = 'email=' + inputEmail
                $http.post('/email/', queryString)
                .then(function(result) {
                    console.log("received result from /email/ ", result);
                    $scope.email_registered = $scope.email_registered_flag = result.data.exists; 
                });
            }
            $scope.register = function() {
            	$scope.user.email = data.new_email;
            	$scope.user.password1 = data.password1;
            	$scope.user.password2 = data.password2;
                var dataString = 'user=' + JSON.stringify({
                            email: $scope.user.email,
                            password: $scope.user.getPassword(),
                        });
                $http.post('register/', dataString)
                .then(function(result) {
                    	if(result.valid)
                    		window.location.href = result['next']
                    }
                );
            }
            $scope.forgotPassword = function() {
                window.location.href = "/forgot_password";
            }
        }
    ]
);

// Helper functions

var setEmailRegistered = function(result, scope) {
    scope.email_registered = result.exists;
}