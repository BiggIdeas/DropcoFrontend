(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('EmployeeGridController', EmployeeGridController);

  EmployeeGridController.$inject = ['employeesFactory', 'rolesFactory'];

  /* @ngInject */
  function EmployeeGridController(employeesFactory, rolesFactory) {
    var vm = this;
    vm.addingNewEmployee = false;

    activate();

    vm.test = function test() {
console.log("test");
      // for (var i = 0; i < vm.allEmployees.length; i++) {
      //   if (vm.allEmployees[i].firstName.indexOf(vm.searchEmployee)) {
      //     vm.filteredEmployees.push(vm.allEmployees[i]);
      //     // console.log("it issssss that letter", vm.searchEmployee);
      //   }
      // }
    }

    function activate() {
      getEmployee();
      getRoles();
    }

    function getEmployee() {
      employeesFactory
        .getAll()
        .then(function(employees) {
          vm.allEmployees = employees;
          vm.filteredEmployees = employees;
        })
        .catch(function(error) {
          console.error(error);
        });
    }

    function getRoles() {
      rolesFactory
        .getAll()
        .then(function(roles) {
          vm.roles = roles;
        })
        .catch(function(error) {
          console.error(error);
        });
    }

    // vm.searchEmployee = function searchEmployee() {
    //   // console.log("hi");
    // }

    vm.addNewEmployee = function addNewEmployee() {
      vm.addingNewEmployee = true;
    }

    vm.saveNewEmployee = function saveNewEmployee() {
      // CHANGE THIS
      vm.newEmployee.buildingId = 1;
      // CHANGE THIS
      employeesFactory
        .create(vm.newEmployee)
        .then(function(newEmployee) {
          getEmployee();
          vm.addingNewEmployee = false;
        })
        .catch(function(error) {
          console.error(error);
        });
    }

    vm.cancelSaveNewEmployee = function cancelSaveEmployee() {
      vm.addingNewEmployee = false;
    }

    function remove(employee) {
      employeesFactory
        .remove(employee.id)
        .then(function() {
          vm.employees.splice(vm.employees.indexOf(employee), 1);
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  }
})();
