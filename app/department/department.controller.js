(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('DepartmentGridController', DepartmentGridController);

  DepartmentGridController.$inject = ['departmentsFactory'];

  /* @ngInject */
  function DepartmentGridController(departmentsFactory) {
    var vm = this;
    vm.addingNewDepartment = false;

    activate();

    function activate() {
      getDepartments();
    }

    function getDepartments() {
      departmentsFactory
        .getAll()
        .then(function(departments) {
          vm.departments = departments;
        })
        .catch(function(error) {
          console.error(error);
        });
    }

    vm.searchDepartment = function searchDepartment() {
      // console.log("hi");
    }

    vm.addNewDepartment = function addNewDepartment() {
      vm.addingNewDepartment = true;
    }

    vm.saveNewDepartment = function saveNewDepartment() {
      departmentsFactory
        .create(vm.newDepartment)
        .then(function(newDepartment) {
          getDepartments();
          vm.addingNewDepartment = false;
        })
        .catch(function(error) {
          console.error(error);
        });
    }

    vm.cancelSaveNewEDepartment = function cancelSaveNewEDepartment() {
      vm.addingNewDepartment = false;
    }

    // function remove(employee) {
    //   departmentsFactory
    //     .remove(employee.id)
    //     .then(function() {
    //       vm.departments.splice(vm.departments.indexOf(employee), 1);
    //     })
    //     .catch(function(error) {
    //       console.error(error);
    //     });
    // }
  }
})();
