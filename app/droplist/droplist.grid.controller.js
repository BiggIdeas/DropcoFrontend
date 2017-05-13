(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('DroplistGridController', DroplistGridController);

  DroplistGridController.$inject = ['droplistsFactory', 'departmentsFactory', 'sectionsFactory', 'authFactory'];

  /* @ngInject */
  function DroplistGridController(droplistsFactory, departmentsFactory, sectionsFactory, authFactory) {
    var vm = this;

    vm.filterDroplists = filterDroplists;
    vm.filterSections = filterSections;
    vm.remove = remove;
    vm.loading = true;

    activate();

    function activate() {
      vm.role = authFactory.role;
      getDepartments();
      getSections();
      getStatuses();

      getDroplists();
      getEmployeeRole();
    }

    function getEmployeeRole() {
      if (vm.role === "Driver") {
        vm.isDriver = true;
      } else {
        vm.isDriver = false;
      }
    }

    function getDepartments() {
      departmentsFactory
        .getAll()
        .then(function(departments) {
          vm.departments = departments;
          vm.departments.push({
            departmentName: 'All departments'
          });
          var lastElement = vm.departments.length;
          vm.selectedDepartment = vm.departments[lastElement - 1];
        })
        .catch(function(error) {
          console.error(error);
        });
    }

    function getSections() {
      sectionsFactory
        .getAll()
        .then(function(sections) {
          vm.sections = sections;
        })
        .catch(function(error) {
          console.error(error);
        });
    }

    function getStatuses() {
      vm.statuses = ["All", "Completed", "Pending", "Canceled"];
      vm.selectedStatus = vm.statuses[0];
    }

    function getDroplists() {
      setTimeout(function() {
        droplistsFactory
          .getAll()
          .then(function(droplists) {
            vm.droplists = droplists;
            vm.filteredDroplists = droplists;
            vm.loading = false;
          })
          .catch(function(error) {
            console.error(error);
          });
      }, 500);
    }

    function filterSections() {
      if (vm.selectedDepartment.departmentName == 'All departments') {
        vm.filteredDroplists = vm.droplists;
        vm.isSectionsDisabled = true;
      } else {
        vm.filteredDroplists = [];
        vm.isSectionsDisabled = false;
        vm.departmentSections = [];
        for (var i = 0; i < vm.sections.length; i++) {
          if (vm.sections[i].departmentId == vm.selectedDepartment.departmentId)
            vm.departmentSections.push(vm.sections[i]);
        }
        vm.departmentSections.push({
          sectionName: 'All sections'
        });
        var lastItem = vm.departmentSections[vm.departmentSections.length - 1];
        vm.selectedSection = lastItem;
        vm.filterDroplists();
      }
    }

    function filterDroplists() {
      vm.filteredDroplists = [];
      filterByDepartmentAndSections();
      filterByStatus();
      filterByDate();
    }

    function filterByDepartmentAndSections() {
      if (vm.selectedSection != null && vm.selectedSection.sectionName == 'All sections') {
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

    function filterByStatus() {
      if (vm.selectedStatus != null) {
        switch (vm.selectedStatus) {
          case "All":
            console.log("All");
            break;
          case "Completed":
            console.log("Complete");
            break;
          case "Pending":
            console.log("Pending");
            break;
          case "Canceled":
            console.log("Cancel");
            break;
          default:
            break;
        }
      }
    }

    function filterByDate() {

    }

    function remove(droplist) {
      droplistsFactory
        .remove(droplist.droplistId)
        .then(function(response) {
          vm.droplists.splice(vm.droplists.indexOf(droplist), 1);
        })
        .catch(function(error) {
          console.error(error);
        });

    }
  }
})();
