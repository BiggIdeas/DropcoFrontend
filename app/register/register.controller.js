(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['authFactory', '$stateParams', '$state', 'rolesFactory'];

  /* @ngInject */
  function RegisterController(authFactory, $stateParams, $state, rolesFactory) {
    var vm = this;

    vm.title = 'RegisterController';
    vm.employee = {
      firstName: '',
      lastName: '',
      employeeNumber: '',
      role: '',
      cellphone: '',
      emailAddress: '',
      password: '',
      confirmPassword: ''
    };

    activate();

    function activate() {
      rolesFactory
        .getAll()
        .then(function(roles) {
          vm.roles = roles;
        }).catch(function(error) {
          console.error(error);
        });
    }

    vm.registerEmployee = function registerEmployee() {
      authFactory
        .register(vm.employee)
        .then(function(response) {
          alert('Successful registration! Now login');
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
