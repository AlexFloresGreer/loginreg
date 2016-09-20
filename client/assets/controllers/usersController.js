(function() {
  angular

    .module('app')
    .controller("usersController", usersController);

    usersController.$inject = ['usersFactory', '$location', '$routeParams'];

    function usersController(usersFactory, $location, $routeParams) {
      var vm = this;
      vm.addUser = addUser;
      vm.allUsers = [];
      vm.newUser = {};
      vm.setUsers = setUsers;
      vm.displayUsers = displayUsers;


    //method being called automatically when the controller loads
      usersFactory.getUsers(function(data) {
      console.log('data from controller', data);
      vm.allUsers = data;
      })

      function addUser() {
        usersFactory.addUser(vm.newUser, setUsers);
        console.log('adding user in controller');
      }

      function setUsers(data){
        vm.newUser = {};
        $location.url('/display');

      }
      function displayUsers(data){
				vm.allUsers = data;
      }
    }
}) ()
