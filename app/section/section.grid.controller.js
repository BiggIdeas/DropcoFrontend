(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('SectionController', SectionController);

    SectionController.$inject = ['sectionsFactory'];

    /* @ngInject */
    function SectionController(sectionsFactory) {
        var vm = this;

        activate();

        function activate() {
            getSections();
        }

        function getSections() {
            sectionsFactory
                .getAll()
                .then(function(sections) {
                    vm.sections = sections;
                    console.log(sections);

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
            sectionsFactory
                .create(vm.newSection)
                .then(function(newSection) {
                    getProducts();
                    vm.addingNewSection = false;
                    clearControls();
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
        vm.cancelSaveNewSection = function cancelSaveNewSection() {
            vm.addingNewSection = false;
            clearControls();
        }
        function clearControls(){
            vm.newSection.sectionName = '';
            vm.newSection.departmentName = '';

        }
        function remove(product) {
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
