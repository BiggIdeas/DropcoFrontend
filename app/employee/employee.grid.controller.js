(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('EmployeeGridController', EmployeeGridController);

  EmployeeGridController.$inject = ['employeesFactory'];

  /* @ngInject */
  function EmployeeGridController(employeesFactory) {
    var vm = this;
    vm.addingNewEmployee = false;

    activate();

    function activate() {
      getEmployee();
    }

    function getEmployee() {
      employeesFactory
        .getAll()
        .then(function(employees) {
          vm.employees = employees;
        })
        .catch(function(error) {
          console.error(error);
        });
    }

    vm.searchEmployee = function searchEmployee() {
      // console.log("hi");
    }

    vm.addNewEmployee = function addNewEmployee() {
      vm.addingNewEmployee = true;
    }

    vm.saveNewEmployee = function saveNewEmployee() {
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

    vm.cancelSaveEmployee = function cancelSaveEmployee() {
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
