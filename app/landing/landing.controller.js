(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('LandingController', LandingController);

    LandingController.$inject = [];

    /* @ngInject */
    function LandingController() {
        var vm = this;
        vm.landing = "im landing html";
        activate();

        function activate() {

        }
    }
})();
