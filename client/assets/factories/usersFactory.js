(function() {
  angular

  .module("app")
  .factory("usersFactory", usersFactory);

  function usersFactory($http) {
    var factory = {
      addUser: addUser,
      getUsers:getUsers,
    };
    return factory;

    function addUser(newUser, callback){
      console.log('factory callback',callback);
      $http.post('/users', newUser).success(function(User) {
        callback(User);
        console.log('adding user in factory', newuser, callback);

      })
    }

    function getUsers(callback) {
      $http.get('/users').success(function(Users) {
        callback(Users);
      })
    }

  }

})();
