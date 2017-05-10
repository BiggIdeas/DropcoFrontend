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
            console.log("navbar ctrl authf: " , authFactory);
            console.log("navbar ctrl username: " , authFactory.username);
            console.log("navbar ctrl role: " , authFactory.role);
            // console.log("navbar ctrl username: " , authFactory.service.username);
        }
    }
})();
