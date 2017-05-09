(function() {
    'use strict';

    angular
        .module('app')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['authFactory'];

    /* @ngInject */
    function NavbarController(authFactory) {
        var vm = this;

        activate();

        function activate() {
            vm.username = authFactory.username;
        }
    }
})();
