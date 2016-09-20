
    //var appModule = angular.module('myApp',[]);

    //  inject the ngRoute dependency in the module.
    var app = angular.module('app', ['ngRoute']);
    //  use the config method to set up routing:
    app.config(function ($routeProvider) {
      $routeProvider
        .when('/',{
            templateUrl: 'partials/login.html'
        })
        .when('/register',{
            templateUrl: 'partials/register.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

    // add a factory to the module
    app.factory('userFactory', function ($http) {
        // a factory is nothing more than a function that returns an object literal!
      var user;
      var factory = {};
      factory.show = function (callback){
        console.log('saving user name ' + user);
      }

      factory.getUser = function(callback) {
          callback(user);
      }


      factory.login = function(user, callback) {
        console.log('user factory: got into login function. user=');
        console.log(user);
        var data = ({email: user.email, password: user.password});
        $http.post('/login', data).success(function(output) {
              console.log('userFactory: output=');
              console.log(output);
              user = output;
              callback(user);
          })
      }

      factory.register = function(user, callback){
        console.log('user factory: got into register function. user=');
        console.log(user);
        $http.post('/register', user).success(function(output) {
              console.log('userFactory: output=');
              console.log(output);
              if (output.duplicate) {
                var data = {errors: {type:{message: output.duplicate}}};
                callback(data);
              }
              else {
                callback(output);
              }
          })
      }
      // most important step: return the object so it can be used by the rest of our angular code
       return factory
    });

    //the .controller() method adds a controller to the module
    app.controller('loginController', function($scope, userFactory) {
      $scope.user;

      $scope.login = function(){
        console.log('login controller: got it login function');
        userFactory.login($scope.user, function(retData){
          console.log('login controller:able to login in user, user=');
          console.log(retData);
        });
      }
    });

    app.controller('registerController', function($scope, userFactory) {
      $scope.user;
      $scope.errors=[];
      var error_flag;

      $scope.register = function(){
        console.log('register controller: got it register function');

        if ($scope.user.password === $scope.user.confpassword) {
          userFactory.register($scope.user, function(retObj) {
              if (retObj.errors) {
                $scope.errors = retObj.errors;
                console.log('register controller: registration error, errors=');
                console.log($scope.errors);
                error_flag = true;
              }
              else {
                console.log('register controller:able to register user, user=');
                console.log(retObj);
                error_flag = false;
              }
          });
        }
        else {
          alert('Password confirmation does not match password');
        }
      }

      $scope.error =function() {
        return error_flag;
      }
    });
