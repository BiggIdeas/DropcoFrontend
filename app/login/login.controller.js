(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$state', 'authFactory', '$stateParams'];

  /* @ngInject */
  function LoginController($state, authFactory, stateParams) {
    var vm = this;
    vm.login = login;

    function login() {
      authFactory
        .login(vm.employeeNumber, vm.password)
        .then(function(response) {
            $state.go('app.dashboard');
          },
          function(error) {
            console.error(error);
            alert(error.error_description);
          });
    }
  }
})();
