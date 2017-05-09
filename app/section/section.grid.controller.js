(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('SectionController', SectionController);

    SectionController.$inject =  ['sectionsFactory'];

    /* @ngInject */
    function SectionController(sectionsFactory) {
        var vm = this;

        activate();

        function activate() {
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
    }
})();
