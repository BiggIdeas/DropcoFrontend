(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$state', 'authFactory', '$stateParams', 'SweetAlert'];

  /* @ngInject */
  function LoginController($state, authFactory, stateParams, SweetAlert) {
    var vm = this;
    vm.login = login;

    function login() {
      authFactory
        .login(vm.employeeNumber, vm.password)
        .then(function(response) {
            $state.go('app.dashboard');
          },
          function(error) {
            SweetAlert.swal("User or password incorrect", "Try again", "error");
            console.error(error);
          });
    }
  }
})();
