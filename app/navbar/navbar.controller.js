(function() {
  'use strict';

  angular
    .module('app')
    .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['authFactory', '$rootScope', '$state'];

  /* @ngInject */
  function NavbarController(authFactory, $rootScope, $state) {
    var vm = this;

    activate();

    function activate() {
      vm.username = authFactory.username;
      vm.role = authFactory.role;
      vm.userId = authFactory.userId;
      vm.firstName = authFactory.firstName;
      $rootScope.$on('login-happened', function(e, data) {
        vm.username = data.username;
        vm.role = data.role;
        vm.userId = data.userId;
        vm.firstName = data.firstName;
      });
    }

    vm.logout = function logout() {
      authFactory.logout();
      $state.go('login');
    }
  }
})();
