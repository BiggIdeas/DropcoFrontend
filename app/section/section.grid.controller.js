(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('SectionController', SectionController);

  SectionController.$inject = ['sectionsFactory', 'departmentsFactory'];

  /* @ngInject */
  function SectionController(sectionsFactory, departmentsFactory) {
    var vm = this;

    activate();

    function activate() {
      getSections();
      getDepartments();
    }

    function getSections() {
      sectionsFactory
        .getAll()
        .then(function(sections) {
          vm.sections = sections;

        })
        .catch(function(error) {
          console.log(error);
        });
    }

    function getDepartments() {

      departmentsFactory
        .getAll()
        .then(function(departments) {
          vm.departments = departments;
        })
        .catch(function(error) {
          console.log(error);
        });

    }
    vm.searchSection = function searchSection() {
      console.log("hi");
    }
    vm.addNewSection = function addNewSection() {

      vm.addingNewSection = true;
    }
    vm.saveNewSection = function saveNewSection() {
      console.log(vm.newSection);
      sectionsFactory
        .create(vm.newSection)
        .then(function(newSection) {
          getSections();
          vm.addingNewSection = false;
          clearControls();
        })
        .catch(function(error) {
          console.error(error);
        });
    }
    vm.cancelSaveNewSection = function cancelSaveNewSection() {
      vm.addingNewSection = false;
      clearControls();
    }

    function clearControls() {
      vm.newSection.sectionName = '';
      vm.newSection.departmentName = '';

    }

    function remove(section) {
      sectionsFactory
        .remove(section.id)
        .then(function() {
          vm.sections.splice(vm.sections.indexOf(section), 1);
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  }
})();
