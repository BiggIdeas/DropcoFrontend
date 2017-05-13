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
    vm.loading = false;

    function login() {
      vm.loading = true;
      setTimeout(function() {
        authFactory
          .login(vm.employeeNumber, vm.password)
          .then(function(response) {
              vm.loading = false;
              $state.go('app.dashboard');
            },
            function(error) {
              showErrorMessage();
            });
      }, 750);
    }

    function showErrorMessage() {
      setTimeout(function() {
        SweetAlert.swal("User or password incorrect", "Try again", "error");
        vm.loading = false;
      }, 1000);
    }
  }
})();
