(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('DroplistGridController', DroplistGridController);

  DroplistGridController.$inject = ['droplistsFactory', 'departmentsFactory', 'sectionsFactory', 'authFactory'];

  /* @ngInject */
  function DroplistGridController(droplistsFactory, departmentsFactory, sectionsFactory, authFactory) {
    var vm = this;

    activate();

    vm.role = authFactory.role;

    function activate() {
      droplistsFactory
        .getAll()
        .then(function(droplists) {
          vm.droplists = droplists;
        })
        .catch(function(error) {
          console.error(error);
        });

      departmentsFactory
        .getAll()
        .then(function(departments) {
          vm.departments = departments;
          vm.departments.push({
            departmentName: 'All departments'
          });
        })
        .catch(function(error) {
          console.error(error);
        });

      sectionsFactory
        .getAll()
        .then(function(sections) {
          vm.sections = sections;
        })
        .catch(function(error) {
          console.error(error);
        });
    }

    vm.filterSections = function filterSections() {
      if (vm.selectedDepartment.departmentName == 'All departments') {
        vm.filteredDroplists = vm.droplists;
        vm.isSectionsDisabled = true;
      } else {
        vm.filteredDroplists =[];
        vm.isSectionsDisabled = false;
        vm.departmentSections = [];
        for (var i = 0; i < vm.sections.length; i++) {
          if (vm.sections[i].departmentId == vm.selectedDepartment.departmentId)
            vm.departmentSections.push(vm.sections[i]);
        }
        vm.departmentSections.push({
          sectionName: 'All sections'
        });
        var lastItem = vm.departmentSections[vm.departmentSections.length -1];
        vm.selectedSection = lastItem;
        vm.filterDroplists();
      }
    }

    vm.filterDroplists = function filterDroplists() {
      vm.filteredDroplists = [];
      if (vm.selectedSection.sectionName == 'All sections') {
        for (var i = 0; i < vm.droplists.length; i++) {
          if (vm.droplists[i].departmentName == vm.selectedDepartment.departmentName)
            vm.filteredDroplists.push(vm.droplists[i]);
        }
      } else {
        for (var i = 0; i < vm.droplists.length; i++) {
          if (vm.droplists[i].sectionId == vm.selectedSection.sectionId)
            vm.filteredDroplists.push(vm.droplists[i]);
        }
      }
    }
  }
})();
