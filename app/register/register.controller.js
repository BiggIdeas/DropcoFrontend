(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['authFactory', '$stateParams', '$state', 'rolesFactory', 'buildingsFactory'];

  /* @ngInject */
  function RegisterController(authFactory, $stateParams, $state, rolesFactory, buildingsFactory) {
    var vm = this;

    vm.title = 'RegisterController';
    vm.employee = {};

    activate();

    function activate() {
      rolesFactory
        .getAll()
        .then(function(roles) {
          vm.roles = roles;
        }).catch(function(error) {
          console.error(error);
        });
        buildingsFactory
          .getAll()
          .then(function(buildings) {
            vm.buildings = buildings;
          }).catch(function(error) {
            console.error(error);
          });
    }

    vm.registerEmployee = function registerEmployee() {
      console.log(vm.employee);
      authFactory
        .register(vm.employee)
        .then(function(response) {
          authFactory
            .login(vm.employee.employeeNumber, vm.employee.password)
            .then(function() {
              $state.go('login');
            });
        })
        .catch(function(error) {
          console.error('Bad registration');
        });
    }
  }
})();
